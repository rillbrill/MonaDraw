import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full h-16 p-1 flex items-center justify-between gap-2 px-2 bg-gradient-to-t from-[#876DFE] to-black">
      {/* 좌측 */}
      <div className="flex items-center w-full h-full gap-8 flex-1">
        {/* 헤더-로고 */}
        <div className="flex items-center gap-9 pl-3">
          <Link to="/" className="w-11 h-11 flex items-center justify-center rounded-full bg-black">
            <img
              src="/public/Monadraw.png"
              alt="Monadraw"
              className="w-8 h-8 object-contain"
            />
          </Link>
        </div>

        <div className="flex items-center flex-1 h-[54px] rounded-4xl px-4 py-2">
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
            <Link to="/draw" className="hover:underline">
              Draw
            </Link>
          </div>
        </div>
      </div>
      
      {/* 우측 : 메뉴 + 버튼 */}
      <div className="flex flex-1 w-full h-16 items-center">
        {/* 우측 로그인 */}
        <div className="text-white w-full h-full text-sm flex py-2 gap-4 justify-end items-center">
          {/* 로그인버튼 */}
          <button className="w-[150px] h-full border-1 ml-2 rounded-4xl hover:bg-white/10 transition-colors">
            <span className="text-white text-sm font-bold">
              connect wallet
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 