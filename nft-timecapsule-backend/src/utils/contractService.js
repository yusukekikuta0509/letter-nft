const { ethers } = require('ethers');
const NFTContract = require('../contracts/NFTTimeCapsule.json'); // ABIファイル

class ContractService {
  constructor() {
    // 環境変数から設定を読み込む
    this.contractAddress = process.env.NFT_CONTRACT_ADDRESS;
    this.providerUrl = process.env.PROVIDER_URL; // InfuraやAlchemy等のURL
    this.privateKey = process.env.WALLET_PRIVATE_KEY;
    
    // プロバイダーと署名者の設定
    this.provider = new ethers.providers.JsonRpcProvider(this.providerUrl);
    this.wallet = new ethers.Wallet(this.privateKey, this.provider);
    this.contract = new ethers.Contract(this.contractAddress, NFTContract.abi, this.wallet);
  }

  // NFTをミントする関数
  async mintNFT(recipientAddress, letterHash, metadataURI) {
    try {
      const tx = await this.contract.mintNFT(recipientAddress, letterHash, metadataURI);
      const receipt = await tx.wait();
      
      // イベントからtokenIdを取得
      const event = receipt.events.find(event => event.event === 'NFTMinted');
      const tokenId = event.args.tokenId.toString();
      
      return {
        success: true,
        tokenId,
        transactionHash: receipt.transactionHash
      };
    } catch (error) {
      console.error('NFT mint error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // NFTのロック解除関数
  async unlockNFT(tokenId) {
    try {
      const tx = await this.contract.unlockNFT(tokenId);
      const receipt = await tx.wait();
      
      return {
        success: true,
        transactionHash: receipt.transactionHash
      };
    } catch (error) {
      console.error('NFT unlock error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // NFTのメタデータを取得する関数
  async getNFTMetadata(tokenId) {
    try {
      const metadataURI = await this.contract.tokenURI(tokenId);
      return {
        success: true,
        metadataURI
      };
    } catch (error) {
      console.error('Get metadata error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

module.exports = new ContractService();