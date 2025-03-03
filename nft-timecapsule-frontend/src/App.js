import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';

// ページ
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import CreateLetterPage from './pages/CreateLetterPage';
import LetterDetailPage from './pages/LetterDetailPage';
import NftCertificatePage from './pages/NftCertificatePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* 認証必須ルート */}
          <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/create-letter" 
            element={
              <PrivateRoute>
                <CreateLetterPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/letters/:id" 
            element={
              <PrivateRoute>
                <LetterDetailPage />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/certificates/:id" 
            element={
              <PrivateRoute>
                <NftCertificatePage />
              </PrivateRoute>
            } 
          />
          
          {/* 未定義のルートはホームページへリダイレクト */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;