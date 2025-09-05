import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock word list for mnemonic generation (simplified version)
const WORD_LIST = [
  'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
  'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
  'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actress', 'actual',
  'adapt', 'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance',
  'advice', 'aerobic', 'affair', 'afford', 'afraid', 'again', 'agent', 'agree',
  'ahead', 'aim', 'air', 'airport', 'aisle', 'alarm', 'album', 'alcohol',
  'alert', 'alien', 'all', 'alley', 'allow', 'almost', 'alone', 'alpha',
  'already', 'also', 'alter', 'always', 'amateur', 'amazing', 'among', 'amount',
  'amused', 'analyst', 'anchor', 'ancient', 'anger', 'angle', 'angry', 'animal',
  'ankle', 'announce', 'annual', 'another', 'answer', 'antenna', 'antique', 'anxiety',
  'any', 'apart', 'apology', 'appear', 'apple', 'approve', 'april', 'arcade',
  'arch', 'arctic', 'area', 'arena', 'argue', 'arm', 'armed', 'armor',
  'army', 'around', 'arrange', 'arrest', 'arrive', 'arrow', 'art', 'article',
  'artist', 'artwork', 'ask', 'aspect', 'assault', 'asset', 'assist', 'assume',
  'asthma', 'athlete', 'atom', 'attack', 'attend', 'attitude', 'attract', 'auction',
  'audit', 'august', 'aunt', 'author', 'auto', 'autumn', 'average', 'avocado',
  'avoid', 'awake', 'aware', 'away', 'awesome', 'awful', 'awkward', 'axis',
  'baby', 'bachelor', 'bacon', 'badge', 'bag', 'balance', 'balcony', 'ball',
  'bamboo', 'banana', 'banner', 'bar', 'barely', 'bargain', 'barrel', 'base',
  'basic', 'basket', 'battle', 'beach', 'bean', 'beauty', 'because', 'become',
  'beef', 'before', 'begin', 'behave', 'behind', 'believe', 'below', 'belt',
  'bench', 'benefit', 'best', 'betray', 'better', 'between', 'beyond', 'bicycle',
  'bid', 'bike', 'bind', 'biology', 'bird', 'birth', 'bitter', 'black',
  'blade', 'blame', 'blanket', 'blast', 'bleak', 'bless', 'blind', 'blood',
  'blossom', 'blow', 'blue', 'blur', 'blush', 'board', 'boat', 'body',
  'boil', 'bomb', 'bone', 'bonus', 'book', 'boost', 'border', 'boring',
  'borrow', 'boss', 'bottom', 'bounce', 'box', 'boy', 'bracket', 'brain',
  'brand', 'brass', 'brave', 'bread', 'breeze', 'brick', 'bridge', 'brief',
  'bright', 'bring', 'brisk', 'broccoli', 'broken', 'bronze', 'broom', 'brother',
  'brown', 'brush', 'bubble', 'buddy', 'budget', 'buffalo', 'build', 'bulb',
  'bulk', 'bullet', 'bundle', 'bunker', 'burden', 'burger', 'burst', 'bus',
  'business', 'busy', 'butter', 'buyer', 'buzz', 'cabbage', 'cabin', 'cable'
];

class WalletService {
  constructor() {
    this.address = null;
    this.network = 'devnet'; // Default to devnet for development
    this.isInitialized = false;
  }

  // Initialize service (placeholder for future blockchain client)
  initializeClient(network = 'devnet') {
    this.network = network;
    this.isInitialized = true;
    console.log(`Wallet service initialized for ${network}`);
    return { success: true };
  }

