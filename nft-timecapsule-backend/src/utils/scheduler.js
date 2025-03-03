const cron = require('node-cron');
const Letter = require('../models/Letter');
const NFT = require('../models/NFT');
const { sendUnlockEmail } = require('./emailService');

// ロック期限切れのチェックと処理を行う関数
const checkExpiredLocks = async () => {
  try {
    const now = new Date();
    
    // ロック期限が切れた手紙を検索
    const expiredLetters = await Letter.find({
      lockStatus: 'locked',
      unlockDate: { $lte: now }
    });
    
    console.log(`${expiredLetters.length}件の期限切れの手紙を検出しました`);
    
    // 各手紙を処理
    for (const letter of expiredLetters) {
      try {
        // ステータス更新
        letter.lockStatus = 'unlocked';
        await letter.save();
        
        // 関連するNFTを取得
        const nft = await NFT.findOne({ letterId: letter._id });
        
        if (nft) {
          // メール送信
          await sendUnlockEmail(letter.userId, letter, nft);
          console.log(`手紙ID: ${letter._id} のロックを解除し、メールを送信しました`);
        } else {
          console.error(`手紙ID: ${letter._id} に関連するNFTが見つかりません`);
        }
      } catch (letterError) {
        console.error(`手紙ID: ${letter._id} の処理中にエラーが発生しました:`, letterError);
      }
    }
  } catch (error) {
    console.error('期限切れチェック処理中にエラーが発生しました:', error);
  }
};

// スケジューラーの初期化
const initScheduler = () => {
  // 毎時0分に実行
  cron.schedule('0 * * * *', () => {
    console.log('期限切れチェックを実行します...');
    checkExpiredLocks();
  });
  
  console.log('スケジューラーを初期化しました');
};

module.exports = { initScheduler, checkExpiredLocks };