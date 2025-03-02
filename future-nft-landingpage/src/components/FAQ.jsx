import React, { useState } from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: 'NFTとは何ですか？',
      answer: 'NFT（Non-Fungible Token）は、ブロックチェーン上に記録される固有の識別子を持つデジタルデータです。一度発行されると改ざんが不可能で、所有権が明確になります。未来レターでは、あなたの大切なメッセージをNFTとして記録し、永続的に保存します。'
    },
    {
      question: '暗号資産の知識がなくても利用できますか？',
      answer: 'はい、暗号資産の知識がなくても簡単に利用できます。未来レターは、専門知識がない方でも直感的に操作できるよう設計されています。メールアドレスでの登録からNFTの発行まで、シンプルなステップで完了します。'
    },
    {
      question: '独自コイン（FLC）はどのように成長するのですか？',
      answer: 'FLCは自動再投資モデルにより、時間経過とともに成長します。プラットフォームのユーザー数が増えるほど、ネットワーク効果によりボーナス係数が上昇し、全体の成長率も高まります。長期保有するほど、複利効果により資産価値が大きく成長する仕組みです。'
    },
    {
      question: '手紙のロックを解除するタイミングは変更できますか？',
      answer: '設定したロック期間より前でも解除は可能です。ただし、早期解除の場合は自動再投資の恩恵が減少するなどのペナルティがあります。設定した日付に自動的に解除することも、それ以降にいつでも解除することも可能です。'
    },
    {
      question: '手紙の内容は他の人に見られますか？',
      answer: 'いいえ、手紙の内容は暗号化されており、指定された受取人（自分自身や家族）だけが閲覧できます。NFTとして発行される際も、内容自体はプライベートに保たれます。'
    },
    {
      question: '提携サービスの特典とは具体的に何ですか？',
      answer: '一定以上のFLCを保有するユーザーは、提携レストランでの優待割引、家族向け旅行プランの特別料金、フォトスタジオでの撮影割引など、実生活で利用できる特典を受けられます。提携サービスは今後も順次拡大予定です。'
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">よくある質問</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            未来レターについてよくいただく質問と回答
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4 border rounded-lg overflow-hidden shadow-sm">
              <button
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center transition-colors duration-300"
                onClick={() => toggleFaq(index)}
              >
                <span className="font-bold text-lg text-gray-900">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-indigo-600 transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 py-4' : 'max-h-0 py-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">他にもご質問がありましたら、お気軽にお問い合わせください。</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 shadow-md">
            お問い合わせ
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
