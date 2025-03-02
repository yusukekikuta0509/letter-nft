import React from 'react';

const Roadmap = () => {
  const roadmapItems = [
    {
      quarter: 'Q2 2025',
      title: 'プラットフォーム開発',
      items: [
        'コンセプト確定・設計',
        'スマートコントラクト開発',
        'UIデザイン完成',
        'テスト版リリース'
      ]
    },
    {
      quarter: 'Q3 2025',
      title: '本格運用開始',
      items: [
        'メインネットリリース',
        '独自コイン発行',
        '提携サービス第一弾',
        'ユーザーフィードバック収集'
      ]
    },
    {
      quarter: 'Q4 2025',
      title: '機能拡張',
      items: [
        '家族限定コミュニティ開設',
        'モバイルアプリリリース',
        '追加提携サービス',
        'UIアップデート'
      ]
    },
    {
      quarter: 'Q1 2026',
      title: 'エコシステム拡大',
      items: [
        'NFT二次流通市場連携',
        'グローバル展開開始',
        '提携サービス拡大',
        '新規リワード機能追加'
      ]
    }
  ];

  return (
    <section id="roadmap" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ロードマップ</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            未来レターの開発と成長のための計画
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-indigo-200 transform -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0">
            {roadmapItems.map((item, index) => (
              <div key={index} className={`md:flex ${index % 2 === 0 ? '' : 'md:flex-row-reverse'} items-center`}>
                <div className="md:w-1/2 text-center flex md:flex-row justify-center items-center p-4">
                  <div className={`p-6 rounded-xl shadow-md bg-white max-w-md transform transition-transform duration-500 hover:scale-105 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div className="bg-indigo-600 text-white py-2 px-4 rounded-full inline-block mb-4">
                      {item.quarter}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <ul className="text-left text-gray-600 space-y-2">
                      {item.items.map((listItem, listIndex) => (
                        <li key={listIndex} className="flex items-start">
                          <svg className="w-5 h-5 text-indigo-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          {listItem}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-indigo-600 z-10">
                  <div className="w-4 h-4 rounded-full bg-white absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                <div className="md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
