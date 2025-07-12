import {
  Earth,
  Home,
  MoveDownIcon,
  Plus,
  Search,
  ShoppingBagIcon,
} from 'lucide-react';
import Main from './components/ui/Main';
import Mains from './components/ui/Mains';
import CategoryBar from './components/ui/CategoryBar';
import { Routes, Route, Link } from 'react-router-dom';
import React, { createContext, useContext, useState } from 'react';

// 전역 티켓 상태 관리 Context
interface TicketContextType {
  ownedQuantities: Array<{ private: number; public: number }>;
  updateOwnedQuantity: (
    idx: number,
    type: 'private' | 'public',
    quantity: number
  ) => void;
  resetOwnedQuantity: (idx: number, type: 'private' | 'public') => void;
}

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const useTicketContext = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicketContext must be used within a TicketProvider');
  }
  return context;
};

function TicketProvider({ children }: { children: React.ReactNode }) {
  const [ownedQuantities, setOwnedQuantities] = useState(
    Array.from({ length: 6 }, () => ({ private: 2, public: 0 })) // Private: 2, Public: 0 초기값
  );

  const updateOwnedQuantity = (
    idx: number,
    type: 'private' | 'public',
    quantity: number
  ) => {
    setOwnedQuantities((prev) =>
      prev.map((q, i) =>
        i === idx
          ? {
              ...q,
              [type]: q[type] + quantity,
            }
          : q
      )
    );
  };

  const resetOwnedQuantity = (idx: number, type: 'private' | 'public') => {
    setOwnedQuantities((prev) =>
      prev.map((q, i) =>
        i === idx
          ? {
              ...q,
              [type]: 0,
            }
          : q
      )
    );
  };

  return (
    <TicketContext.Provider
      value={{ ownedQuantities, updateOwnedQuantity, resetOwnedQuantity }}
    >
      {children}
    </TicketContext.Provider>
  );
}

