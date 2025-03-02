import React from 'react';


const Tokenomics = () => {
  return (
    <section id="tokenomics" className="py-20 bg-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">トークノミクス</h2>
          <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
            未来レターコイン（FLC）の仕組みと自動再投資モデル
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <div className="bg-indigo-800/50 rounded-xl p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-4">独自コイン (FLC) の特徴</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 mr-3 mt-1"></div>
                  <div>
                    <h4 className="font-bold mb-1">自動再投資モデル</h4>
                    <p className="text-indigo-200">独自コインは複利効果により自動的に成長。保有期間が長いほど、成長率も高まります。</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 mr-3 mt-1"></div>
                  <div>
                    <h4 className="font-bold mb-1">ネットワーク効果</h4>
                    <p className="text-indigo-200">ユーザー数の増加に応じてボーナス係数が上昇し、プラットフォーム全体の成長率が向上します。</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 mr-3 mt-1"></div>
                  <div>
                    <h4 className="font-bold mb-1">複利モデル</h4>
                    <p className="text-indigo-200">初期付与コイン×年間基本収益率^ロック期間（年）により、長期保有者ほど大きな恩恵を受けられます。</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-500 mr-3 mt-1"></div>
                  <div>
                    <h4 className="font-bold mb-1">実用性</h4>
                    <p className="text-indigo-200">FLCは提携サービスでの割引や特典、将来的には二次流通市場での売買も可能になる予定です。</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <img src={tokenomicsChart} alt="トークン配分" className="w-full max-w-md mx-auto" />
            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="bg-indigo-800/50 p-4 rounded-lg text-center">
                <h4 className="font-bold text-2xl mb-1">40%</h4>
                <p className="text-indigo-200">ユーザー報酬</p>
              </div>
              <div className="bg-indigo-800/50 p-4 rounded-lg text-center">
                <h4 className="font-bold text-2xl mb-1">20%</h4>
                <p className="text-indigo-200">プラットフォーム開発</p>
              </div>
              <div className="bg-indigo-800/50 p-4 rounded-lg text-center">
                <h4 className="font-bold text-2xl mb-1">15%</h4>
                <p className="text-indigo-200">マーケティング</p>
              </div>
              <div className="bg-indigo-800/50 p-4 rounded-lg text-center">
                <h4 className="font-bold text-2xl mb-1">25%</h4>
                <p className="text-indigo-200">リザーブ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;