import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './LetterDetail.css';

const LetterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [letter, setLetter] = useState(null);
  const [nftInfo, setNftInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unlockConfirm, setUnlockConfirm] = useState(false);
  const [unlockLoading, setUnlockLoading] = useState(false);

  useEffect(() => {
    const fetchLetterDetails = async () => {
      try {
        const response = await api.get(`/letters/${id}`);
        setLetter(response.data);
        
        // NFT情報を取得（存在する場合）
        if (response.data.nft_id) {
          const nftResponse = await api.get(`/nft/${response.data.nft_id}`);
          setNftInfo(nftResponse.data);
        }
        
        setLoading(false);
      } catch (err) {
        setError('タイムカプセルの取得に失敗しました。');
        setLoading(false);
      }
    };

    fetchLetterDetails();
  }, [id]);

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

  // ロック解除予定日を計算
  const calculateUnlockDate = (startTime, duration) => {
    const startDate = new Date(startTime);
    const endDate = new Date(startDate.getTime() + duration * 1000);
    return formatDate(endDate);
  };

  // ロック解除処理
  const handleUnlock = async () => {
    if (unlockConfirm) {
      setUnlockLoading(true);
      try {
        await api.post(`/letters/${id}/unlock`);
        // 最新のデータを再取得
        const response = await api.get(`/letters/${id}`);
        setLetter(response.data);
        setUnlockConfirm(false);
      } catch (err) {
        setError('ロック解除に失敗しました。');
      } finally {
        setUnlockLoading(false);
      }
    } else {
      setUnlockConfirm(true);
    }
  };

  // 証明書ダウンロード
  const handleDownloadCertificate = async () => {
    try {
      const response = await api.get(`/nft/${nftInfo.id}/certificate`, {
        responseType: 'blob'
      });
      
      // Blobを作成してダウンロード
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `certificate-${nftInfo.token_id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError('証明書のダウンロードに失敗しました。');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="letter-detail-container">
      <div className="letter-detail-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          ← ダッシュボードに戻る
        </button>
        <h1>{letter.title}</h1>
      </div>

      <div className="letter-status-card">
        <h3>タイムカプセルの状態</h3>
        <div className="status-info">
          <div className="status-item">
            <span className="status-label">作成日:</span>
            <span className="status-value">{formatDate(letter.created_at)}</span>
          </div>
          <div className="status-item">
            <span className="status-label">状態:</span>
            <span className={`status-value status-${letter.lock_status}`}>
              {letter.lock_status === 'locked' ? 'ロック中' : 
               letter.lock_status === 'unlocked' ? '解除済み' : 'キャンセル'}
            </span>
          </div>
          {letter.lock_status === 'locked' && (
            <div className="status-item">
              <span className="status-label">解除予定日:</span>
              <span className="status-value">
                {calculateUnlockDate(letter.lock_start_time, letter.lock_duration)}
              </span>
            </div>
          )}
          <div className="status-item">
            <span className="status-label">受取人メールアドレス:</span>
            <span className="status-value">{letter.recipient_email}</span>
          </div>
        </div>
      </div>

      {nftInfo && (
        <div className="nft-info-card">
          <h3>NFT情報</h3>
          <div className="nft-info">
            <div className="nft-item">
              <span className="nft-label">トークンID:</span>
              <span className="nft-value">{nftInfo.token_id}</span>
            </div>
            <div className="nft-item">
              <span className="nft-label">コントラクトアドレス:</span>
              <span className="nft-value">{nftInfo.contract_address}</span>
            </div>
            <div className="nft-item">
              <span className="nft-label">発行日:</span>
              <span className="nft-value">{formatDate(nftInfo.issued_at)}</span>
            </div>
            <div className="nft-actions">
              <button 
                className="certificate-button"
                onClick={handleDownloadCertificate}
              >
                NFT証明書をダウンロード
              </button>
            </div>
          </div>
        </div>
      )}

      {letter.lock_status === 'unlocked' ? (
        <div className="letter-content-card">
          <h3>タイムカプセルの内容</h3>
          <div 
            className="letter-content"
            dangerouslySetInnerHTML={{ __html: letter.content }}
          />
        </div>
      ) : letter.lock_status === 'locked' ? (
        <div className="letter-locked-card">
          <h3>タイムカプセルはロックされています</h3>
          <p>
            このタイムカプセルは現在ロックされています。
            解除予定日になると自動的に解除され、指定のメールアドレスに通知されます。
          </p>
          <div className="unlock-section">
            <p>今すぐ解除しますか？（この操作は取り消せません）</p>
            {unlockConfirm ? (
              <div className="confirm-buttons">
                <button 
                  className="cancel-unlock-button"
                  onClick={() => setUnlockConfirm(false)}
                  disabled={unlockLoading}
                >
                  キャンセル
                </button>
                <button 
                  className="confirm-unlock-button"
                  onClick={handleUnlock}
                  disabled={unlockLoading}
                  >
                    {unlockLoading ? 'ロック解除中...' : '解除を確定する'}
                  </button>
                </div>
              ) : (
                <button 
                  className="unlock-button"
                  onClick={handleUnlock}
                >
                  今すぐ解除する
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="letter-cancelled-card">
            <h3>このタイムカプセルはキャンセルされました</h3>
            <p>このタイムカプセルは管理者またはシステムによってキャンセルされました。</p>
          </div>
        )}
      </div>
    );
  };
  
  export default LetterDetail;