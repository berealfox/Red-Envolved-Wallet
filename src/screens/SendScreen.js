import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { createSendScreenStyles } from '../styles/SendScreen.styles';
import { ArrowLeftIcon } from '../components/icons';
// import SendMethodModal from '../components/SendMethodModal';

const SendScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { balances, formatBalance, walletService } = useWallet();
  const styles = createSendScreenStyles(theme);

  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedToken, setSelectedToken] = useState('AQY');
  const [isLoading, setIsLoading] = useState(false);
  const [memo, setMemo] = useState('');
  // const [showSendMethodModal, setShowSendMethodModal] = useState(false);

  const handleSend = async () => {
    if (!recipient || !amount) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!validateAddress(recipient)) {
      Alert.alert('Error', 'Invalid recipient address');
      return;
    }

    const tokenBalance = balances[selectedToken];
    const amountInDecimals = parseFloat(amount) * Math.pow(10, tokenBalance.decimals);
    const availableBalance = parseFloat(tokenBalance.balance);

    if (amountInDecimals > availableBalance) {
      Alert.alert('Error', 'Insufficient balance');
      return;
    }

    setIsLoading(true);

    try {
      // This would implement the actual transaction sending
      // For now, we'll just simulate it
      await new Promise(resolve => setTimeout(resolve, 2000));

      Alert.alert(
        'Success',
        `Sent ${amount} ${selectedToken} to ${recipient.substring(0, 6)}...${recipient.substring(recipient.length - 4)}`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setRecipient('');
              setAmount('');
              setMemo('');
              navigation?.goBack();
            }
          }
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to send transaction: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const validateAddress = (address) => {
    // Basic validation for Sui/AQY address format
    return address.startsWith('0x') && address.length === 66;
  };

  const getMaxAmount = () => {
    const tokenBalance = balances[selectedToken];
    return formatBalance(tokenBalance.balance, tokenBalance.decimals);
  };

  const handleMaxPress = () => {
    setAmount(getMaxAmount());
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: theme.backgroundInverse }]}
          onPress={() => navigation?.goBack()}
        >
          <ArrowLeftIcon size={20} color={theme.contentPrimary} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.contentPrimary }]}>Send</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Token Selector */}
        <View style={[styles.section, { backgroundColor: theme.backgroundInverse }]}>
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>Token</Text>
          <View style={styles.tokenSelector}>
            {Object.keys(balances).map((token) => (
              <TouchableOpacity
                key={token}
                style={[
                  styles.tokenOption,
                  { backgroundColor: selectedToken === token ? theme.actionPrimary : theme.actionSecondary }
                ]}
                onPress={() => setSelectedToken(token)}
              >
                <Text style={[
                  styles.tokenText,
                  { color: selectedToken === token ? theme.contentInversePrimary : theme.contentPrimary }
                ]}>
                  {token}
                </Text>
                <Text style={[
                  styles.tokenBalance,
                  { color: selectedToken === token ? theme.contentInversePrimary : theme.contentSecondary }
                ]}>
                  {formatBalance(balances[token].balance, balances[token].decimals)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recipient Address */}
        <View style={[styles.section, { backgroundColor: theme.backgroundInverse }]}>
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>Recipient Address</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.actionSecondary, color: theme.contentPrimary }]}
            value={recipient}
            onChangeText={setRecipient}
            placeholder="0x..."
            placeholderTextColor={theme.contentSecondary}
            multiline
          />
        </View>

        {/* Amount */}
        <View style={[styles.section, { backgroundColor: theme.backgroundInverse }]}>
          <View style={styles.amountHeader}>
            <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>Amount</Text>
            <TouchableOpacity onPress={handleMaxPress}>
              <Text style={[styles.maxButton, { color: theme.actionPrimary }]}>MAX</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.input, { backgroundColor: theme.actionSecondary, color: theme.contentPrimary }]}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor={theme.contentSecondary}
            keyboardType="numeric"
          />
          <Text style={[styles.balanceText, { color: theme.contentSecondary }]}>
            Available: {getMaxAmount()} {selectedToken}
          </Text>
        </View>

        {/* Memo (Optional) */}
        <View style={[styles.section, { backgroundColor: theme.backgroundInverse }]}>
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>Memo (Optional)</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.actionSecondary, color: theme.contentPrimary }]}
            value={memo}
            onChangeText={setMemo}
            placeholder="Add a note..."
            placeholderTextColor={theme.contentSecondary}
          />
        </View>

        {/* Send Button */}
        <TouchableOpacity
          style={[
            styles.sendButton,
            {
              backgroundColor: theme.actionPrimary,
              opacity: isLoading || !recipient || !amount ? 0.5 : 1
            }
          ]}
          onPress={handleSend}
          disabled={isLoading || !recipient || !amount}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.contentInversePrimary} />
          ) : (
            <Text style={[styles.sendButtonText, { color: theme.contentInversePrimary }]}>
              Send {amount} {selectedToken}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>

    </View>
  );
};


export default SendScreen;
