import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const [letters, setLetters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLetters = async () => {
      try {
        const response = await api.get('/letters');
        setLetters(response.data);
        setLoading(false);
      } catch (err) {
        setError('手紙の取得に失敗しました。');
        setLoading(false);
      }
    };

    fetchLetters();
  }, []);

  // ロック状態のラベル
  const getLockStatusLabel = (status) => {
    switch(status) {
      case 'locked':
        return <span className="status-locked">ロック中</span>;
      case 'unlocked':
        return <span className="status-unlocked">解除済み</span>;
      case 'cancelled':
        return <span className="status-cancelled">キャンセル</span>;
      default:
        return <span className="status-unknown">不明</span>;
    }
  };

  // 日時フォーマット
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // ロック解除までの残り時間
  const getRemainingTime = (lockStartTime, lockDuration) => {
    const startDate = new Date(lockStartTime);
    const endDate = new Date(startDate.getTime() + lockDuration * 1000);
    const now = new Date();
    
    if (now >= endDate) return '解除期間到来';
    
    const diff = endDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `残り ${days}日 ${hours}時間`;
  };

  if (loading) return <div className="loading">Loading...</div>;
  
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>マイタイムカプセル</h1>
        <Link to="/create-letter" className="create-button">
          新規作成
        </Link>
      </div>

      {letters.length === 0 ? (
        <div className="no-letters">
          <p>タイムカプセルがまだありません。</p>
          <p>新しいタイムカプセルを作成しましょう！</p>
          <Link to="/create-letter" className="create-link">
            タイムカプセルを作る
          </Link>
        </div>
      ) : (
        <div className="letters-grid">
          {letters.map((letter) => (
            <div key={letter.id} className="letter-card">
              <h3 className="letter-title">{letter.title}</h3>
              <div className="letter-info">
                <p>作成日: {formatDate(letter.created_at)}</p>
                <p>状態: {getLockStatusLabel(letter.lock_status)}</p>
                {letter.lock_status === 'locked' && (
                  <p className="remaining-time">
                    {getRemainingTime(letter.lock_start_time, letter.lock_duration)}
                  </p>
                )}
              </div>
              <Link to={`/letters/${letter.id}`} className="view-letter-button">
                詳細を見る
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;