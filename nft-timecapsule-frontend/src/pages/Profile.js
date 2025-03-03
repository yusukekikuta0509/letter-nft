import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    // バリデーション
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setError('すべてのフィールドを入力してください。');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('新しいパスワードが一致しません。');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setError('新しいパスワードは8文字以上必要です。');
      return;
    }
    
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      await api.post('/auth/change-password', {
        current_password: passwordData.currentPassword,
        new_password: passwordData.newPassword
      });
      
      setSuccess('パスワードが正常に変更されました。');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setIsChangingPassword(false);
    } catch (err) {
      setError(err.response?.data?.message || 'パスワード変更に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <h1>プロフィール</h1>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {currentUser.email.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{currentUser.email}</h2>
            <p>アカウント作成日: {new Date(currentUser.created_at).toLocaleDateString('ja-JP')}</p>
          </div>
        </div>
        
        {success && <div className="success-message">{success}</div>}
        {error && <div className="error-message">{error}</div>}
        
        {isChangingPassword ? (
          <div className="password-change-form">
            <h3>パスワード変更</h3>
            <form onSubmit={handlePasswordSubmit}>
              <div className="form-group">
                <label htmlFor="currentPassword">現在のパスワード</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="newPassword">新しいパスワード</label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  required
                />
                <small>8文字以上のパスワードを設定してください</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">新しいパスワード（確認）</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setIsChangingPassword(false)}
                >
                  キャンセル
                </button>
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={loading}
                >
                  {loading ? '変更中...' : '変更を保存'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="profile-actions">
            <button 
              className="change-password-button"
              onClick={() => setIsChangingPassword(true)}
            >
              パスワード変更
            </button>
            <button 
              className="logout-button"
              onClick={handleLogout}
            >
              ログアウト
            </button>
          </div>
        )}
      </div>
      
      <div className="dashboard-link">
        <button onClick={() => navigate('/dashboard')}>
          ダッシュボードに戻る
        </button>
      </div>
    </div>
  );
};

export default Profile;