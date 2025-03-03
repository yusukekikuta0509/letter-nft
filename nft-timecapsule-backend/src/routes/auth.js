const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// ユーザー登録
router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // メールアドレスの重複チェック
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'このメールアドレスは既に登録されています' });
    }
    
    // 新規ユーザー作成
    const newUser = new User({ email, password });
    await newUser.save();
    
    // JWTトークン生成
    const token = jwt.sign(
      { userId: newUser._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.status(201).json({ 
      token,
      user: {
        id: newUser._id,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: '登録処理中にエラーが発生しました' });
  }
});

// ログイン
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // ユーザーの検索
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが正しくありません' });
    }
    
    // パスワードの検証
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'メールアドレスまたはパスワードが正しくありません' });
    }
    
    // JWTトークン生成
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({ 
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'ログイン処理中にエラーが発生しました' });
  }
});

module.exports = router;

// src/routes/letters.js
const express = require('express');
const router = express.Router();
const Letter = require('../models/Letter');
const auth = require('../middleware/auth');

// 認証ミドルウェアを使用して保護されたルート

// 手紙の作成
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, recipientEmail, lockDuration } = req.body;
    
    // ロック終了日時を計算
    const unlockDate = new Date();
    unlockDate.setSeconds(unlockDate.getSeconds() + lockDuration);
    
    const newLetter = new Letter({
      userId: req.user.userId,
      title,
      content,
      recipientEmail,
      lockDuration,
      unlockDate,
      lockStatus: 'locked'
    });
    
    await newLetter.save();
    
    // TODO: NFT作成処理を追加
    
    res.status(201).json(newLetter);
  } catch (error) {
    console.error('Letter creation error:', error);
    res.status(500).json({ message: '手紙の作成中にエラーが発生しました' });
  }
});

// ユーザーの手紙一覧を取得
router.get('/', auth, async (req, res) => {
  try {
    const letters = await Letter.find({ userId: req.user.userId })
      .select('-content') // 内容は一覧表示には含めない
      .sort({ createdAt: -1 });
    
    res.json(letters);
  } catch (error) {
    console.error('Get letters error:', error);
    res.status(500).json({ message: '手紙の取得中にエラーが発生しました' });
  }
});

// 特定の手紙詳細を取得
router.get('/:id', auth, async (req, res) => {
  try {
    const letter = await Letter.findOne({ 
      _id: req.params.id,
      userId: req.user.userId
    });
    
    if (!letter) {
      return res.status(404).json({ message: '手紙が見つかりません' });
    }
    
    res.json(letter);
  } catch (error) {
    console.error('Get letter error:', error);
    res.status(500).json({ message: '手紙の取得中にエラーが発生しました' });
  }
});

// 手紙のロック解除 (手動)
router.post('/:id/unlock', auth, async (req, res) => {
  try {
    const letter = await Letter.findOne({ 
      _id: req.params.id,
      userId: req.user.userId,
      lockStatus: 'locked'
    });
    
    if (!letter) {
      return res.status(404).json({ message: '手紙が見つかりません' });
    }
    
    letter.lockStatus = 'unlocked';
    await letter.save();
    
    // TODO: メール送信処理
    // TODO: NFT状態更新
    
    res.json({ message: '手紙のロックが解除されました', letter });
  } catch (error) {
    console.error('Unlock letter error:', error);
    res.status(500).json({ message: 'ロック解除処理中にエラーが発生しました' });
  }
});

module.exports = router;

// src/routes/nft.js
const express = require('express');
const router = express.Router();
const NFT = require('../models/NFT');
const Letter = require('../models/Letter');
const auth = require('../middleware/auth');

// NFT情報の取得
router.get('/:letterId', auth, async (req, res) => {
  try {
    // まず手紙がユーザーのものか確認
    const letter = await Letter.findOne({
      _id: req.params.letterId,
      userId: req.user.userId
    });
    
    if (!letter) {
      return res.status(404).json({ message: '手紙が見つかりません' });
    }
    
    // NFT情報を取得
    const nft = await NFT.findOne({ letterId: req.params.letterId });
    
    if (!nft) {
      return res.status(404).json({ message: 'NFTが見つかりません' });
    }
    
    res.json(nft);
  } catch (error) {
    console.error('Get NFT error:', error);
    res.status(500).json({ message: 'NFT情報の取得中にエラーが発生しました' });
  }
});

// 証明書の生成/取得
router.get('/:letterId/certificate', auth, async (req, res) => {
  try {
    // まず手紙がユーザーのものか確認
    const letter = await Letter.findOne({
      _id: req.params.letterId,
      userId: req.user.userId
    });
    
    if (!letter) {
      return res.status(404).json({ message: '手紙が見つかりません' });
    }
    
    // NFT情報を取得
    const nft = await NFT.findOne({ letterId: req.params.letterId });
    
    if (!nft) {
      return res.status(404).json({ message: 'NFTが見つかりません' });
    }
    
    // TODO: 実際の証明書生成処理
    // この部分は実際にはPDF生成ライブラリなどを使用
    
    // サンプルレスポンス
    res.json({
      certificateUrl: `/certificates/${nft._id}.pdf`,
      nftInfo: nft
    });
  } catch (error) {
    console.error('Get certificate error:', error);
    res.status(500).json({ message: '証明書の生成中にエラーが発生しました' });
  }
});

module.exports = router;