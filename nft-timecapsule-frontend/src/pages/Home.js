import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>あなたの大切な思いをNFTとして残しませんか？</h1>
        <p>
          NFTタイムカプセルは、あなたのメッセージを未来へ送り届けるサービスです。
          作成した手紙はNFTとして保存され、指定した期間後に解除されます。
        </p>
        {isAuthenticated ? (
          <Link to="/create-letter" className="cta-button">タイムカプセルを作る</Link>
        ) : (
          <Link to="/register" className="cta-button">今すぐ始める</Link>
        )}
      </div>

      <div className="features-section">
        <h2>NFTタイムカプセルの特徴</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>安全な保管</h3>
            <p>ブロックチェーン技術でデータを安全に保管。改ざんや消失の心配がありません。</p>
          </div>
          <div className="feature-card">
            <h3>自由な解除期間</h3>
            <p>解除期間を自由に設定でき、期間終了時には自動的にメールでお知らせします。</p>
          </div>
          <div className="feature-card">
            <h3>NFT証明書</h3>
            <p>タイムカプセルはNFTとして発行され、証明書が発行されます。</p>
          </div>
          <div className="feature-card">
            <h3>マーケットプレイス対応</h3>
            <p>発行されたNFTはOpenSeaなどのマーケットプレイスで取引可能です。</p>
          </div>
        </div>
      </div>

      <div className="how-it-works">
        <h2>使い方</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>手紙を書く</h3>
            <p>大切な人や未来の自分に向けて、メッセージを書きましょう。</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>解除期間を設定</h3>
            <p>いつメッセージを開封できるようにするか期間を設定します。</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>NFTの発行</h3>
            <p>メッセージはNFTとして発行され、証明書が発行されます。</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>解除とメール送信</h3>
            <p>期間終了時、指定したメールアドレスにメッセージが送信されます。</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
