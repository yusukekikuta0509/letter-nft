const nodemailer = require('nodemailer');
const EmailLog = require('../models/EmailLog');

// トランスポーター設定
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// ロック解除メール送信関数
const sendUnlockEmail = async (userId, letter, nft) => {
  try {
    const { _id, title, content, recipientEmail } = letter;
    
    // メール送信
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: recipientEmail,
      subject: `【NFTタイムカプセル】「${title}」が解除されました`,
      html: `
        <h1>NFTタイムカプセルからのお知らせ</h1>
        <p>あなた宛のメッセージが解除されました。</p>
        <h2>${title}</h2>
        <div>${content}</div>
        <p>-----</p>
        <p>このメッセージはNFTとして保存されています。</p>
        <p>NFT Token ID: ${nft.tokenId}</p>
        <p>Contract Address: ${nft.contractAddress}</p>
        <p><a href="${process.env.FRONTEND_URL}/certificates/${nft._id}">証明書を表示</a></p>
      `
    };
    
    const info = await transporter.sendMail(mailOptions);
    
    // 送信ログの記録
    await new EmailLog({
      userId,
      letterId: _id,
      recipientEmail,
      status: 'success'
    }).save();
    
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Send email error:', error);
    
    // エラーログの記録
    await new EmailLog({
      userId,
      letterId: letter._id,
      recipientEmail: letter.recipientEmail,
      status: 'failed',
      errorMessage: error.message
    }).save();
    
    return { success: false, error: error.message };
  }
};

module.exports = { sendUnlockEmail };
