import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../services/api';
import './CreateLetter.css';

const CreateLetter = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    recipientEmail: '',
    lockDuration: '365', // デフォルト1年
    customDuration: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCustomDuration, setShowCustomDuration] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // カスタム期間の表示設定
    if (name === 'lockDuration' && value === 'custom') {
      setShowCustomDuration(true);
    } else if (name === 'lockDuration') {
      setShowCustomDuration(false);
    }
  };

  const handleContentChange = (content) => {
    setFormData({ ...formData, content });
  };

  // バリデーション
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'タイトルを入力してください';
    }
    
    if (!formData.content.trim()) {
      newErrors.content = '手紙の内容を入力してください';
    }
    
    if (!formData.recipientEmail.trim()) {
      newErrors.recipientEmail = 'メールアドレスを入力してください';
    } else if (!/\S+@\S+\.\S+/.test(formData.recipientEmail)) {
      newErrors.recipientEmail = '有効なメールアドレスを入力してください';
    }
    
    if (showCustomDuration) {
      if (!formData.customDuration.trim()) {
        newErrors.customDuration = 'カスタム期間を入力してください';
      } else if (isNaN(formData.customDuration) || parseInt(formData.customDuration) <= 0) {
        newErrors.customDuration = '正の整数を入力してください';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // 実際のロック期間を決定
      const duration = showCustomDuration 
        ? parseInt(formData.customDuration) 
        : parseInt(formData.lockDuration);
      
      // APIリクエスト
      const response = await api.post('/letters', {
        title: formData.title,
        content: formData.content,
        recipient_email: formData.recipientEmail,
        lock_duration: duration * 24 * 60 * 60 // 日数を秒数に変換
      });
      
      navigate(`/letters/${response.data.id}`);
    } catch (err) {
      setErrors({ 
        submit: err.response?.data?.message || 'タイムカプセルの作成に失敗しました。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-letter-container">
      <h1>新しいタイムカプセルを作成</h1>
      
      <form onSubmit={handleSubmit} className="letter-form">
        <div className="form-group">
          <label htmlFor="title">タイトル</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="タイムカプセルのタイトル"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="content">内容</label>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            placeholder="未来に残したいメッセージを書いてください..."
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="recipientEmail">受取人のメールアドレス</label>
          <input
            type="email"
            id="recipientEmail"
            name="recipientEmail"
            value={formData.recipientEmail}
            onChange={handleChange}
            placeholder="example@example.com"
          />
          <small>ロック解除時にこのアドレスにメールが送信されます</small>
          {errors.recipientEmail && <span className="error-message">{errors.recipientEmail}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="lockDuration">ロック期間</label>
          <select
            id="lockDuration"
            name="lockDuration"
            value={formData.lockDuration}
            onChange={handleChange}
          >
            <option value="30">1ヶ月</option>
            <option value="90">3ヶ月</option>
            <option value="180">6ヶ月</option>
            <option value="365">1年</option>
            <option value="730">2年</option>
            <option value="1825">5年</option>
            <option value="3650">10年</option>
            <option value="custom">カスタム期間</option>
          </select>
        </div>
        
        {showCustomDuration && (
          <div className="form-group">
            <label htmlFor="customDuration">カスタム期間（日数）</label>
            <input
              type="number"
              id="customDuration"
              name="customDuration"
              value={formData.customDuration}
              onChange={handleChange}
              placeholder="例: 100"
              min="1"
            />
            {errors.customDuration && <span className="error-message">{errors.customDuration}</span>}
          </div>
        )}
        
        {errors.submit && <div className="error-message submission-error">{errors.submit}</div>}
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => navigate('/dashboard')}>
            キャンセル
          </button>
          <button type="submit" className="submit-button" disabled={isSubmitting}>
            {isSubmitting ? '作成中...' : 'タイムカプセルを作成'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateLetter;