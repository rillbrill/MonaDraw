// Timer.tsx
import React, { useState, useEffect } from 'react';

interface TimerProps {
  start?: number;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ start, className }) => {
  const INITIAL_SECONDS = start ?? 30;
  const [seconds, setSeconds] = useState<number>(INITIAL_SECONDS);

  useEffect(() => {
    setSeconds(INITIAL_SECONDS);
  }, [INITIAL_SECONDS]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev - 1 <= 0) {
          return start ? INITIAL_SECONDS : 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 00:00:00 형태로 변환
  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <span className={className ?? 'text-xl font-bold font-mono text-teal-400'}>
      {formatTime(seconds)}
    </span>
  );
};

export default Timer;
