import React, { useState, useEffect } from 'react';
import Timer from './ui/Timer';

function AnimatedPrizeNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setDisplayValue(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplayValue(value);
    }
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <div className="text-5xl font-extrabold text-yellow-300 drop-shadow-lg animate-bounce" style={{animationDuration:'1.2s',display:'inline-block',transform:'scale(1.15)'}}>
      ${displayValue.toLocaleString()}
    </div>
  );
}

const pools = [
  { logo: '/public/Btc.webp', name: 'BTCp', prize: 320356032 },
  { logo: '/public/Eth.png', name: 'ETHp', prize: 98342032 },
  { logo: '/public/Xrp.png', name: 'XRPp', prize: 57973630 },
  { logo: '/public/Pepe.png', name: 'PEPEp', prize: 587643260 },
  { logo: '/public/Sui.webp', name: 'SUIp', prize: 87398203 },
  { logo: '/public/Kaito.png', name: 'KAITOp', prize: 15463022 },
];

const DrawPage: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState(10);
  const [categoryTimers, setCategoryTimers] = useState<number[]>([10,10,10,10,10,10]);
  const [categoryTimerRunning, setCategoryTimerRunning] = useState<boolean[]>([false,false,false,false,false,false]);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    if (selectedIdx !== null) {
      setTimerSeconds(10);
      const interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [selectedIdx]);

  const handleCategoryTimerClick = (index: number) => {
    setCategoryTimerRunning((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
    if (!categoryTimerRunning[index]) {
      setCategoryTimers((prev) => {
        const newTimers = [...prev];
        newTimers[index] = 10;
        return newTimers;
      });
    }
  };

  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    categoryTimerRunning.forEach((isRunning, index) => {
      if (isRunning) {
        const interval = setInterval(() => {
          setCategoryTimers((prev) => {
            const newTimers = [...prev];
            if (newTimers[index] <= 1) {
              clearInterval(interval);
              setCategoryTimerRunning((prev) => {
                const newState = [...prev];
                newState[index] = false;
                return newState;
              });
              return newTimers;
            }
            newTimers[index] = newTimers[index] - 1;
            return newTimers;
          });
        }, 1000);
        intervals.push(interval);
      }
    });
    return () => { intervals.forEach(clearInterval); };
  }, [categoryTimerRunning]);

  const handleResultClick = () => setShowResultModal(true);
  const handleCloseModal = () => setShowResultModal(false);

  return (
    <div
      className="flex col-auto flex-col w-full h-full rounded-lg mt-5 gap-7"
      style={{
        backgroundImage: 'url(/public/Squidn.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      {/* 6개 풀을 3x2 그리드로 배치 */}
      <div className="flex flex-col items-center w-full">
        <div className="grid grid-cols-3 gap-6 w-full max-w-7xl">
          {pools.map((pool, index) => (
            <div
              key={pool.name}
              className={`rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 border border-gray-700 hover:border-purple-500 ${selectedIdx === index ? 'ring-4 ring-purple-400' : ''}`}
              style={{ background: 'linear-gradient(to right, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 0.5))' }}
              onClick={() => setSelectedIdx(index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={pool.logo} alt={pool.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="absolute -bottom-1 -right-1">
                      <div className="w-5 h-5 rounded-full bg-black flex items-center justify-center">
                        <img src="/public/Monadraw.png" alt="Monadraw" className="w-3 h-3 object-contain" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white text-lg font-bold">{pool.name}</h3>
                    <p className="text-white text-sm">Prize: ${pool.prize.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-white text-xs font-medium">Next:</span>
                  <div className="cursor-pointer" onClick={e => {e.stopPropagation(); handleCategoryTimerClick(index);}}>
                    <Timer start={categoryTimers[index]} className="text-sm font-bold font-mono text-teal-400" autoStart={false} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 대시보드 판 */}
      <div className="flex flex-col items-center w-full mt-8">
        {selectedIdx !== null && (
          <div
            className="w-full max-w-7xl rounded-2xl p-8 cursor-pointer hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 border border-gray-700 hover:border-purple-500 flex flex-col items-center justify-center"
            style={{ background: 'linear-gradient(to right, rgba(31, 41, 55, 0.5), rgba(17, 24, 39, 0.5))', height: '600px' }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-white text-xs font-medium">Next:</span>
              <Timer key={selectedIdx} start={10} className="text-7xl font-bold font-mono text-teal-400" />
              {timerSeconds === 0 && (
                <div className="flex items-center gap-4 ml-8">
                  <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                    <img src="/public/Monadraw.png" alt="Monadraw" className="w-8 h-8 object-contain" />
                  </div>
                  <button onClick={handleResultClick} className="px-12 py-4 bg-teal-500 text-white text-2xl font-bold rounded-lg hover:bg-teal-600 transition-all duration-300">RESULT</button>
                </div>
              )}
            </div>
            <AnimatedPrizeNumber value={pools[selectedIdx].prize} />
            <div className="flex items-center gap-4 mt-8">
              <img src="/public/Monadraw.png" alt="Monadraw" className="w-12 h-12 object-contain" />
              <span className="text-white text-4xl font-bold">123,456</span>
            </div>
          </div>
        )}
      </div>
      {/* Result 모달 */}
      {showResultModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-1/2 h-1/2 rounded-2xl p-8 flex flex-col items-center justify-center relative" style={{ background: 'transparent' }}>
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300">×</button>
            <div className="text-center relative">
              <img src={selectedIdx !== null && selectedIdx <= 2 ? '/public/Fail.png' : '/public/Yes.png'} alt={selectedIdx !== null && selectedIdx <= 2 ? 'Fail' : 'Yes'} className="w-[768px] h-[768px] object-contain" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-8xl font-bold animate-fade-in ${selectedIdx !== null && selectedIdx <= 2 ? 'text-red-600' : 'text-white'}`} style={{ animation: 'fadeIn 0.5s ease-in-out 1s both' }}>
                  {selectedIdx !== null && selectedIdx <= 2 ? 'Sorry' : 'Congratulations, You win!'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrawPage; 