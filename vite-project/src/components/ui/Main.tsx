import Timer from './Timer';
import BorE from './BorE';

interface Board {
  props: {
    id: number;
    label: string;
  };
}

function Main({ props }: Board) {
  return (
    <div className="text-white border-1 border-neutral-700 items-center flex w-[430px] h-[210px] pt-3  p-10  flex-col rounded-lg bg-gradient-to-b  from-[#876DFE]/50 via-black to-black ">
      {' '}
      <span className=" flex text-lg font-extrabold "> {props.label}</span>
      {(() => {
        // 각 Main 컴포넌트별로 다른 BorE 데이터
        const borEData = {
          1: [
            // Earliest Deadline
            {
              id: 1,
              label: 'Kaito',
              image: '/public/Kaito.png',
              timerStart: 17,
            },
            {
              id: 2,
              label: 'Sui',
              image: '/public/Sui.webp',
              timerStart: 156,
            },
            {
              id: 3,
              label: 'VIRTUAL',
              image: '/public/Virtual.svg',
              timerStart: 1017,
            },
          ],
          2: [
            // Highest Prizee
            {
              id: 1,
              label: 'PEPE',
              image: '/public/Pepe.png',
              prize: 587643260,
            },
            {
              id: 2,
              label: 'BTC',
              image: '/public/Btc.webp',
              prize: 329356032,
            },
            { id: 3, label: 'ETH', image: '/public/Eth.png', prize: 98342032 },
          ],
          3: [
            // Most Entries
            { id: 1, label: 'BTC', image: '/public/Btc.webp' },
            { id: 2, label: 'ETH', image: '/public/Eth.png' },
            { id: 3, label: 'XRP', image: '/public/Xrp.png' },
          ],
        };

        return (
          borEData[props.id as keyof typeof borEData]?.map(
            (item: {
              id: number;
              label: string;
              image?: string;
              prize?: number;
              timerStart?: number;
            }) => {
              return (
                <BorE
                  key={item.id}
                  {...item}
                  timerClassName="text-sm font-mono text-teal-400"
                />
              );
            }
          ) || []
        );
      })()}
    </div>
  );
}

export default Main;