  // Generate a simple mnemonic phrase
  generateMnemonic() {
    const words = [];
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * WORD_LIST.length);
      words.push(WORD_LIST[randomIndex]);
    }
    return words.join(' ');
  }

  // Generate a mock AQY address
  generateAddress() {
    const chars = '0123456789abcdef';
    let address = '0x';
    for (let i = 0; i < 64; i++) {
      address += chars[Math.floor(Math.random() * chars.length)];
    }
    return address;
  }

  // Generate new wallet with mnemonic
  async generateWallet() {
    try {
      // Generate 12-word mnemonic
      const mnemonic = this.generateMnemonic();

      // Generate mock address
      const address = this.generateAddress();

      // Store wallet data
      await this.storeWallet(mnemonic);

      this.address = address;

      return {
        address,
        mnemonic,
        success: true
      };
    } catch (error) {
      console.error('Error generating wallet:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Import wallet from mnemonic
  async importWallet(mnemonic) {
    try {
      // Basic mnemonic validation (check if it's 12 words)
      const words = mnemonic.trim().split(' ');
      if (words.length !== 12) {
        throw new Error('Mnemonic must be 12 words');
      }

      // Generate address from mnemonic (in production, this would derive from the mnemonic)
      const address = this.generateAddress();

      // Store wallet data
      await this.storeWallet(mnemonic);

      this.address = address;

      return {
        address,
        success: true
      };
    } catch (error) {
      console.error('Error importing wallet:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Store wallet securely
  async storeWallet(mnemonic) {
    try {
      // Store using SecureStore for sensitive data
      await SecureStore.setItemAsync('wallet_mnemonic', mnemonic);
      await SecureStore.setItemAsync('wallet_has_wallet', 'true');

      return true;
    } catch (error) {
      console.error('Error storing wallet:', error);
      throw error;
    }
  }

  // Load existing wallet
  async loadWallet() {
    try {
      const hasWallet = await SecureStore.getItemAsync('wallet_has_wallet');
      if (!hasWallet) {
        return { hasWallet: false };
      }

      const mnemonic = await SecureStore.getItemAsync('wallet_mnemonic');
      if (!mnemonic) {
        return { hasWallet: false };
      }

      // Generate address from stored mnemonic (in production, derive properly)
      const address = this.generateAddress();

      this.address = address;

      return {
        hasWallet: true,
        address,
        success: true
      };
    } catch (error) {
      console.error('Error loading wallet:', error);
      return {
        hasWallet: false,
        error: error.message
      };
    }
  }

  // Get token balances (mock implementation)
  async getBalances() {
    if (!this.address) {
      throw new Error('Wallet not initialized');
    }

    try {
      // Mock balances for demonstration
      // In production, this would query the actual blockchain
      const balances = {
        AQY: {
          balance: '1250000000', // 1.25 AQY (in smallest units)
          decimals: 9,
          symbol: 'AQY'
        },
        USDC: {
          balance: '500000', // 0.5 USDC (in smallest units)
          decimals: 6,
          symbol: 'USDC'
        },
        GC: {
          balance: '10000000', // 10 GC (in smallest units)
          decimals: 6,
          symbol: 'GC'
        }
      };

      return balances;
    } catch (error) {
      console.error('Error getting balances:', error);
      throw error;
    }
  }

  // Get recent transactions (mock implementation)
  async getRecentTransactions(limit = 10) {
    if (!this.address) {
      throw new Error('Wallet not initialized');
    }

    try {
      // Mock transaction data for demonstration
      const mockTransactions = [
        {
          id: 'tx_001',
          timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
          type: 'received',
          status: 'success',
          amount: '0.5',
          token: 'AQY'
        },
        {
          id: 'tx_002',
          timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
          type: 'sent',
          status: 'success',
          amount: '0.15',
          token: 'USDC'
        },
        {
          id: 'tx_003',
          timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
          type: 'received',
          status: 'success',
          amount: '2.0',
          token: 'GC'
        }
      ];

      return mockTransactions.slice(0, limit);
    } catch (error) {
      console.error('Error getting transactions:', error);
      throw error;
    }
  }

  // Clear wallet data (logout)
  async clearWallet() {
    try {
      await SecureStore.deleteItemAsync('wallet_mnemonic');
      await SecureStore.deleteItemAsync('wallet_has_wallet');

      this.address = null;

      return { success: true };
    } catch (error) {
      console.error('Error clearing wallet:', error);
      return { success: false, error: error.message };
    }
  }

  // Get current address
  getCurrentAddress() {
    return this.address;
  }

  // Check if wallet is initialized
  isInitialized() {
    return this.address !== null;
  }
}

// Export singleton instance
export default new WalletService();

