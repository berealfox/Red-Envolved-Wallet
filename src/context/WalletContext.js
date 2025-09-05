import React, { createContext, useContext, useState, useEffect } from 'react';
import WalletService from '../services/WalletService';

const WalletContext = createContext();

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider = ({ children }) => {
  const [hasWallet, setHasWallet] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balances, setBalances] = useState({
    AQY: { balance: '0', decimals: 9, symbol: 'AQY' },
    USDC: { balance: '0', decimals: 6, symbol: 'USDC' },
    GC: { balance: '0', decimals: 6, symbol: 'GC' }
  });
  const [recentTxs, setRecentTxs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize wallet service
  useEffect(() => {
    initializeWallet();
  }, []);

  const initializeWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Initialize the blockchain client
      WalletService.initializeClient('devnet');

      // Check if wallet exists
      const result = await WalletService.loadWallet();

      if (result.hasWallet && result.success) {
        setHasWallet(true);
        setWalletAddress(result.address);

        // Load balances and transactions
        await refreshWalletData();
      } else {
        setHasWallet(false);
      }
    } catch (err) {
      console.error('Error initializing wallet:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshWalletData = async () => {
    if (!WalletService.getCurrentAddress()) {
      return;
    }

    try {
      // Get balances
      const newBalances = await WalletService.getBalances();
      setBalances(newBalances);

      // Get recent transactions
      const transactions = await WalletService.getRecentTransactions(10);
      setRecentTxs(transactions);
    } catch (err) {
      console.error('Error refreshing wallet data:', err);
      setError(err.message);
    }
  };

  const createWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await WalletService.generateWallet();

      if (result.success) {
        setHasWallet(true);
        setWalletAddress(result.address);

        // Refresh wallet data
        await refreshWalletData();

        return {
          success: true,
          address: result.address,
          mnemonic: result.mnemonic
        };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = err.message || 'Failed to create wallet';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const importWallet = async (mnemonic) => {
    try {
      setIsLoading(true);
      setError(null);

      const result = await WalletService.importWallet(mnemonic);

      if (result.success) {
        setHasWallet(true);
        setWalletAddress(result.address);

        // Refresh wallet data
        await refreshWalletData();

        return { success: true, address: result.address };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMsg = err.message || 'Failed to import wallet';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const clearWallet = async () => {
    try {
      setIsLoading(true);
      setError(null);

      await WalletService.clearWallet();

      setHasWallet(false);
      setWalletAddress('');
      setBalances({
        AQY: { balance: '0', decimals: 9, symbol: 'AQY' },
        USDC: { balance: '0', decimals: 6, symbol: 'USDC' },
        GC: { balance: '0', decimals: 6, symbol: 'GC' }
      });
      setRecentTxs([]);

      return { success: true };
    } catch (err) {
      const errorMsg = err.message || 'Failed to clear wallet';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Format balance for display
  const formatBalance = (balance, decimals = 9) => {
    const num = parseFloat(balance) / Math.pow(10, decimals);
    return num.toFixed(4);
  };

  // Get total portfolio value (placeholder)
  const getTotalValue = () => {
    // In a real app, you'd fetch token prices and calculate total value
    const aqyValue = parseFloat(formatBalance(balances.AQY.balance, balances.AQY.decimals));
    const usdcValue = parseFloat(formatBalance(balances.USDC.balance, balances.USDC.decimals));
    const gcValue = parseFloat(formatBalance(balances.GC.balance, balances.GC.decimals));

    // Mock prices (in real app, fetch from price feed)
    const aqyPrice = 1.20; // $1.20 per AQY
    const usdcPrice = 1.00; // $1.00 per USDC
    const gcPrice = 0.10; // $0.10 per GC

    return (aqyValue * aqyPrice + usdcValue * usdcPrice + gcValue * gcPrice).toFixed(2);
  };

  const value = {
    // Wallet state
    hasWallet,
    walletAddress,
    balances,
    recentTxs,
    isLoading,
    error,

    // Wallet actions
    createWallet,
    importWallet,
    clearWallet,
    refreshWalletData,

    // Utility functions
    formatBalance,
    getTotalValue,

    // Wallet service access
    walletService: WalletService
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};