function PrizePoolPage() {
  const { ownedQuantities, resetOwnedQuantity } = useTicketContext();

  const prizePools = [
    {
      logo: '/public/Btc.webp',
      name: 'BTCp',
      prize: 320356032,
      timerStart: 600,
    },
    {
      logo: '/public/Eth.png',
      name: 'ETHp',
      prize: 98342032,
      timerStart: 800,
    },
    {
      logo: '/public/Xrp.png',
      name: 'XRPp',
      prize: 57973630,
      timerStart: 1200,
    },
    {
      logo: '/public/Pepe.png',
      name: 'PEPEp',
      prize: 587643260,
      timerStart: 300,
    },
    {
      logo: '/public/Sui.webp',
      name: 'SUIp',
      prize: 87398203,
      timerStart: 900,
    },
    {
      logo: '/public/Kaito.png',
      name: 'KAITOp',
      prize: 15463022,
      timerStart: 1500,
    },
  ];
  return (
    <div className="flex col-auto flex-col w-full h-full rounded-lg mt-5 gap-7 ">
      {/* 프라이즈 풀 */}
      <div className="text-white text-[16px] h-[52px] items-start flex  justify-between ">
        <span className="text-3xl font-extrabold m-5 ml-35 text-white">
          Prize Pool
        </span>
      </div>
      {/* 대시보드 */}
      <div className="flex flex-col w-full h-full ">
        <div className="flex flex-col gap-6">
          {/* 스크롤 박스  */}
          <div className="flex flex-row gap-6 justify-center">
            {[
              { id: 1, label: 'Earliest Deadline' },
              { id: 2, label: 'Highest Prize' },
              { id: 3, label: 'Most Entries' },
            ].map((item: { id: number; label: string }) => {
              return <Main props={item} />;
            })}
          </div>
          {/* 카테고리 바 */}
          <CategoryBar />
          {/* 본문 */}
        </div>

        {/* /상금풀 */}
        <div
          className="w-[1350px] h-[3px] mx-auto rounded-full my-[18px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(45,212,191,0.5) 0%, rgba(94,234,212,0.5) 100%)',
          }}
        ></div>
        <div className="flex flex-col gap-2 items-center overflow-y-auto max-h-[calc(100vh-300px)]">
          {prizePools.map((item, index) => (
            <Mains
              key={index}
              logo={item.logo}
              name={item.name}
              prize={item.prize}
              timerStart={item.timerStart}
              showFire={index === 0 || index === 3}
              ownedPrivateQuantity={ownedQuantities[index].private}
              ownedPublicQuantity={ownedQuantities[index].public}
              onDrawPrivate={() => resetOwnedQuantity(index, 'private')}
              onDrawPublic={() => resetOwnedQuantity(index, 'public')}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function EmptyPage({ label }: { label: string }) {
  return (
    <div className="flex flex-1 items-center justify-center text-3xl text-neutral-600">
      {label} (준비중)
    </div>
  );
}

function TicketPage() {
  // PrizePoolPage에서 사용한 p 6개 정보 그대로 복사
  const prizePools = [
    {
      logo: '/public/Btc.webp',
      name: 'BTCp',
      prize: 320356032,
      timerStart: 600,
    },
    {
      logo: '/public/Eth.png',
      name: 'ETHp',
      prize: 98342032,
      timerStart: 800,
    },
    {
      logo: '/public/Xrp.png',
      name: 'XRPp',
      prize: 57973630,
      timerStart: 1200,
    },
    {
      logo: '/public/Pepe.png',
      name: 'PEPEp',
      prize: 587643260,
      timerStart: 300,
    },
    {
      logo: '/public/Sui.webp',
      name: 'SUIp',
      prize: 87398203,
      timerStart: 900,
    },
    {
      logo: '/public/Kaito.png',
      name: 'KAITOp',
      prize: 15463022,
      timerStart: 1500,
    },
  ];
  // 빈 대시보드 껍데기용 props
  const emptyDashboard = { props: { id: 0, label: '' } };

  // 전역 티켓 상태 사용
  const { ownedQuantities, updateOwnedQuantity } = useTicketContext();

  // 구매 대기 수량 상태
  const [pendingQuantities, setPendingQuantities] = React.useState(
    Array.from({ length: 6 }, () => ({ private: 0, public: 0 }))
  );
  const [showPopup, setShowPopup] = React.useState(false);
  const [popupInfo, setPopupInfo] = React.useState({
    idx: 0,
    type: 'private' as 'private' | 'public',
    quantity: 0,
  });

  // 구매 대기 수량 변경 핸들러
  const handlePendingQuantityChange = (
    idx: number,
    type: 'private' | 'public',
    value: number
  ) => {
    setPendingQuantities((prev) =>
      prev.map((q, i) =>
        i === idx
          ? {
              ...q,
              [type]: Math.max(0, Math.min(10, value)),
            }
          : q
      )
    );
  };

  // BUY 버튼 클릭 핸들러
  const handleBuyClick = (idx: number, type: 'private' | 'public') => {
    const quantity = pendingQuantities[idx][type];
    if (quantity > 0) {
      setPopupInfo({ idx, type, quantity });
      setShowPopup(true);
    }
  };

  // 팝업 확인 핸들러
  const handleConfirmBuy = () => {
    const { idx, type, quantity } = popupInfo;
    updateOwnedQuantity(idx, type, quantity);
    setPendingQuantities((prev) =>
      prev.map((q, i) =>
        i === idx
          ? {
              ...q,
              [type]: 0,
            }
          : q
      )
    );
    setShowPopup(false);
  };

  // 팝업 닫기 핸들러
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="flex col-auto flex-col w-full h-full rounded-lg mt-5 gap-7 ">
      {/* 티켓 마켓 */}
      <div className="text-white text-[16px] h-[52px] items-start flex  justify-between ">
        <span className="text-3xl font-extrabold m-5 ml-35 text-white">
          Ticket Market
        </span>
      </div>
      {/* 카테고리 바 - 제목과 10px 간격 */}
      <div style={{ marginTop: '10px' }}>
        <CategoryBar />
      </div>
      {/* 카테고리 아래 20px 여백 후 p-1 카드 + 대시보드 2개 세트 */}
      <div
        style={{ marginTop: '20px' }}
        className="flex flex-col items-center w-full"
      >
        <Mains
          logo="/public/Btc.webp"
          name="BTCp"
          prize={320356032}
          timerStart={600}
          toggleOff={true}
        />
        <div className="flex flex-row gap-[36px] justify-center mt-6 w-full">
          {/* Private Ticket 대시보드 */}
          <div className="text-white w-[500px] h-[280px] flex items-center justify-center rounded-2xl shadow-[0_0_16px_4px_#a78bfa] bg-gradient-to-b from-[#876DFE] via-[#232136] to-[#27272a]">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <span className="text-xl font-extrabold text-white mb-2">
                Private Ticket
              </span>
              <div className="relative">
                <img
                  src="/public/Ticket1.png"
                  alt="Ticket1"
                  className="w-28 h-28 object-contain mb-2"
                />
                {/* 티켓 이미지 우측 하단에 로고 세트 배치 */}
                <div className="absolute -bottom-1 -right-1">
                  <img
                    src="/public/Btc.webp"
                    alt="BTCp"
                    className="w-9 h-9 rounded-full object-cover relative -left-5 -top-5"
                  />
                </div>
              </div>
              <div className="flex flex-row items-center justify-center w-full mb-2 mt-2 gap-2">
                <span className="text-white text-xs font-semibold">
                  보유 수량
                </span>
                <button className="ml-2 px-3 py-1 rounded-lg bg-purple-700 text-white text-xs font-bold">
                  {ownedQuantities[0].private}
                </button>
              </div>
              <div className="flex flex-row items-center justify-center w-full mb-2 mt-2 gap-4">
                <span className="text-white text-sm font-semibold">
                  구매 대기 수량
                </span>
                <div className="flex flex-row items-center gap-2 bg-purple-900/60 rounded-xl px-2 py-1 shadow-md">
                  <button
                    onClick={() =>
                      handlePendingQuantityChange(
                        0,
                        'private',
                        pendingQuantities[0].private - 1
                      )
                    }
                    disabled={pendingQuantities[0].private <= 0}
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-400 text-white text-xs font-bold hover:bg-purple-300 hover:shadow-lg transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={pendingQuantities[0].private}
                    onChange={(e) =>
                      handlePendingQuantityChange(
                        0,
                        'private',
                        Number(e.target.value)
                      )
                    }
                    className="w-8 text-center text-base font-bold rounded bg-transparent text-white outline-none border-none"
                    style={{ textAlign: 'center' }}
                  />
                  <button
                    onClick={() =>
                      handlePendingQuantityChange(
                        0,
                        'private',
                        pendingQuantities[0].private + 1
                      )
                    }
                    disabled={pendingQuantities[0].private >= 10}
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-400 text-white text-xs font-bold hover:bg-purple-300 hover:shadow-lg transition"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center w-full mt-1 gap-2">
                <span className="text-white text-sm font-semibold">
                  Price MDW
                </span>
                <img
                  src="/public/Monadraw.png"
                  alt="MDW"
                  className="w-6 h-6 object-contain ml-1"
                />
                <span className="text-white text-base font-bold ml-1">
                  0.0102
                </span>
                <button
                  onClick={() => handleBuyClick(0, 'private')}
                  disabled={pendingQuantities[0].private <= 0}
                  className="px-6 py-1.5 rounded-2xl bg-purple-500 text-white text-sm font-extrabold shadow-lg hover:bg-purple-300 hover:text-purple-900 hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  BUY
                </button>
              </div>
            </div>
          </div>
          {/* Public Ticket 대시보드 */}
          <div className="text-white w-[500px] h-[280px] flex items-center justify-center rounded-2xl shadow-[0_0_16px_4px_#5eead4] bg-gradient-to-b from-[#2dd4bf] via-[#232136] to-[#27272a]">
            <div className="flex flex-col items-center justify-center w-full h-full">
              <span className="text-xl font-extrabold text-white mb-2">
                Public Ticket
              </span>
              <div className="relative">
                <img
                  src="/public/Tikcket2.png"
                  alt="Ticket2"
                  className="w-28 h-28 object-contain mb-2"
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
              <div className="flex flex-row items-center justify-center w-full mb-2 mt-2 gap-2">
                <span className="text-white text-xs font-semibold">
                  보유 수량
                </span>
                <button className="ml-2 px-3 py-1 rounded-lg bg-teal-700 text-white text-xs font-bold">
                  {ownedQuantities[0].public}
                </button>
              </div>
              <div className="flex flex-row items-center justify-center w-full mb-2 mt-2 gap-4">
                <span className="text-white text-sm font-semibold">
                  구매 대기 수량
                </span>
                <div className="flex flex-row items-center gap-2 bg-teal-900/60 rounded-xl px-2 py-1 shadow-md">
                  <button
                    onClick={() =>
                      handlePendingQuantityChange(
                        0,
                        'public',
                        pendingQuantities[0].public - 1
                      )
                    }
                    disabled={pendingQuantities[0].public <= 0}
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-teal-400 text-white text-xs font-bold hover:bg-teal-200 hover:shadow-lg transition"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={0}
                    max={10}
                    value={pendingQuantities[0].public}
                    onChange={(e) =>
                      handlePendingQuantityChange(
                        0,
                        'public',
                        Number(e.target.value)
                      )
                    }
                    className="w-8 text-center text-base font-bold rounded bg-transparent text-white outline-none border-none"
                    style={{ textAlign: 'center' }}
                  />
                  <button
                    onClick={() =>
                      handlePendingQuantityChange(
                        0,
                        'public',
                        pendingQuantities[0].public + 1
                      )
                    }
                    disabled={pendingQuantities[0].public >= 10}
                    className="w-5 h-5 flex items-center justify-center rounded-full bg-teal-400 text-white text-xs font-bold hover:bg-teal-200 hover:shadow-lg transition"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center w-full mt-1 gap-2">
                <span className="text-white text-sm font-semibold">
                  Price MDW
                </span>
                <img
                  src="/public/Monadraw.png"
                  alt="MDW"
                  className="w-6 h-6 object-contain ml-1"
                />
                <span className="text-white text-base font-bold ml-1">
                  0.0231
                </span>
                <button
                  onClick={() => handleBuyClick(0, 'public')}
                  disabled={pendingQuantities[0].public <= 0}
                  className="px-6 py-1.5 rounded-2xl bg-teal-400 text-white text-sm font-extrabold shadow-lg hover:bg-teal-200 hover:text-teal-900 hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  BUY
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* p-2~p-6 + 대시보드 2개 세트 5개 반복 */}
      {[
        {
          logo: '/public/Eth.png',
          name: 'ETHp',
          prize: 98342032,
          timerStart: 800,
        },
        {
          logo: '/public/Xrp.png',
          name: 'XRPp',
          prize: 57973630,
          timerStart: 1200,
        },
        {
          logo: '/public/Pepe.png',
          name: 'PEPEp',
          prize: 587643260,
          timerStart: 300,
        },
        {
          logo: '/public/Sui.webp',
          name: 'SUIp',
          prize: 87398203,
          timerStart: 900,
        },
        {
          logo: '/public/Kaito.png',
          name: 'KAITOp',
          prize: 15463022,
          timerStart: 1500,
        },
      ].map((p, idx) => (
        <div key={p.name} className="flex flex-col items-center w-full mt-12">
          <Mains
            logo={p.logo}
            name={p.name}
            prize={p.prize}
            timerStart={p.timerStart}
            toggleOff={true}
          />
          {/* d-1, d-2 대시보드: p-1 세트와 완전히 동일하게 복사 */}
          <div className="flex flex-row gap-[36px] justify-center mt-6 w-full">
            {/* d-1: Private Ticket */}
            <div className="text-white w-[500px] h-[280px] flex items-center justify-center rounded-2xl shadow-[0_0_16px_4px_#a78bfa] bg-gradient-to-b from-[#876DFE] via-[#232136] to-[#27272a]">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <span className="text-xl font-extrabold text-white mb-2">
                  Private Ticket
                </span>
                <div className="relative">
                  <img
                    src="/public/Ticket1.png"
                    alt="Ticket1"
                    className="w-28 h-28 object-contain mb-2"
                  />
                  {/* 티켓 이미지 우측 하단에 로고 세트 배치 */}
                  <div className="absolute -bottom-1 -right-1">
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="w-9 h-9 rounded-full object-cover relative -left-5 -top-5"
                    />
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center w-full mb-2 mt-2 gap-2">
                  <span className="text-white text-xs font-semibold">
                    보유 수량
                  </span>
                  <button className="ml-2 px-3 py-1 rounded-lg bg-purple-700 text-white text-xs font-bold">
                    {ownedQuantities[idx + 1].private}
                  </button>
                </div>
                <div className="flex flex-row items-center justify-center w-full mb-2 mt-2 gap-4">
                  <span className="text-white text-sm font-semibold">
                    구매 대기 수량
                  </span>
                  <div className="flex flex-row items-center gap-2 bg-purple-900/60 rounded-xl px-2 py-1 shadow-md">
                    <button
                      onClick={() =>
                        handlePendingQuantityChange(
                          idx + 1,
                          'private',
                          pendingQuantities[idx + 1].private - 1
                        )
                      }
                      disabled={pendingQuantities[idx + 1].private <= 0}
                      className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-400 text-white text-xs font-bold hover:bg-purple-300 hover:shadow-lg transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={pendingQuantities[idx + 1].private}
                      onChange={(e) =>
                        handlePendingQuantityChange(
                          idx + 1,
                          'private',
                          Number(e.target.value)
                        )
                      }
                      className="w-8 text-center text-base font-bold rounded bg-transparent text-white outline-none border-none"
                      style={{ textAlign: 'center' }}
                    />
                    <button
                      onClick={() =>
                        handlePendingQuantityChange(
                          idx + 1,
                          'private',
                          pendingQuantities[idx + 1].private + 1
                        )
                      }
                      disabled={pendingQuantities[idx + 1].private >= 10}
                      className="w-5 h-5 flex items-center justify-center rounded-full bg-purple-400 text-white text-xs font-bold hover:bg-purple-300 hover:shadow-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center w-full mt-1 gap-2">
                  <span className="text-white text-sm font-semibold">
                    Price MDW
                  </span>
                  <img
                    src="/public/Monadraw.png"
                    alt="MDW"
                    className="w-6 h-6 object-contain ml-1"
                  />
                  <span className="text-white text-base font-bold ml-1">
                    {idx === 0
                      ? '0.0168'
                      : idx === 1
                      ? '0.0129'
                      : idx === 2
                      ? '0.0089'
                      : idx === 3
                      ? '0.0201'
                      : '0.0193'}
                  </span>
                  <button
                    onClick={() => handleBuyClick(idx + 1, 'private')}
                    disabled={pendingQuantities[idx + 1].private <= 0}
                    className="px-6 py-1.5 rounded-2xl bg-purple-500 text-white text-sm font-extrabold shadow-lg hover:bg-purple-300 hover:text-purple-900 hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    BUY
                  </button>
                </div>
              </div>
            </div>
            {/* d-2: Public Ticket */}
            <div className="text-white w-[500px] h-[280px] flex items-center justify-center rounded-2xl shadow-[0_0_16px_4px_#5eead4] bg-gradient-to-b from-[#2dd4bf] via-[#232136] to-[#27272a]">
              <div className="flex flex-col items-center justify-center w-full h-full">
                <span className="text-xl font-extrabold text-white mb-2">
                  Public Ticket
                </span>
                <div className="relative">
                  <img
                    src="/public/Tikcket2.png"
                    alt="Ticket2"
                    className="w-28 h-28 object-contain mb-2"
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
                <div className="flex flex-row items-center justify-center w-full mb-2 mt-2 gap-2">
                  <span className="text-white text-xs font-semibold">
                    보유 수량
                  </span>
                  <button className="ml-2 px-3 py-1 rounded-lg bg-teal-700 text-white text-xs font-bold">
                    {ownedQuantities[idx + 1].public}
                  </button>
                </div>
                <div className="flex flex-row items-center justify-center w-full mb-2 mt-2 gap-4">
                  <span className="text-white text-sm font-semibold">
                    구매 대기 수량
                  </span>
                  <div className="flex flex-row items-center gap-2 bg-teal-900/60 rounded-xl px-2 py-1 shadow-md">
                    <button
                      onClick={() =>
                        handlePendingQuantityChange(
                          idx + 1,
                          'public',
                          pendingQuantities[idx + 1].public - 1
                        )
                      }
                      disabled={pendingQuantities[idx + 1].public <= 0}
                      className="w-5 h-5 flex items-center justify-center rounded-full bg-teal-400 text-white text-xs font-bold hover:bg-teal-200 hover:shadow-lg transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={10}
                      value={pendingQuantities[idx + 1].public}
                      onChange={(e) =>
                        handlePendingQuantityChange(
                          idx + 1,
                          'public',
                          Number(e.target.value)
                        )
                      }
                      className="w-8 text-center text-base font-bold rounded bg-transparent text-white outline-none border-none"
                      style={{ textAlign: 'center' }}
                    />
                    <button
                      onClick={() =>
                        handlePendingQuantityChange(
                          idx + 1,
                          'public',
                          pendingQuantities[idx + 1].public + 1
                        )
                      }
                      disabled={pendingQuantities[idx + 1].public >= 10}
                      className="w-5 h-5 flex items-center justify-center rounded-full bg-teal-400 text-white text-xs font-bold hover:bg-teal-200 hover:shadow-lg transition"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center w-full mt-1 gap-2">
                  <span className="text-white text-sm font-semibold">
                    Price MDW
                  </span>
                  <img
                    src="/public/Monadraw.png"
                    alt="MDW"
                    className="w-6 h-6 object-contain ml-1"
                  />
                  <span className="text-white text-base font-bold ml-1">
                    0.0231
                  </span>
                  <button
                    onClick={() => handleBuyClick(idx + 1, 'public')}
                    disabled={pendingQuantities[idx + 1].public <= 0}
                    className="px-6 py-1.5 rounded-2xl bg-teal-400 text-white text-sm font-extrabold shadow-lg hover:bg-teal-200 hover:text-teal-900 hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    BUY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 구매 확인 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-white text-lg font-bold mb-4">구매 확인</h3>
            <p className="text-white mb-4">
              {popupInfo.type === 'private' ? 'Private' : 'Public'} Ticket을{' '}
              {popupInfo.quantity}개 구매하시겠습니까?
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleConfirmBuy}
                className="flex-1 bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition"
              >
                확인
              </button>
              <button
                onClick={handleClosePopup}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 본문 비움 - p카드와 대시보드 모두 제거 */}
    </div>
  );
}

function App() {
  return (
    <TicketProvider>
      <div className="page bg-black w-3/4 mx-auto">
        {/* 헤더부분 */}
        <header
          className="w-full  h-16 p-1 flex items-center justify-between gap-2 px-2 
            bg-gradient-to-t  from-[#876DFE] to-black"
        >
          {/* {/* 좌측 } */}
          <div className="flex items-center w-full h-full gap-8 flex-1">
            {/* 헤더-로고 */}
            <div className="flex items-center gap-9 pl-3">
              <a className="w-11 h-11 flex items-center justify-center rounded-full bg-black">
                <img
                  src="/public/Monadraw.png"
                  alt="Monadraw"
                  className="w-8 h-8 object-contain"
                />
              </a>
            </div>

            <div className="flex items-center flex-1 h-[54px] rounded-4xl px-4 py-2 ">
              <span className="text-white text-lg">MonaDraw</span>
            </div>
            {/* 카테고리 */}
            <div className="text-white flex gap-3 ml-5 w-full text-sm">
              <div className="flex items-center gap-8">
                <Link to="/chart" className="hover:underline">
                  Chart
                </Link>
                <Link to="/prize-pool" className="hover:underline">
                  Prize Pool
                </Link>
                <Link to="/ticket" className="hover:underline">
                  Ticket
                </Link>
                <Link to="/winning" className="hover:underline">
                  Winning
                </Link>
              </div>
            </div>
          </div>
          {/* 우측 : 메뉴 + 버튼 */}
          <div className="flex flex-1 w-full h-16 items-center ">
            {/* 우측 로그인 */}
            <div className="text-white w-full h-full text-sm flex py-2 gap-4 justify-end items-center">
              {/* 로그인버튼 */}
              <button className="w-[150px] h-full border-1 ml-2  rounded-4xl">
                <span className="text-white text-sm font- bold">
                  connect wallet
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* 본문 라우팅 */}
        <Routes>
          <Route path="/prize-pool" element={<PrizePoolPage />} />
          <Route path="/chart" element={<EmptyPage label="Chart" />} />
          <Route path="/ticket" element={<TicketPage />} />
          <Route path="/winning" element={<EmptyPage label="Winning" />} />
          <Route path="*" element={<PrizePoolPage />} />
        </Routes>
      </div>
    </TicketProvider>
  );
}

export default App;
