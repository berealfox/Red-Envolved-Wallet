import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createDirectSendScreenStyles } from '../styles/DirectSendScreen.styles';
import { ArrowLeftIcon, ScanIcon } from '../components/icons';
import SelectCoinScreen from './SelectCoinScreen';

const DirectSendScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createDirectSendScreenStyles(theme);

  const [token, setToken] = useState('SUI');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAddressValid, setIsAddressValid] = useState(false);
  const [showSelectCoin, setShowSelectCoin] = useState(false);

  // SUI rate in USD
  const SUI_RATE_USD = 3.70;
  // Mock balance for testing
  const MOCK_BALANCE = 10;

  const validateAddress = (address) => {
    // Basic validation for Sui address format - made more lenient for testing
    return address.startsWith('0x') && address.length >= 10;
  };

  const handleRecipientChange = (text) => {
    setRecipient(text);
    const isValid = validateAddress(text);
    setIsAddressValid(isValid);
  };

  const getUSDAmount = () => {
    const numAmount = parseFloat(amount) || 0;
    return (numAmount * SUI_RATE_USD).toFixed(2);
  };

  const getGasFees = () => {
    const numAmount = parseFloat(amount) || 0;
    if (numAmount === 0) {
      return '0';
    }
    // Gas fees calculation based on amount (example: 0.001 SUI base + 0.0001 per SUI)
    const baseGas = 0.001;
    const perSuiGas = numAmount * 0.0001;
    const totalGas = baseGas + perSuiGas;
    return totalGas.toFixed(4);
  };

  const handlePercentagePress = (percentage) => {
    let amountToSet = 0;
    if (percentage === '25%') {
      amountToSet = MOCK_BALANCE * 0.25;
    } else if (percentage === '50%') {
      amountToSet = MOCK_BALANCE * 0.5;
    } else if (percentage === 'Max') {
      amountToSet = MOCK_BALANCE;
    }
    setAmount(amountToSet.toString());
  };

  const isSendEnabled = () => {
    const hasValidAmount = parseFloat(amount) > 0;
    const hasValidRecipient = isAddressValid;
    const amountWithinBalance = parseFloat(amount) <= MOCK_BALANCE;

    return hasValidAmount && hasValidRecipient && amountWithinBalance;
  };

  const handleSend = async () => {
    if (!isSendEnabled()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate sending transaction
      const startTime = Date.now();
      await new Promise(resolve => setTimeout(resolve, 2000));
      const endTime = Date.now();
      const durationMs = endTime - startTime;

      // Calculate transaction data
      const numAmount = parseFloat(amount);
      const gasFees = parseFloat(getGasFees());
      const total = numAmount + gasFees;

      // Generate mock transaction hash
      const txHash = '0x' + Math.random().toString(16).substr(2, 64);

      // Here you would typically call your wallet service to send the transaction
      console.log('Sending transaction:', {
        amount: numAmount,
        recipient: recipient,
        token: token,
        gas: gasFees,
        total: total
      });

      // Navigate to ConfirmationScreen with transaction data
      navigation?.navigate('Confirmation', {
        durationMs: durationMs,
        amount: numAmount,
        token: token,
        to: recipient,
        gas: gasFees,
        total: total,
        txHash: txHash,
        completedAt: new Date().toISOString(),
      });

    } catch (error) {
      console.error('Send error:', error);
      alert('Failed to send transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.backgroundInverse }]} onPress={() => navigation?.goBack()}>
          <ArrowLeftIcon size={20} color={theme.contentPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.contentPrimary }]}>Send</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Token selector pill */}
        <View style={styles.tokenRow}>
          <TouchableOpacity
            style={[styles.tokenPill, { backgroundColor: theme.backgroundInverse }]}
            onPress={() => setShowSelectCoin(true)}
          >
            <Text style={[styles.tokenPillText, { color: theme.contentPrimary }]}>{token}</Text>
          </TouchableOpacity>
          <View style={styles.balanceRow}>
            <Text style={{ color: theme.contentSecondary }}>{MOCK_BALANCE}</Text>
          </View>
        </View>

        {/* Amount */}
        <View style={styles.amountBlock}>
          <TextInput
            style={[styles.amountInput, { color: theme.contentPrimary }]}
            value={amount}
            onChangeText={setAmount}
            placeholder="0"
            placeholderTextColor={theme.contentSecondary}
            keyboardType="decimal-pad"
            returnKeyType="done"
          />
          <Text style={[styles.fiatText, { color: theme.contentSecondary }]}>
            {amount ? `$${getUSDAmount()}` : '$0.00'}
          </Text>
          <View style={styles.percentChips}>
            {['25%','50%','Max'].map(label => (
              <TouchableOpacity
                key={label}
                style={[styles.percentChip, { backgroundColor: theme.backgroundInverse }]}
                onPress={() => handlePercentagePress(label)}
              >
                <Text style={[styles.percentChipText, { color: theme.contentPrimary }]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.separator} />

        {/* Recipient */}
        <View style={styles.toHeader}>
          <Text style={[styles.toLabel, { color: theme.contentSecondary }]}>To</Text>
          <TouchableOpacity onPress={() => navigation?.navigate?.('OpenScan')}>
            <ScanIcon size={18} color={theme.contentSecondary} />
          </TouchableOpacity>
        </View>
        <TextInput
          style={[styles.recipientInput, { color: theme.contentPrimary }]}
          placeholder="Enter recipient"
          placeholderTextColor={theme.contentSecondary}
          value={recipient}
          onChangeText={handleRecipientChange}
          multiline
        />

        {/* Address Validation Bar */}
        {isAddressValid && (
          <View style={styles.validationBar}>
            <View style={styles.checkmarkIcon}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
            <Text style={styles.validationText}>Valid destination.</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom gas + send */}
      <View style={[styles.bottomCard, { backgroundColor: theme.backgroundInverse }]}>
        <View style={styles.gasRow}>
          <Text style={[styles.gasLabel, { color: theme.contentPrimary }]}>Estimated Gas Fees</Text>
          <Text style={{ color: theme.contentSecondary }}>{getGasFees()} SUI</Text>
        </View>
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor: isSendEnabled() ? '#ff4444' : theme.backgroundSecondary,
              opacity: isSendEnabled() ? 1 : 0.5
            }
          ]}
          disabled={!isSendEnabled() || isLoading}
          onPress={handleSend}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={[styles.sendText, { color: 'white' }]}>Send</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Select Coin Modal Overlay */}
      {showSelectCoin && (
        <View style={styles.modalOverlay}>
          <SelectCoinScreen
            onBack={() => setShowSelectCoin(false)}
            navigation={navigation}
          />
        </View>
      )}
    </View>
  );
};

export default DirectSendScreen;


