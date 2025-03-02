import React from 'react';


const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: '手紙を作成',
      description: '文章、写真、動画を組み合わせて、未来の自分や家族への手紙を作成します。'
    },
    {
      number: '02',
      title: 'ロック期間を設定',
      description: '手紙を開封する未来の日付を選択します。1年後、5年後、10年後など、あなたの希望に合わせて設定できます。'
    },
    {
      number: '03',
      title: 'NFTとして発行',
      description: '作成した手紙はNFTとして発行され、ブロックチェーン上に安全に記録されます。独自コインも同時に発行されます。'
    },
    {
      number: '04',
      title: '資産が自動成長',
      description: '時間の経過とともに、独自コインは自動再投資され、資産価値が成長していきます。'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">利用の流れ</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            デジタルに詳しくない方でも簡単に利用できる、シンプルな4ステップ
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img src={workflowImage} alt="利用の流れ" className="w-full max-w-lg mx-auto" />
          </div>
          
          <div className="lg:w-1/2">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-12">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-md">
                詳しい使い方を見る
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;