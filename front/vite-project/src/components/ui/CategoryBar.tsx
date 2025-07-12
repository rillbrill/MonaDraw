import React from 'react';

const coinLogos = [
  { src: '/public/Eth.png', alt: 'ETH' },
  { src: '/public/Btc.webp', alt: 'BTC' },
  { src: '/public/Sui.webp', alt: 'SUI' },
  { src: '/public/Xrp.png', alt: 'XRP' },
  { src: '/public/Pepe.png', alt: 'PEPE' },
  { src: '/public/Kaito.png', alt: 'KAITO' },
];

const categories = [
  { label: 'Prime', style: '' },
  { label: 'Favorites', style: '' },
  { label: 'New', style: '' },
  { label: 'All Categories', style: '' },
  { label: 'Clear Filters', style: 'underline' },
];

export default function CategoryBar() {
  return (
    <div className="w-full flex flex-col gap-3 items-center my-2">
      {/* 코인 로고 바 */}
      <div className="flex flex-row gap-6 px-6 py-2 rounded-2xl w-[1350px] bg-gradient-to-r from-[#232136] via-[#876DFE]/10 to-[#232136] shadow-inner justify-start">
        {coinLogos.map((coin, idx) => (
          <div
            key={coin.alt}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-neutral-800/80 hover:bg-neutral-700 transition cursor-pointer border border-neutral-700"
          >
            <img
              src={coin.src}
              alt={coin.alt}
              className="w-8 h-8 object-cover rounded-full"
            />
          </div>
        ))}
      </div>
      {/* 카테고리 버튼 바 + 서치바 */}
      <div className="flex flex-row gap-3 mt-2 w-[1350px] justify-between items-center">
        <div className="flex flex-row gap-3">
          {categories.map((cat, idx) => (
            <button
              key={cat.label}
              className={`px-4 py-1 rounded-2xl font-semibold text-sm border border-white text-white bg-gradient-to-r from-[#232136] via-[#876DFE]/10 to-[#232136] ${cat.style} hover:bg-purple-700 transition`}
            >
              {cat.label}
            </button>
          ))}
        </div>
        {/* 서치바 */}
        <div className="flex items-center bg-gradient-to-r from-[#876DFE]/30 via-[#232136] to-[#876DFE]/30 rounded-md px-3 py-1 border border-purple-400 shadow-inner">
          <span className="text-purple-300 text-xl mr-2">🔍</span>
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none border-none text-white placeholder-purple-300 text-base w-40"
          />
        </div>
      </div>
    </div>
  );
}
