import axios from 'axios';
import Web3 from 'web3';
import TimeCapsuleContract from '../contracts/TimeCapsulesNFT.json';

// APIクライアントの設定
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// JWT認証トークンの設定
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Web3インスタンスとコントラクトインスタンスの初期化
let web3;
let timeCapsuleContract;

// Web3の初期化
export const initWeb3 = async () => {
  if (window.ethereum) {
    try {
      // MetaMaskが存在する場合
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);
      
      // コントラクトのネットワークIDの取得
      const networkId = await web3.eth.net.getId();
      const contractAddress = TimeCapsuleContract.networks[networkId].address;
      
      // コントラクトインスタンスの作成
      timeCapsuleContract = new web3.eth.Contract(
        TimeCapsuleContract.abi,
        contractAddress
      );
      
      return { web3, timeCapsuleContract };
    } catch (error) {
      console.error('Web3初期化エラー:', error);
      throw new Error('ウォレット接続エラー: ' + error.message);
    }
  } else {
    // MetaMaskが存在しない場合、読み取り専用のProviderを使用
    const provider = new Web3.providers.HttpProvider(
      process.env.REACT_APP_WEB3_PROVIDER || 'https://polygon-mumbai.infura.io/v3/YOUR_INFURA_KEY'
    );
    web3 = new Web3(provider);
    
    throw new Error('MetaMaskなどのWeb3対応ウォレットをインストールしてください');
  }
};

// API通信関数
export const api = {
  // ユーザー認証
  auth: {
    signup: (data) => apiClient.post('/auth/signup', data),
    login: (data) => apiClient.post('/auth/login', data),
    logout: () => {
      localStorage.removeItem('auth_token');
      return Promise.resolve();
    },
    getProfile: () => apiClient.get('/auth/profile'),
  },
  
  // 手紙関連
  letters: {
    create: async (letterData) => {
      try {
        // バックエンドAPIでレターを作成し、メタデータを取得
        const response = await apiClient.post('/letters', letterData);
        const { id, title, content, lockDuration, recipientEmail, metadataUri } = response.data;
        
        // Web3が初期化されていない場合は初期化
        if (!web3 || !timeCapsuleContract) {
          await initWeb3();
        }
        
        // 現在のアカウント取得
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        
        // コンテンツのハッシュ生成（実際のアプリではセキュリティを考慮してください）
        const contentHash = web3.utils.sha3(content);
        
        // ブロックチェーンでNFTをミント
        const lockDurationSeconds = lockDuration * 24 * 60 * 60; // 日数から秒に変換
        const transaction = await timeCapsuleContract.methods
          .mintTimeCapsule(userAddress, metadataUri, contentHash, lockDurationSeconds)
          .send({ from: userAddress });
        
        // トランザクション情報とトークンIDを取得
        const tokenId = transaction.events.CapsuleMinted.returnValues.tokenId;
        const txHash = transaction.transactionHash;
        
        // NFT情報をバックエンドに保存
        await apiClient.post(`/letters/${id}/nft`, {
          tokenId,
          contractAddress: timeCapsuleContract._address,
          transactionHash: txHash
        });
        
        return { ...response.data, tokenId, txHash };
      } catch (error) {
        console.error('手紙作成エラー:', error);
        throw error;
      }
    },
    
    getAll: () => apiClient.get('/letters'),
    
    getById: (id) => apiClient.get(`/letters/${id}`),
    
    unlock: async (id) => {
      try {
        // バックエンドAPIでアンロック処理を開始
        const response = await apiClient.post(`/letters/${id}/unlock`);
        const { tokenId } = response.data;
        
        // Web3が初期化されていない場合は初期化
        if (!web3 || !timeCapsuleContract) {
          await initWeb3();
        }
        
        // 現在のアカウント取得
        const accounts = await web3.eth.getAccounts();
        const userAddress = accounts[0];
        
        // ブロックチェーンでNFTのアンロック
        const transaction = await timeCapsuleContract.methods
          .unlockCapsule(tokenId)
          .send({ from: userAddress });
        
        // トランザクション情報を取得
        const txHash = transaction.transactionHash;
        
        // アンロック情報をバックエンドに保存
        await apiClient.post(`/letters/${id}/unlock/confirm`, {
          transactionHash: txHash
        });
        
        return { ...response.data, txHash };
      } catch (error) {
        console.error('手紙解除エラー:', error);
        throw error;
      }
    }
  },
  
  // NFT関連
  nft: {
    getCertificate: (id) => apiClient.get(`/nft/${id}/certificate`, {
      responseType: 'blob' // PDFファイルをバイナリで取得
    }),
    
    getMetadata: async (tokenId) => {
      // Web3が初期化されていない場合は初期化
      if (!web3 || !timeCapsuleContract) {
        await initWeb3();
      }
      
      // コントラクトからトークンURIを取得
      const tokenURI = await timeCapsuleContract.methods.tokenURI(tokenId).call();
      
      // tokenURIがIPFSリンクの場合はHTTPゲートウェイを使用
      const formattedUri = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/');
      
      // メタデータの取得
      const response = await axios.get(formattedUri);
      return response.data;
    },
    
    getLockStatus: async (tokenId) => {
      // Web3が初期化されていない場合は初期化
      if (!web3 || !timeCapsuleContract) {
        await initWeb3();
      }
      
      // ロック状態の確認
      const isLocked = await timeCapsuleContract.methods.isLocked(tokenId).call();
      
      // 残りロック時間の取得
      const remainingTime = await timeCapsuleContract.methods.getRemainingLockTime(tokenId).call();
      
      // カプセルの詳細情報取得
      const capsuleInfo = await timeCapsuleContract.methods.getCapsuleInfo(tokenId).call();
      
      return {
        isLocked,
        remainingTime: parseInt(remainingTime),
        lockTimestamp: parseInt(capsuleInfo.lockTimestamp) * 1000, // JSのタイムスタンプに変換
        recipient: capsuleInfo.recipient,
        letterHash: capsuleInfo.letterHash
      };
    }
  }
};

export default api;