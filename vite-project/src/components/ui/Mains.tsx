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

  // toggleOff가 true면 토글 관련 상태/함수/버튼/상세박스 모두 제거
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-white flex items-center justify-between px-10 py-5 w-[1350px] h-[54px] bg-gradient-to-r bg-black from-[#876DFE]/30 via-gray-800/50 to-gray-900/50 rounded-4xl ">
        {/* 좌측: 로고 + 코인명 */}
        <div className="flex items-center gap-10 ml-4">
          <div className="relative flex items-center">
            <img
              src={logo}
              alt={name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-5 w-8 h-8 rounded-full bg-black flex items-center justify-center">
              <img
                src="/public/Monadraw.png"
                alt="Monadraw"
                className="w-6 h-6 object-contain"
              />
            </div>
          </div>
          <span className="font-bold text-lg">{name}</span>
        </div>
        {/* 우측: 상금 + 타이머 + (토글버튼은 toggleOff일 때 미표시) */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-4">
            <span className="text-neutral-500 text-base font-medium">
              Prize:
            </span>
            <div className="relative">
              <span className="text-white text-xl font-bold">
                ${prize.toLocaleString()}
              </span>
              {showFire && (
                <span className="absolute -right-6 top-0 text-xl">🔥</span>
              )}
            </div>
          </div>
          <div className="w-px h-4 bg-gray-400"></div>
          <div className="flex items-center gap-4">
            <span className="text-neutral-500 text-base font-medium">
              Deadline:
            </span>
            <span className="text-2xl font-bold text-teal-400">
              <Timer
                start={timerStart}
                className="text-2xl font-bold font-mono text-teal-400"
              />
            </span>
          </div>
          {/* 토글버튼은 toggleOff 아닐 때만 */}
          {!toggleOff && (
            <button
              className="ml-3 w-6 h-6 flex items-center justify-center rounded-full transition hover:bg-purple-300 hover:shadow-lg hover:ring-2 hover:ring-purple-200 hover:brightness-110"
              onClick={handleToggle}
              aria-label="상세 토글"
            >
              <span
                className={`transition-transform duration-200 ${
                  open1 ? 'rotate-180' : ''
                }`}
              >
                ▼
              </span>
            </button>
          )}
        </div>
      </div>
      {/* 상세 박스는 toggleOff 아닐 때만 */}
      {!toggleOff && (
        <div className="relative w-full flex flex-row justify-center gap-6 items-center">
          {/* T1 */}
          <div
            className={`w-[480px] h-[128px] mt-1 mb-1 rounded-2xl shadow-[0_0_16px_4px_#a78bfa] hover:shadow-[0_0_32px_8px_#a78bfa] backdrop-blur-sm flex items-center justify-between px-8 transition-all duration-300
            bg-gradient-to-b from-[#876DFE] via-[#232136] to-[#27272a]
            ${
              open1
                ? 'opacity-100 translate-y-0 max-h-[128px]'
                : 'opacity-0 -translate-y-4 max-h-0 pointer-events-none'
            }`}
            style={{ transitionProperty: 'opacity,transform,max-height' }}
          >
            <div className="flex items-center h-full w-full">
              <div className="w-[120px] h-[120px] rounded-xl flex-shrink-0 mr-6 flex items-center justify-center relative">
                <img
                  src="/public/Ticket1.png"
                  alt="Ticket1"
                  className="w-full h-full object-contain"
                />
                {/* 티켓 이미지 우측 하단에 로고 세트 배치 */}
                <div className="absolute -bottom-1 -right-1">
                  <img
                    src={logo}
                    alt={name}
                    className="w-9 h-9 rounded-full object-cover relative -left-5 -top-5"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center h-full flex-1">
                <div
                  className={`transition-all duration-500
                ${
                  open1
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-10'
                }`}
                >
                  <span className="text-2xl font-extrabold text-white">
                    Private Ticket
                  </span>
                  <div className="mt-5">
                    <button
                      onClick={handleDrawPrivate}
                      disabled={ownedPrivateQuantity <= 0}
                      className="px-12 py-2 rounded-2xl bg-purple-500 text-white text-base font-extrabold shadow-lg hover:bg-purple-300 hover:text-purple-900 hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      DRAW
                    </button>
                  </div>
                </div>
              </div>
              {/* 우측 보유 수량 표시 */}
              <div className="flex flex-col items-center gap-2 bg-purple-900/60 rounded-xl px-3 py-2 shadow-md">
                <span className="text-white text-xs font-semibold">
                  보유 수량
                </span>
                <span className="text-white text-lg font-bold">
                  {ownedPrivateQuantity}
                </span>
              </div>
            </div>
          </div>
          {/* T2 */}
          <div
            className={`w-[480px] h-[128px] mt-1 mb-1 rounded-2xl shadow-[0_0_16px_4px_#5eead4] hover:shadow-[0_0_32px_8px_#5eead4] backdrop-blur-sm flex items-center justify-between px-8 transition-all duration-300
            bg-gradient-to-b from-[#2dd4bf] via-[#232136] to-[#27272a]
            ${
              open2
                ? 'opacity-100 translate-y-0 max-h-[128px]'
                : 'opacity-0 -translate-y-4 max-h-0 pointer-events-none'
            }`}
            style={{ transitionProperty: 'opacity,transform,max-height' }}
          >
            <div className="flex items-center h-full w-full">
              <div className="w-[140px] h-[140px] rounded-xl flex-shrink-0 mr-6 flex items-center justify-center relative">
                <img
                  src="/public/Tikcket2.png"
                  alt="Ticket2"
                  className="w-full h-full object-contain"
                />
                {/* 티켓 이미지 우측 하단에 Monadraw 로고 배치 */}
                <div className="absolute -bottom-1 -right-1">
                  <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center relative -left-5 -top-5">
                    <img
                      src="/public/Monadraw.png"
                      alt="Monadraw"
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center h-full flex-1">
                <div
                  className={`transition-all duration-500
                ${
                  open2
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-10'
                }`}
                >
                  <span className="text-2xl font-extrabold text-white">
                    Public Ticket
                  </span>
                  <div className="mt-5">
                    <button
                      onClick={handleDrawPublic}
                      disabled={ownedPublicQuantity <= 0}
                      className="px-12 py-2 rounded-2xl bg-teal-400 text-white text-base font-extrabold shadow-lg hover:bg-teal-200 hover:text-teal-900 hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      DRAW
                    </button>
                  </div>
                </div>
              </div>
              {/* 우측 보유 수량 표시 */}
              <div className="flex flex-col items-center gap-2 bg-teal-900/60 rounded-xl px-3 py-2 shadow-md">
                <span className="text-white text-xs font-semibold">
                  보유 수량
                </span>
                <span className="text-white text-lg font-bold">
                  {ownedPublicQuantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 응모 확인 팝업 */}
      {showDrawPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-white text-lg font-bold mb-4">응모 확인</h3>
            <p className="text-white mb-4">{name}에 응모하시겠습니까?</p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmDraw}
                className="flex-1 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
              >
                확인
              </button>
              <button
                onClick={handleCloseDrawPopup}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Mains;
