import Timer from './Timer';

interface Coinprops {
  id: number;
  label: string;
  image?: string;
  prize?: number;
  timerStart?: number;
  timerClassName?: string;
}

function BorE({
  id,
  label,
  image,
  prize,
  timerStart,
  timerClassName,
}: Coinprops) {
  return (
    <div>
      <div className="flex flex-col items-center  gap-2 mt-2 w-full h-full">
        <button className="bg-neutral-800/50  border-purple w-[350px] flex justify-between items-center h-[45px] px-2  pl-4 rounded-[16px] ">
          <div
            className={`flex justify-center items-center pl-0 ${
              label === 'VIRTUAL' ? 'gap-0' : 'gap-2'
            }`}
          >
            <div className="flex justify-center items-center gap-2 pl-2 ">
              {image ? (
                <img
                  src={image}
                  alt={label}
                  className="w-9 h-9 rounded-full object-cover"
                />
              ) : (
                <a className="w-9 h-9 flex items-start justify-start rounded-full bg-black"></a>
              )}
              <span className="text-white text-base flex font-bold">
                {label}
              </span>
            </div>
          </div>
          <div className="flex m-5 gap-2 items-center justify-center">
            {prize !== undefined ? (
              <span
                className="text-yellow-300 text-sm font-extrabold drop-shadow-lg animate-bounce"
                style={{
                  animationDuration: '1.2s',
                  display: 'inline-block',
                  transform: 'scale(1.15)',
                }}
              >
                ${prize.toLocaleString()}
              </span>
            ) : (
              <>
                <span className="text-[10px] text-neutral-300">Deadline</span>
                <Timer start={timerStart} className={timerClassName} />
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}

export default BorE;
