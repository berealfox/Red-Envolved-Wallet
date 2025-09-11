import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createDirectSendScreenStyles } from '../styles/DirectSendScreen.styles';
import { ArrowLeftIcon, ScanIcon } from '../components/icons';

const DirectSendScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = createDirectSendScreenStyles(theme);

  const [token, setToken] = useState('SUI');
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
          <TouchableOpacity style={[styles.tokenPill, { backgroundColor: theme.backgroundInverse }]}>
            <Text style={[styles.tokenPillText, { color: theme.contentPrimary }]}>{token}</Text>
          </TouchableOpacity>
          <View style={styles.balanceRow}>
            <Text style={{ color: theme.contentSecondary }}>0</Text>
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
          <Text style={[styles.fiatText, { color: theme.contentSecondary }]}>$0.00</Text>
          <View style={styles.percentChips}>
            {['25%','50%','Max'].map(label => (
              <TouchableOpacity key={label} style={[styles.percentChip, { backgroundColor: theme.backgroundInverse }]}
                disabled>
                <Text style={[styles.percentChipText, { color: theme.contentSecondary }]}>{label}</Text>
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
          onChangeText={setRecipient}
          multiline
        />
      </ScrollView>

      {/* Bottom gas + send */}
      <View style={[styles.bottomCard, { backgroundColor: theme.backgroundInverse }]}>
        <View style={styles.gasRow}>
          <Text style={[styles.gasLabel, { color: theme.contentPrimary }]}>Estimated Gas Fees</Text>
          <Text style={{ color: theme.contentSecondary }}>-</Text>
        </View>
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: theme.actionSecondary }]} disabled>
          {isLoading ? (
            <ActivityIndicator color={theme.contentPrimary} />
          ) : (
            <Text style={[styles.sendText, { color: theme.contentPrimary }]}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DirectSendScreen;


