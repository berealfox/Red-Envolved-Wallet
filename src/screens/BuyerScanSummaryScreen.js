import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createBuyerScanSummaryStyles } from '../styles/BuyerScanSummaryScreen.styles';
import { verifyEnvelope } from '../lib/f2c/sign';

const BuyerScanSummaryScreen = ({ route, navigation }) => {
  const { theme } = useTheme();
  const styles = createBuyerScanSummaryStyles(theme);
  const { envelope } = route?.params || {};
  const [isValid, setIsValid] = useState(null);
  const [error, setError] = useState(null);

  const expired = useMemo(() => {
    if (!envelope?.payload?.expiresAt) return true;
    return Date.now() > Number(envelope.payload.expiresAt);
  }, [envelope]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (!envelope) {
          throw new Error('Missing envelope');
        }
        const ok = await verifyEnvelope(envelope);
        if (!mounted) return;
        setIsValid(ok && !expired);
      } catch (e) {
        if (!mounted) return;
        setError(e.message);
        setIsValid(false);
      }
    })();
    return () => { mounted = false; };
  }, [envelope, expired]);

  const onPay = () => {
    if (!isValid) {
      Alert.alert('Invalid QR', 'The QR code is invalid or expired.');
      return;
    }
    // Mock submit -> navigate to Confirmation via parent handler
    navigation?.navigate?.('Confirmation', {
      status: 'success',
      amount: '0.00',
      token: 'AQY',
      to: envelope?.payload?.seller,
      gas: '$0.00',
      total: '$0.00',
      timestamp: Date.now(),
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }] }>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.backgroundInverse }]} onPress={() => navigation?.goBack?.()}>
          <Text style={[styles.backText, { color: theme.contentPrimary }]}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.contentPrimary }]}>Confirm Purchase</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={[styles.card, { backgroundColor: theme.backgroundInverse }]}>
        <Text style={[styles.label, { color: theme.contentSecondary }]}>Seller</Text>
        <Text style={[styles.value, { color: theme.contentPrimary }]} numberOfLines={1}>
          {envelope?.payload?.seller || 'Unknown'}
        </Text>

        <Text style={[styles.label, { color: theme.contentSecondary }]}>Scheme</Text>
        <Text style={[styles.value, { color: theme.contentPrimary }]}>
          {envelope?.payload?.schemeId || '—'}
        </Text>

        <Text style={[styles.label, { color: theme.contentSecondary }]}>Reward %</Text>
        <Text style={[styles.value, { color: theme.contentPrimary }]}>
          {envelope?.payload?.rewardPct ?? '—'}%
        </Text>

        <Text style={[styles.label, { color: theme.contentSecondary }]}>Valid Until</Text>
        <Text style={[styles.value, { color: theme.contentPrimary }]}>
          {envelope?.payload?.expiresAt ? new Date(Number(envelope.payload.expiresAt)).toLocaleString() : '—'}
        </Text>

        <Text style={[styles.status, { color: isValid ? (theme.success || '#22c55e') : theme.actionPrimary }]}>
          {isValid === null ? 'Validating…' : isValid ? 'Valid' : (error || expired ? 'Expired/Invalid' : 'Invalid')}
        </Text>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={[styles.payButton, { backgroundColor: isValid ? theme.actionPrimary : theme.actionSecondary }]}
          onPress={onPay} disabled={!isValid}>
          <Text style={[styles.payText, { color: isValid ? theme.contentInversePrimary : theme.contentPrimary }]}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BuyerScanSummaryScreen;


