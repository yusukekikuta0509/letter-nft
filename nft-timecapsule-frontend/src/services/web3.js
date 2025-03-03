import { ethers } from 'ethers';
import NFTContract from '../contracts/NFTTimeCapsule.json';

// コントラクトのABIとアドレス
const contractABI = NFTContract.abi;
const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

// Web3プロバイダー取得
export const getProvider = () => {
  // MetaMaskが利用可能な場合
  if (window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  
  // フォールバック: Infuraなどの公開ノード
  return new ethers.providers.JsonRpcProvider(process.env.REACT_APP_RPC_URL);
};

// コントラクトインスタンス取得
export const getContract = (withSigner = false) => {
  const provider = getProvider();
  
  if (withSigner) {
    const signer = provider.getSigner();
    return new ethers.Contract(contractAddress, contractABI, signer);
  }
  
  return new ethers.Contract(contractAddress, contractABI, provider);
};
export const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('MetaMaskがインストールされていません');
      }
      
      // アカウント接続をリクエスト
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error('ウォレット接続エラー:', error);
      throw error;
    }
  };
  
  // NFTのmint関数
  export const mintNFT = async (recipient, letterHash, metadata) => {
    try {
      const contract = getContract(true);
      
      // メタデータをIPFSにアップロード（フロントエンドでの実装例）
      // 実際には別サービスを使用することが多い
      const metadataUri = JSON.stringify(metadata); // 実際にはIPFSのURIを使用
      
      // コントラクトの関数を呼び出し
      const tx = await contract.mintNFT(recipient, letterHash, metadataUri);
      const receipt = await tx.wait();
      
      // イベントからtokenIdを取得
      const event = receipt.events.find(e => e.event === 'TokenMinted');
      const tokenId = event.args.tokenId.toString();
      
      return {
        tokenId,
        transactionHash: receipt.transactionHash,
        contractAddress
      };
    } catch (error) {
      console.error('NFT mint エラー:', error);
      throw error;
    }
  };
  
  // NFTステータス確認
  export const getNFTStatus = async (tokenId) => {
    try {
      const contract = getContract();
      const owner = await contract.ownerOf(tokenId);
      const tokenURI = await contract.tokenURI(tokenId);
      
      return {
        owner,
        tokenURI,
        exists: true
      };
    } catch (error) {
      console.error('NFTステータス取得エラー:', error);
      return { exists: false };
    }
  };