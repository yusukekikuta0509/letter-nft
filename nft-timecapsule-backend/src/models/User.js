const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// パスワードのハッシュ化
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// パスワード検証メソッド
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;

// src/models/Letter.js
const mongoose = require('mongoose');

const letterSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  recipientEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lockStartTime: {
    type: Date,
    default: Date.now
  },
  lockDuration: {
    type: Number,
    required: true // 秒単位
  },
  lockStatus: {
    type: String,
    enum: ['locked', 'unlocked', 'cancelled'],
    default: 'locked'
  },
  unlockDate: {
    type: Date,
    required: true
  }
});

const Letter = mongoose.model('Letter', letterSchema);

module.exports = Letter;

// src/models/NFT.js
const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
  letterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Letter',
    required: true
  },
  tokenId: {
    type: String,
    required: true
  },
  contractAddress: {
    type: String,
    required: true
  },
  issuedAt: {
    type: Date,
    default: Date.now
  },
  metadata: {
    type: Object,
    default: {}
  }
});

const NFT = mongoose.model('NFT', nftSchema);

module.exports = NFT;

// src/models/EmailLog.js
const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  letterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Letter',
    required: true
  },
  recipientEmail: {
    type: String,
    required: true
  },
  emailSentAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'pending'
  },
  errorMessage: String
});

const EmailLog = mongoose.model('EmailLog', emailLogSchema);

module.exports = EmailLog;