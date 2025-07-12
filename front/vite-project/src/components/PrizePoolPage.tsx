import React from 'react';
import Main from './ui/Main';
import Mains from './ui/Mains';
import CategoryBar from './ui/CategoryBar';
import { useTicketContext } from '../contexts/TicketContext';

const PrizePoolPage = () => {
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
    <div className="flex col-auto flex-col w-full h-full rounded-lg mt-5 gap-7">
      {/* 프라이즈 풀 */}
      <div className="text-white text-[16px] h-[52px] items-start flex justify-between">
        <span className="text-3xl font-extrabold m-5 ml-35 text-white">
          Prize Pool
        </span>
      </div>
      
      {/* 대시보드 */}
      <div className="flex flex-col w-full h-full">
        <div className="flex flex-col gap-6">
          {/* 스크롤 박스 */}
          <div className="flex flex-row gap-6 justify-center">
            {[
              { id: 1, label: 'Earliest Deadline' },
              { id: 2, label: 'Highest Prize' },
              { id: 3, label: 'Most Entries' },
            ].map((item: { id: number; label: string }) => {
              return <Main key={item.id} props={item} />;
            })}
          </div>
          
          {/* 카테고리 바 */}
          <CategoryBar />
        </div>

        {/* 상금풀 구분선 */}
        <div
          className="w-[1350px] h-[3px] mx-auto rounded-full my-[18px]"
          style={{
            background:
              'linear-gradient(90deg, rgba(45,212,191,0.5) 0%, rgba(94,234,212,0.5) 100%)',
          }}
        ></div>
        
        {/* 프라이즈 풀 목록 */}
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
};

export default PrizePoolPage; 