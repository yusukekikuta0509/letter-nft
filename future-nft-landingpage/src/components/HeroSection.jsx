import React from 'react';
i

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-800 pt-24 pb-32 overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              未来の自分に届ける<br />タイムカプセルNFT
            </h1>
            <p className="text-xl text-indigo-100 mb-8 max-w-lg mx-auto md:mx-0">
              大切な記念日や想いを未来へ届け、あなたの記録をNFTとして保管。
              さらに資産としても成長する、次世代デジタルタイムカプセル。
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button className="bg-white text-indigo-700 hover:bg-indigo-100 font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg">
                ホワイトペーパー
              </button>
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-lg border border-indigo-400">
                今すぐ始める
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <img src={heroImage} alt="未来レターのイメージ" className="w-full max-w-lg mx-auto animate-float" />
          </div>
        </div>
        
        <div className="mt-16 flex justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-1">1000+</h3>
              <p className="text-indigo-200">作成された手紙</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-1">500+</h3>
              <p className="text-indigo-200">家族の参加</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-1">3年</h3>
              <p className="text-indigo-200">平均保管期間</p>
            </div>
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-1">120%</h3>
              <p className="text-indigo-200">資産平均成長率</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;