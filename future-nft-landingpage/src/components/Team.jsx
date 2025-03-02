import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: '山田 太郎',
      role: 'CEO & 創設者',
      description: 'ブロックチェーン技術者として10年の経験を持ち、複数のWeb3プロジェクトに携わる。家族との時間を大切にする父親でもあり、本プロジェクトを考案。',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: '佐藤 花子',
      role: 'CTO',
      description: 'スマートコントラクト開発のスペシャリスト。イーサリアムを始め、複数のブロックチェーンプラットフォームでの開発経験を持つ。',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: '鈴木 一郎',
      role: 'UI/UXデザイナー',
      description: '使いやすさと美しさを両立したデザインを追求。家族向けアプリの設計に強みを持ち、誰でも使いやすいインターフェースを設計。',
      linkedin: '#',
      twitter: '#'
    },
    {
      name: '高橋 美咲',
      role: 'マーケティング責任者',
      description: '家族向けサービスのマーケティングに精通。ユーザー視点を大切にし、エモーショナルな価値訴求を得意とする。',
      linkedin: '#',
      twitter: '#'
    }
  ];

  return (
    <section id="team" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">チームメンバー</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            未来レターを作り上げる情熱的なメンバー
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:transform hover:scale-105">
              <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.description}</p>
                <div className="flex space-x-3">
                  <a href={member.linkedin} className="text-gray-600 hover:text-indigo-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                  <a href={member.twitter} className="text-gray-600 hover:text-indigo-600 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.16a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">未来レターチームは、ブロックチェーン技術を活用した新しい家族向けサービスの創造に情熱を持つプロフェッショナル集団です。</p>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-full transition duration-300">
            チームに参加する
          </button>
        </div>
      </div>
    </section>
  );
};

export default Team;