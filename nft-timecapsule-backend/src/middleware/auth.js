const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Authorizationヘッダーからトークンを取得
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: '認証が必要です' });
    }
    
    // トークンの検証
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: '認証に失敗しました' });
  }
};