const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// ルーターのインポート
const authRoutes = require('./routes/auth');
const letterRoutes = require('./routes/letters');
const nftRoutes = require('./routes/nft');

const app = express();

// ミドルウェアの設定
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// ルーターの設定
app.use('/api/auth', authRoutes);
app.use('/api/letters', letterRoutes);
app.use('/api/nft', nftRoutes);

// データベース接続
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// サーバー起動
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});