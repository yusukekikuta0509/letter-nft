import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">NFT タイムカプセル</span>
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">ホーム</Link>
          </li>
          
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link to="/dashboard" className="nav-links">ダッシュボード</Link>
              </li>
              <li className="nav-item">
                <Link to="/create-letter" className="nav-links">新規作成</Link>
              </li>
              <li className="nav-item">
                <Link to="/profile" className="nav-links">プロフィール</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="logout-btn">ログアウト</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-links">ログイン</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-links">登録</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;