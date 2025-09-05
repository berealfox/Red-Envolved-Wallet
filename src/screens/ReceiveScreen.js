import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
  Clipboard,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useTheme } from '../theme/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { ArrowLeftIcon, CopyIcon, ShareIcon } from '../components/icons';

const ReceiveScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { walletAddress } = useWallet();
  const [selectedToken, setSelectedToken] = useState('AQY');

  const handleCopyAddress = async () => {
    try {
      await Clipboard.setString(walletAddress);
      Alert.alert('Copied', 'Address copied to clipboard');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy address');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Send ${selectedToken} to this address:\n${walletAddress}`,
        title: 'My Wallet Address',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share address');
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const tokens = ['AQY', 'USDC', 'GC'];

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
        <Text style={[styles.title, { color: theme.contentPrimary }]}>Receive</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        {/* Token Selector */}
        <View style={[styles.section, { backgroundColor: theme.backgroundInverse }]}>
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>Select Token</Text>
          <View style={styles.tokenSelector}>
            {tokens.map((token) => (
              <TouchableOpacity
                key={token}
                style={[
                  styles.tokenOption,
                  {
                    backgroundColor: selectedToken === token ? theme.actionPrimary : theme.actionSecondary,
                    borderColor: selectedToken === token ? theme.actionPrimary : 'transparent'
                  }
                ]}
                onPress={() => setSelectedToken(token)}
              >
                <Text style={[
                  styles.tokenText,
                  { color: selectedToken === token ? theme.contentInversePrimary : theme.contentPrimary }
                ]}>
                  {token}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* QR Code Section */}
        <View style={[styles.qrSection, { backgroundColor: theme.backgroundInverse }]}>
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>
            Scan to send {selectedToken}
          </Text>

          <View style={styles.qrContainer}>
            <View style={styles.qrBackground}>
              {walletAddress && (
                <QRCode
                  value={walletAddress}
                  size={200}
                  backgroundColor="white"
                  color="black"
                />
              )}
            </View>
          </View>

          <Text style={[styles.qrLabel, { color: theme.contentSecondary }]}>
            Your {selectedToken} Address
          </Text>
        </View>

        {/* Address Section */}
        <View style={[styles.section, { backgroundColor: theme.backgroundInverse }]}>
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>Wallet Address</Text>

          <View style={[styles.addressContainer, { backgroundColor: theme.actionSecondary }]}>
            <Text style={[styles.addressText, { color: theme.contentPrimary }]}>
              {walletAddress}
            </Text>
          </View>

          <Text style={[styles.addressShort, { color: theme.contentSecondary }]}>
            {formatAddress(walletAddress)}
          </Text>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.actionPrimary }]}
              onPress={handleCopyAddress}
            >
              <CopyIcon size={20} color={theme.contentInversePrimary} />
              <Text style={[styles.actionButtonText, { color: theme.contentInversePrimary }]}>
                Copy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.actionSecondary }]}
              onPress={handleShare}
            >
              <ShareIcon size={20} color={theme.contentPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.contentPrimary }]}>
                Share
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Instructions */}
        <View style={[styles.section, { backgroundColor: theme.backgroundInverse }]}>
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>Instructions</Text>
          <Text style={[styles.instructionText, { color: theme.contentSecondary }]}>
            • Share your QR code or address with the sender
          </Text>
          <Text style={[styles.instructionText, { color: theme.contentSecondary }]}>
            • Make sure they select the correct network (AQY)
          </Text>
          <Text style={[styles.instructionText, { color: theme.contentSecondary }]}>
            • Transactions are irreversible, double-check the address
          </Text>
          <Text style={[styles.instructionText, { color: theme.contentSecondary }]}>
            • Your wallet supports AQY, USDC, and GC tokens
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  tokenSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  tokenOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
  },
  tokenText: {
    fontSize: 14,
    fontWeight: '600',
  },
  qrSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  qrBackground: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  qrLabel: {
    fontSize: 14,
    textAlign: 'center',
  },
  addressContainer: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  addressText: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  addressShort: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  instructionText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default ReceiveScreen;
