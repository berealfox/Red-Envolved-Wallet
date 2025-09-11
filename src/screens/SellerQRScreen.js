import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../theme/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { buildCanonicalPayload } from '../lib/f2c/payload';
import { signEnvelope, randomPrivateKeySafe } from '../lib/f2c/sign';
import { createSellerQRScreenStyles } from '../styles/SellerQRScreen.styles';

const SCHEMES = [
  { id: 'SCHEME_SIMPLE_PERCENT', label: 'Simple buyer %' },
  { id: 'SCHEME_BUYER_PLUS_OTHERS', label: 'Buyer + Others' },
  { id: 'SCHEME_BUYER_PLUS_PREDEFINED', label: 'Buyer + Predefined' },
];

const SellerQRScreen = ({ navigation }) => {
  const { theme, rewardPercentage, updateRewardPercentage, rewardToColor } = useTheme();
  const { walletAddress } = useWallet();
  const styles = createSellerQRScreenStyles(theme);

  const [schemeId, setSchemeId] = useState(SCHEMES[0].id);
  const [localReward, setLocalReward] = useState(rewardPercentage);

  const expiresAt = useMemo(() => Date.now() + 10 * 60 * 1000, [schemeId, rewardPercentage]);
  const nonce = useMemo(() => Math.random().toString(36).slice(2, 10), [schemeId]); // Shorter nonce

  const payload = useMemo(() => buildCanonicalPayload({
    chainId: 'aqy-devnet',
    seller: walletAddress,
    schemeId,
    rewardPct: rewardPercentage,
    metadata: {},
    expiresAt,
    nonce,
  }), [walletAddress, schemeId, rewardPercentage, expiresAt, nonce]);

  const [envelope, setEnvelope] = useState(null);

  const handleSign = async () => {
    try {
      const priv = randomPrivateKeySafe();
      const signed = await signEnvelope(payload, priv);
      setEnvelope(signed);
    } catch (e) {
      console.warn('Sign failed', e);
    }
  };

  // Live feedback while sliding, commit to theme on release
  const bg = rewardToColor(localReward);

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }] }>
      <View style={styles.header}>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.backgroundInverse }]} onPress={() => navigation?.goBack?.()}>
          <Text style={[styles.backText, { color: theme.contentPrimary }]}>Done</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.contentPrimary }]}>Seller QR</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: bg }]} />

        <View style={[styles.card, { backgroundColor: theme.backgroundInverse }]}>
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>Reward %</Text>
          <View style={styles.sliderRow}>
            <Text style={[styles.sliderValue, { color: theme.contentPrimary }]}>{rewardPercentage}%</Text>
          </View>
          <Slider
            style={styles.slider}
            minimumValue={3}
            maximumValue={100}
            step={1}
            minimumTrackTintColor={theme.actionPrimary}
            maximumTrackTintColor={theme.backgroundPrimary}
            thumbTintColor={theme.actionPrimary}
            value={localReward}
            onValueChange={setLocalReward}
            onSlidingComplete={(val) => updateRewardPercentage(val)}
          />
        </View>

        <View style={[styles.card, { backgroundColor: theme.backgroundInverse }]}>
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>Scheme</Text>
          <View style={styles.schemeRow}>
            {SCHEMES.map(s => (
              <TouchableOpacity
                key={s.id}
                onPress={() => setSchemeId(s.id)}
                style={[styles.schemeChip, { backgroundColor: schemeId === s.id ? theme.actionPrimary : theme.backgroundPrimary }]}
              >
                <Text style={[styles.schemeChipText, { color: schemeId === s.id ? theme.contentInversePrimary : theme.contentPrimary }]}>{s.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.backgroundInverse, alignItems: 'center' }]}>
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>Signed QR</Text>
          <View style={styles.qrBox}>
            {envelope ? (
              <QRCode value={JSON.stringify(envelope)} size={220} />
            ) : (
              <Text style={{ color: theme.contentSecondary }}>Tap Sign to generate QR</Text>
            )}
          </View>
          {envelope && (
            <View style={{ marginTop: 8, padding: 8, backgroundColor: theme.backgroundPrimary, borderRadius: 8 }}>
              <Text style={{ color: theme.contentSecondary, fontSize: 10 }}>
                QR contains: {JSON.stringify(envelope).length} characters
              </Text>
            </View>
          )}
          <TouchableOpacity onPress={handleSign} style={[styles.primaryButton, { backgroundColor: theme.actionPrimary }]}>
            <Text style={[styles.primaryButtonText, { color: theme.contentInversePrimary }]}>{envelope ? 'Re-sign' : 'Sign & Generate QR'}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default SellerQRScreen;


