import React, { useState } from 'react';
import Timer from './Timer';

interface MainsProps {
  logo: string;
  name: string;
  prize: number;
  timerStart: number;
  showFire?: boolean;
  toggleOff?: boolean;
  ownedPrivateQuantity?: number;
  ownedPublicQuantity?: number;
  onDrawPrivate?: () => void;
  onDrawPublic?: () => void;
}

function Mains({
  logo,
  name,
  prize,
  timerStart,
  showFire,
  toggleOff,
  ownedPrivateQuantity = 2,
  ownedPublicQuantity = 0,
  onDrawPrivate,
  onDrawPublic,
}: MainsProps) {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [showDrawPopup, setShowDrawPopup] = useState(false);
  const [drawPopupInfo, setDrawPopupInfo] = useState({
    type: 'private' as 'private' | 'public',
  });

  const handleToggle = () => {
    if (!open1 && !open2) {
      setOpen1(true);
      setAnimating(true);
      setTimeout(() => {
        setOpen2(true);
        setAnimating(false);
      }, 200);
    } else {
      setOpen2(false);
      setOpen1(false);
    }
  };

  const handleDrawPrivate = () => {
    if (ownedPrivateQuantity > 0) {
      setDrawPopupInfo({ type: 'private' });
      setShowDrawPopup(true);
    }
  };

  const handleDrawPublic = () => {
    if (ownedPublicQuantity > 0) {
      setDrawPopupInfo({ type: 'public' });
      setShowDrawPopup(true);
    }
  };

  const handleConfirmDraw = () => {
    if (drawPopupInfo.type === 'private' && onDrawPrivate) {
      onDrawPrivate();
    } else if (drawPopupInfo.type === 'public' && onDrawPublic) {
      onDrawPublic();
    }
    setShowDrawPopup(false);
  };

  const handleCloseDrawPopup = () => {
    setShowDrawPopup(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-white flex items-center justify-between px-10 py-5 w-[1350px] h-[54px] bg-gradient-to-r bg-black from-[#876DFE]/30 via-gray-800/50 to-gray-900/50 rounded-4xl ">
        <div className="flex items-center gap-10 ml-4">
          <div className="relative flex items-center">
            <img src={logo} alt={name} className="w-8 h-8 rounded-full object-cover" />
            <div className="absolute -bottom-1 -right-5 w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <img src="/public/Monadraw.png" alt="Monadraw" className="w-6 h-6 object-contain" />
            </div>
          </div>
          <span className="font-bold text-lg">{name}</span>
        </div>
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <span className="text-neutral-500 text-base font-medium">Prize:</span>
            <div className="relative">
              <span className="text-white text-xl font-bold">${prize.toLocaleString()}</span>
              {showFire && (<span className="absolute -right-6 top-0 text-xl">🔥</span>)}
            </div>
          </div>
          <div className="w-px h-4 bg-gray-400"></div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-500 text-base font-medium">Deadline:</span>
            <span className="text-2xl font-bold text-teal-400">
              <Timer start={timerStart} className="text-2xl font-bold font-mono text-teal-400" />
            </span>
          </div>
          {!toggleOff && (
            <button className="ml-3 w-6 h-6 flex items-center justify-center rounded-full transition hover:bg-purple-300 hover:shadow-lg hover:ring-2 hover:ring-purple-200 hover:brightness-110" onClick={handleToggle} aria-label="상세 토글">
              <span className={`transition-transform duration-200 ${open1 ? 'rotate-180' : ''}`}>▼</span>
            </button>
          )}
        </div>
      </div>
      {!toggleOff && (
        <div className="relative w-full flex flex-row justify-center gap-6 items-center">
          <div className={`w-[480px] h-[128px] mt-1 mb-1 rounded-2xl shadow-[0_0_16px_4px_#a78bfa] hover:shadow-[0_0_32px_8px_#a78bfa] backdrop-blur-sm flex items-center justify-between px-8 transition-all duration-300 bg-gradient-to-b from-[#876DFE] via-[#232136] to-[#27272a] ${open1 ? 'opacity-100 translate-y-0 max-h-[128px]' : 'opacity-0 -translate-y-4 max-h-0 pointer-events-none'}`} style={{ transitionProperty: 'opacity,transform,max-height' }}>
            <div className="flex items-center h-full w-full">
              <div className="w-[120px] h-[120px] rounded-xl flex-shrink-0 mr-6 flex items-center justify-center relative">
                <img src="/public/Ticket1.png" alt="Ticket1" className="w-full h-full object-contain" />
                <div className="absolute -bottom-1 -right-1">
                  <img src={logo} alt={name} className="w-9 h-9 rounded-full object-cover relative -left-5 -top-5" />
                </div>
              </div>
              <div className="flex flex-col justify-center h-full flex-1">
                <div className={`transition-all duration-500 ${open1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <span className="text-2xl font-extrabold text-white">Private Ticket</span>
                  <div className="mt-5">
                    <button onClick={handleDrawPrivate} disabled={ownedPrivateQuantity <= 0} className="px-12 py-2 rounded-2xl bg-purple-500 text-white text-base font-extrabold shadow-lg hover:bg-purple-300 hover:text-purple-900 hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed">DRAW</button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 bg-purple-900/60 rounded-xl px-3 py-2 shadow-md">
                <span className="text-white text-xs font-semibold">보유 수량</span>
                <span className="text-white text-lg font-bold">{ownedPrivateQuantity}</span>
              </div>
            </div>
          </div>
          <div className={`w-[480px] h-[128px] mt-1 mb-1 rounded-2xl shadow-[0_0_16px_4px_#5eead4] hover:shadow-[0_0_32px_8px_#5eead4] backdrop-blur-sm flex items-center justify-between px-8 transition-all duration-300 bg-gradient-to-b from-[#2dd4bf] via-[#232136] to-[#27272a] ${open2 ? 'opacity-100 translate-y-0 max-h-[128px]' : 'opacity-0 -translate-y-4 max-h-0 pointer-events-none'}`} style={{ transitionProperty: 'opacity,transform,max-height' }}>
            <div className="flex items-center h-full w-full">
              <div className="w-[140px] h-[140px] rounded-xl flex-shrink-0 mr-6 flex items-center justify-center relative">
                <img src="/public/Tikcket2.png" alt="Ticket2" className="w-full h-full object-contain" />
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center relative -left-5 -top-5">
                    <img src="/public/Monadraw.png" alt="Monadraw" className="w-6 h-6 object-contain" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center h-full flex-1">
                <div className={`transition-all duration-500 ${open2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                  <span className="text-2xl font-extrabold text-white">Public Ticket</span>
                  <div className="mt-5">
                    <button onClick={handleDrawPublic} disabled={ownedPublicQuantity <= 0} className="px-12 py-2 rounded-2xl bg-teal-400 text-white text-base font-extrabold shadow-lg hover:bg-teal-200 hover:text-teal-900 hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed">DRAW</button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2 bg-teal-900/60 rounded-xl px-3 py-2 shadow-md">
                <span className="text-white text-xs font-semibold">보유 수량</span>
                <span className="text-white text-lg font-bold">{ownedPublicQuantity}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Draw 팝업 */}
      {showDrawPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="w-96 h-72 rounded-2xl p-8 flex flex-col items-center justify-center relative bg-black bg-opacity-80">
            <button onClick={handleCloseDrawPopup} className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300">×</button>
            <div className="text-center">
              <span className="text-2xl font-bold text-white mb-4 block">DRAW</span>
              <span className="text-lg text-white">정말로 {drawPopupInfo.type === 'private' ? 'Private' : 'Public'} Ticket을 사용해 추첨하시겠습니까?</span>
              <div className="flex gap-4 mt-8 justify-center">
                <button onClick={handleConfirmDraw} className="px-8 py-2 bg-purple-500 text-white text-lg font-bold rounded-lg hover:bg-purple-600 transition-all duration-300">확인</button>
                <button onClick={handleCloseDrawPopup} className="px-8 py-2 bg-gray-500 text-white text-lg font-bold rounded-lg hover:bg-gray-600 transition-all duration-300">취소</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mains;
