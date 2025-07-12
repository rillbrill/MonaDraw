import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp } from 'lucide-react';
import { createChart, ColorType, CandlestickSeries } from 'lightweight-charts';
import type { Time } from 'lightweight-charts';
import RealtimeCandleChart from './RealtimeCandleChart';

interface TradingPair {
  pair: string;
  price: string;
  change: string;
  volume: string;
}

interface OrderBookItem {
  price: string;
  amount: string;
  total: string;
}

interface RecentTrade {
  price: string;
  amount: string;
  time: string;
  side: 'buy' | 'sell';
}

interface OrderBook {
  asks: OrderBookItem[];
  bids: OrderBookItem[];
}

const TradeDEX = () => {
  const [orderType, setOrderType] = useState('limit');
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');
  const [timeframe, setTimeframe] = useState('1m');
  const [forceDump, setForceDump] = useState(false);

  // Mock data
  const tradingPairs: TradingPair[] = [
    { pair: 'BTC/USDT', price: '43,250.00', change: '+2.5%', volume: '1.2B' },
    { pair: 'ETH/USDT', price: '2,850.00', change: '-1.2%', volume: '890M' },
    { pair: 'SOL/USDT', price: '98.50', change: '+5.8%', volume: '450M' },
    { pair: 'ADA/USDT', price: '0.45', change: '+0.8%', volume: '120M' },
  ];

  const orderBook: OrderBook = {
    asks: [
      { price: '43,255.00', amount: '0.125', total: '5,406.88' },
      { price: '43,250.00', amount: '0.250', total: '10,812.50' },
      { price: '43,245.00', amount: '0.500', total: '21,622.50' },
    ],
    bids: [
      { price: '43,240.00', amount: '0.300', total: '12,972.00' },
      { price: '43,235.00', amount: '0.175', total: '7,566.13' },
      { price: '43,230.00', amount: '0.400', total: '17,292.00' },
    ]
  };

  const recentTrades: RecentTrade[] = [
    { price: '43,250.00', amount: '0.125', time: '14:32:15', side: 'buy' },
    { price: '43,249.00', amount: '0.250', time: '14:32:10', side: 'sell' },
    { price: '43,251.00', amount: '0.100', time: '14:32:05', side: 'buy' },
    { price: '43,248.00', amount: '0.300', time: '14:31:58', side: 'sell' },
    { price: '43,252.00', amount: '0.075', time: '14:31:52', side: 'buy' },
  ];

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // 매수/매도 버튼 클릭 시 forceDump를 true로 변경
    setForceDump(true);
    console.log('Order submitted:', { side, orderType, amount, price });
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Header */}
      <div className="text-white text-[16px] h-[52px] items-start flex justify-between mt-5 mb-8">
        <span className="text-3xl font-extrabold m-5 ml-35 text-white">Chart</span>
      </div>
      
      {/* Main Content */}
      <div className="flex flex-col w-full">
        <div className="flex flex-col gap-6">
          {/* Chart and Trading Form Row */}
          <div className="flex flex-row gap-8 justify-center mb-12">
            {/* Chart Section */}
            <div className="bg-[rgba(24,28,36,0.85)] rounded-[0.7rem] shadow-[0_2px_16px_0_#10131a55] border border-[#232a3a] p-6 backdrop-blur-[6px] min-h-[500px] w-[1200px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-[1.125rem] font-semibold text-white">BTC/USDT 차트</h2>
                <div className="flex gap-2 items-center">
                  <button 
                    className={`px-4 py-2 rounded-[0.375rem] text-sm font-medium transition-all duration-200 border border-[#232a3a] ${
                      timeframe === '1m' 
                        ? 'bg-[#7c3aed] text-white' 
                        : 'bg-[rgba(24,28,36,0.7)] text-[#b0b8c1] hover:bg-[rgba(36,40,52,0.8)] hover:border-[#7c3aed]'
                    }`}
                    onClick={() => setTimeframe('1m')}
                  >
                    1m
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-[0.375rem] text-sm font-medium transition-all duration-200 border border-[#232a3a] ${
                      timeframe === '5m' 
                        ? 'bg-[#7c3aed] text-white' 
                        : 'bg-[rgba(24,28,36,0.7)] text-[#b0b8c1] hover:bg-[rgba(36,40,52,0.8)] hover:border-[#7c3aed]'
                    }`}
                    onClick={() => setTimeframe('5m')}
                  >
                    5m
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-[0.375rem] text-sm font-medium transition-all duration-200 border border-[#232a3a] ${
                      timeframe === '15m' 
                        ? 'bg-[#7c3aed] text-white' 
                        : 'bg-[rgba(24,28,36,0.7)] text-[#b0b8c1] hover:bg-[rgba(36,40,52,0.8)] hover:border-[#7c3aed]'
                    }`}
                    onClick={() => setTimeframe('15m')}
                  >
                    15m
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-[0.375rem] text-sm font-medium transition-all duration-200 border border-[#232a3a] ${
                      timeframe === '1h' 
                        ? 'bg-[#7c3aed] text-white' 
                        : 'bg-[rgba(24,28,36,0.7)] text-[#b0b8c1] hover:bg-[rgba(36,40,52,0.8)] hover:border-[#7c3aed]'
                    }`}
                    onClick={() => setTimeframe('1h')}
                  >
                    1h
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-[0.375rem] text-sm font-medium transition-all duration-200 border border-[#232a3a] ${
                      timeframe === '4h' 
                        ? 'bg-[#7c3aed] text-white' 
                        : 'bg-[rgba(24,28,36,0.7)] text-[#b0b8c1] hover:bg-[rgba(36,40,52,0.8)] hover:border-[#7c3aed]'
                    }`}
                    onClick={() => setTimeframe('4h')}
                  >
                    4h
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-[0.375rem] text-sm font-medium transition-all duration-200 border border-[#232a3a] ${
                      timeframe === '1d' 
                        ? 'bg-[#7c3aed] text-white' 
                        : 'bg-[rgba(24,28,36,0.7)] text-[#b0b8c1] hover:bg-[rgba(36,40,52,0.8)] hover:border-[#7c3aed]'
                    }`}
                    onClick={() => setTimeframe('1d')}
                  >
                    1d
                  </button>
                </div>
              </div>
              <div className="mb-8">
                <div className="text-[#b0b8c1] font-bold mb-2">{timeframe}봉</div>
                <RealtimeCandleChart timeframe={timeframe} height={320} forceDump={forceDump} />
              </div>
            </div>

            {/* Trading Form */}
            <div className="bg-[rgba(36,40,52,0.92)] rounded-[0.7rem] shadow-[0_2px_16px_0_#10131a55] border border-[#232a3a] overflow-hidden backdrop-blur-[4px] w-[300px]">
              <div className="p-4 border-b border-[#232a3a]">
                <div className="flex gap-1 mb-4">
                  <button
                    onClick={() => setSide('buy')}
                    className={`flex-1 px-4 py-2 rounded-[0.375rem] text-sm font-medium transition-all duration-200 border-none cursor-pointer ${
                      side === 'buy'
                        ? 'bg-gradient-to-r from-[#00ff88] to-[#10b981] text-black'
                        : 'text-[#b0b8c1] bg-[rgba(24,28,36,0.7)] hover:text-[#00ff88] hover:bg-[rgba(0,255,136,0.1)]'
                    }`}
                  >
                    매수
                  </button>
                  <button
                    onClick={() => setSide('sell')}
                    className={`flex-1 px-4 py-2 rounded-[0.375rem] text-sm font-medium transition-all duration-200 border-none cursor-pointer ${
                      side === 'sell'
                        ? 'bg-gradient-to-r from-[#ff0088] to-[#ef4444] text-white'
                        : 'text-[#b0b8c1] bg-[rgba(24,28,36,0.7)] hover:text-[#ff0088] hover:bg-[rgba(255,0,136,0.1)]'
                    }`}
                  >
                    매도
                  </button>
                </div>
              </div>
              <div className="p-4">
                <form onSubmit={handleSubmitOrder} className="flex flex-col gap-4">
                  {/* Order Type */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#b0b8c1] mb-2">주문 유형</label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full px-3 py-2 border border-[#232a3a] rounded-[0.375rem] text-sm bg-[rgba(24,28,36,0.7)] text-white focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
                    >
                      <option value="limit">지정가</option>
                      <option value="market">시장가</option>
                    </select>
                  </div>

                  {/* Price */}
                  {orderType === 'limit' && (
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-[#b0b8c1] mb-2">가격 (USDT)</label>
                      <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full px-3 py-2 border border-[#232a3a] rounded-[0.375rem] text-sm bg-[rgba(24,28,36,0.7)] text-white focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
                      />
                    </div>
                  )}

                  {/* Amount */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#b0b8c1] mb-2">수량 (BTC)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full px-3 py-2 border border-[#232a3a] rounded-[0.375rem] text-sm bg-[rgba(24,28,36,0.7)] text-white focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
                    />
                  </div>

                  {/* Total */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-[#b0b8c1] mb-2">총액 (USDT)</label>
                    <input
                      type="text"
                      value={price && amount ? (parseFloat(price) * parseFloat(amount)).toFixed(2) : ''}
                      readOnly
                      className="w-full px-3 py-2 border border-[#232a3a] rounded-[0.375rem] text-sm bg-[rgba(35,42,58,0.5)] text-white focus:outline-none focus:border-[#7c3aed] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.1)]"
                    />
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className={`w-full px-4 py-3 rounded-[0.375rem] font-medium transition-all duration-200 border-none cursor-pointer text-sm ${
                      side === 'buy'
                        ? 'bg-gradient-to-r from-[#00ff88] to-[#10b981] text-black hover:from-[#10b981] hover:to-[#00ff88]'
                        : 'bg-gradient-to-r from-[#ff0088] to-[#ef4444] text-white hover:from-[#ef4444] hover:to-[#ff0088]'
                    }`}
                  >
                    {side === 'buy' ? '매수' : '매도'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trading Info Panels */}
      <div className="flex flex-col gap-2 items-center mb-8 mt-12">
        <div className="w-full flex flex-col items-center">
          
          {/* Trading Info Panels */}
          <div className="relative w-[1200px] flex flex-row justify-center gap-10 items-start mx-auto">
            {/* Trading Pairs */}
            <div className="bg-[rgba(36,40,52,0.92)] rounded-[0.7rem] shadow-[0_2px_16px_0_#10131a55] border border-[#232a3a] overflow-hidden backdrop-blur-[4px] flex-1">
              <div className="p-4 border-b border-[#232a3a]">
                <h2 className="text-[1.125rem] font-semibold text-white">거래쌍</h2>
              </div>
              <div className="p-4">
                <div className="flex flex-col gap-3">
                  {tradingPairs.map((pair) => (
                    <div key={pair.pair} className="flex items-center justify-between p-2 rounded-[0.5rem] cursor-pointer transition-colors duration-200 hover:bg-[rgba(35,42,58,0.5)]">
                      <div>
                        <div className="font-medium text-white">{pair.pair}</div>
                        <div className="text-sm text-[#b0b8c1]">${pair.price}</div>
                      </div>
                      <div className={`text-sm font-medium ${pair.change.startsWith('+') ? 'text-[#00ff88]' : 'text-[#ff0088]'}`}>
                        {pair.change}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Book */}
            <div className="bg-[rgba(36,40,52,0.92)] rounded-[0.7rem] shadow-[0_2px_16px_0_#10131a55] border border-[#232a3a] overflow-hidden backdrop-blur-[4px] flex-1">
              <div className="p-4 border-b border-[#232a3a]">
                <h2 className="text-[1.125rem] font-semibold text-white">호가창</h2>
              </div>
              <div className="p-4">
                {/* Asks */}
                <div className="mb-4">
                  <div className="text-sm font-medium mb-2 text-[#dc2626]">매도</div>
                  <div>
                    {orderBook.asks.map((ask, index) => (
                      <div key={index} className="flex justify-between text-sm mb-1">
                        <span className="text-[#ff0088]">{ask.price}</span>
                        <span className="text-[#b0b8c1]">{ask.amount}</span>
                        <span className="text-[#7c3aed]">{ask.total}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Bids */}
                <div>
                  <div className="text-sm font-medium mb-2 text-[#059669]">매수</div>
                  <div>
                    {orderBook.bids.map((bid, index) => (
                      <div key={index} className="flex justify-between text-sm mb-1">
                        <span className="text-[#00ff88]">{bid.price}</span>
                        <span className="text-[#b0b8c1]">{bid.amount}</span>
                        <span className="text-[#7c3aed]">{bid.total}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-[rgba(36,40,52,0.92)] rounded-[0.7rem] shadow-[0_2px_16px_0_#10131a55] border border-[#232a3a] overflow-hidden backdrop-blur-[4px] flex-1">
              <div className="p-4 border-b border-[#232a3a]">
                <h2 className="text-[1.125rem] font-semibold text-white">최근 거래</h2>
              </div>
              <div className="p-4">
                <div className="flex flex-col gap-2">
                  {recentTrades.map((trade, index) => (
                    <div key={index} className="flex justify-between items-center text-sm mb-2">
                      <div className={`font-medium ${trade.side === 'buy' ? 'text-[#00ff88]' : 'text-[#ff0088]'}`}>
                        {trade.price}
                      </div>
                      <div className="text-[#b0b8c1]">{trade.amount}</div>
                      <div className="text-[#7c3aed]">{trade.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeDEX; 