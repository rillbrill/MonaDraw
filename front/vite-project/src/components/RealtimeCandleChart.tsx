import React, { useEffect, useRef, useState } from 'react';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import type { Time } from 'lightweight-charts';

interface CandleData {
  time: Time;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface GenerateCandlesParams {
  count?: number;
  updatesPerCandle?: number;
  startAt?: number;
  intervalSec?: number;
}

interface GenerateCandlesResult {
  initialData: CandleData[];
  realtimeUpdates: CandleData[];
}

// 캔들 데이터 생성 함수 (chart_realtime.txt 참고)
function generateCandles({ 
  count = 500, 
  updatesPerCandle = 10, 
  startAt = 100, 
  intervalSec = 60 
}: GenerateCandlesParams): GenerateCandlesResult {
  let randomFactor = 25 + Math.random() * 25;
  const samplePoint = (i: number) =>
    i *
      (0.5 +
        Math.sin(i / 1) * 0.2 +
        Math.sin(i / 2) * 0.4 +
        Math.sin(i / randomFactor) * 0.8 +
        Math.sin(i / 50) * 0.5) +
    200 +
    i * 2;

  const createCandle = (val: number, time: number): CandleData => ({
    time: time as Time,
    open: val,
    high: val,
    low: val,
    close: val,
  });

  const updateCandle = (candle: CandleData, val: number): CandleData => ({
    time: candle.time,
    close: val,
    open: candle.open,
    low: Math.min(candle.low, val),
    high: Math.max(candle.high, val),
  });

  randomFactor = 25 + Math.random() * 25;
  const date = new Date(Date.UTC(2022, 0, 1, 12, 0, 0, 0));
  const numberOfPoints = count * updatesPerCandle;
  const initialData: CandleData[] = [];
  const realtimeUpdates: CandleData[] = [];
  let lastCandle: CandleData | undefined;
  let previousValue = samplePoint(-1);
  
  for (let i = 0; i < numberOfPoints; ++i) {
    if (i % updatesPerCandle === 0) {
      date.setTime(date.getTime() + intervalSec * 1000); // timeframe에 맞는 간격(초)만큼 증가
    }
    const time = Math.floor(date.getTime() / 1000);
    let value = samplePoint(i);
    const diff = (value - previousValue) * Math.random();
    value = previousValue + diff;
    previousValue = value;
    
    if (i % updatesPerCandle === 0) {
      const candle = createCandle(value, time);
      lastCandle = candle;
      if (i >= startAt) {
        realtimeUpdates.push(candle);
      }
    } else if (lastCandle) {
      const newCandle = updateCandle(lastCandle, value);
      lastCandle = newCandle;
      if (i >= startAt) {
        realtimeUpdates.push(newCandle);
      } else if ((i + 1) % updatesPerCandle === 0) {
        initialData.push(newCandle);
      }
    }
  }
  
  return {
    initialData,
    realtimeUpdates,
  };
}

const timeframeIntervals: Record<string, number> = {
  '1m': 60,
  '5m': 60 * 5,
  '15m': 60 * 15,
  '1h': 60 * 60,
  '4h': 60 * 60 * 4,
  '1d': 60 * 60 * 24,
};

interface RealtimeCandleChartProps {
  timeframe?: string;
  height?: number;
  forceDump?: boolean;
}

export default function RealtimeCandleChart({
  timeframe = '1m',
  height = 320,
  forceDump = false,
}: RealtimeCandleChartProps) {
  const chartRef = useRef<any>();
  const seriesRef = useRef<any>();
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const [width, setWidth] = useState(600);
  const forceDumpRef = useRef(forceDump);
  const lastCloseRef = useRef<number | null>(null);

  useEffect(() => {
    forceDumpRef.current = forceDump;
    // forceDump가 true가 되는 순간의 마지막 close 값을 저장
    if (forceDump && seriesRef.current) {
      const data = seriesRef.current._data || seriesRef.current.data || [];
      if (data.length > 0) {
        lastCloseRef.current = data[data.length - 1].close;
      }
    }
  }, [forceDump]);

  useEffect(() => {
    // 컨테이너 width 동적 측정
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        setWidth(prevWidth => {
          if (prevWidth !== newWidth) return newWidth;
          return prevWidth;
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const intervalSec = timeframeIntervals[timeframe] || 60;
    // updatesPerCandle을 60으로 고정하여 모든 차트가 60틱마다 한 캔들 생성
    const { initialData, realtimeUpdates } = generateCandles({ 
      count: 10000, 
      updatesPerCandle: 60, 
      startAt: 100, 
      intervalSec 
    });
    const initialViewData = initialData.slice(-9000); // 마지막 9000개 보여줌
    
    if (chartRef.current) {
      chartRef.current.remove();
      chartRef.current = null;
    }
    
    if (!containerRef.current) return;
    
    const chart = createChart(containerRef.current, {
      layout: {
        textColor: '#b0b8c1',
        background: { type: ColorType.Solid, color: 'rgba(15, 15, 35, 0.95)' },
      },
      grid: {
        vertLines: { color: 'rgba(35, 42, 58, 0.3)' },
        horzLines: { color: 'rgba(35, 42, 58, 0.3)' },
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: '#7c3aed',
          width: 1,
          style: 2,
          labelBackgroundColor: '#7c3aed',
        },
        horzLine: {
          color: '#7c3aed',
          width: 1,
          style: 2,
          labelBackgroundColor: '#7c3aed',
        },
      },
      rightPriceScale: {
        borderColor: 'rgba(35, 42, 58, 0.3)',
        textColor: '#b0b8c1',
        scaleMargins: {
          top: 0.1,
          bottom: 0.1,
        },
      },
      timeScale: {
        borderColor: 'rgba(35, 42, 58, 0.3)',
        timeVisible: true,
        secondsVisible: false,
      },
      width,
      height,
    });
    
    chartRef.current = chart;
    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#00ff88',
      downColor: '#ff0088',
      borderVisible: true,
      borderUpColor: '#00ff88',
      borderDownColor: '#ff0088',
      wickUpColor: '#00ff88',
      wickDownColor: '#ff0088',
    });
    
    seriesRef.current = series;
    series.setData(initialViewData);
    // 차트 축소: 더 많은 캔들이 한 화면에 보이도록 scrollToPosition 사용
    chart.timeScale().scrollToPosition(initialViewData.length * 0.6, true);

    // 리얼타임 업데이트 제너레이터
    function* getNextRealtimeUpdate(realtimeData: CandleData[]) {
      for (const dataPoint of realtimeData) {
        yield dataPoint;
      }
      return null;
    }
    const streamingDataProvider = getNextRealtimeUpdate(realtimeUpdates);

    intervalRef.current = setInterval(() => {
      const update = streamingDataProvider.next();
      if (update.done) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      let nextValue = update.value;
      if (forceDumpRef.current && lastCloseRef.current) {
        // 바로 다음 틱에서만 10%로 급락
        nextValue = {
          ...nextValue,
          close: lastCloseRef.current * 0.1,
          open: lastCloseRef.current * 0.1,
          high: lastCloseRef.current * 0.1,
          low: lastCloseRef.current * 0.1,
        };
        // 한 번만 적용 후 forceDumpRef.current = false로
        forceDumpRef.current = false;
      }
      series.update(nextValue);
    }, 120); // 원래 속도로 복원

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [timeframe, width, height]);

  return (
    <div
      ref={containerRef}
      style={{ 
        width: '100%', 
        height, 
        background: 'rgba(15,15,35,0.95)', 
        borderRadius: '0.7rem', 
        boxShadow: '0 2px 16px 0 #10131a55', 
        border: '1px solid #232a3a', 
        marginBottom: '2rem' 
      }}
    />
  );
} 