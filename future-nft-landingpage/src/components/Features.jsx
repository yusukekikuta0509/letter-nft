import React from 'react';
import { Envelope, ArrowGraph, Key, Gift } from '../assets/icons';

const Features = () => {
  const features = [
    {
      icon: <Envelope />,
      title: '未来へのタイムカプセル',
      description: '大切な記念日のメッセージや子供の成長記録を、未来の自分や家族に届けることができます。一度NFT化されると内容は改ざん不可能で、永続的な記録として残ります。'
    },
    {
      icon: <ArrowGraph />,
      title: '自動再投資による資産成長',
      description: 'NFTの発行と同時に独自コインが付与され、自動再投資システムにより複利で成長。プラットフォームの拡大とともに、あなたの資産も成長します。'
    },
    {
      icon: <Key />,
      title: '柔軟なロック解除オプション',
      description: '設定した期日が来ると解除されるだけでなく、必要に応じていつでも解除可能。ただし早期解除の場合は、成長ボーナスなどに影響します。'
    },
    {
      icon: <Gift />,
      title: '家族向け追加報酬',
      description: '一定以上の資産を保有すると、家族限定コミュニティへの招待や、提携サービス（レストラン、旅行など）で使える特典が得られます。'
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">未来レターの特徴</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            思い出を残すだけではなく、未来につながる価値を創造する新しいNFTプラットフォーム
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:transform hover:scale-105">
              <div className="text-indigo-600 mb-4 w-16 h-16 flex items-center justify-center bg-indigo-100 rounded-full mx-auto">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;