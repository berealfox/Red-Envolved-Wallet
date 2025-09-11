import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Share,
  Alert,
  Clipboard,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useTheme } from '../theme/ThemeContext';
import { useWallet } from '../context/WalletContext';
import { createReceiveScreenStyles } from '../styles/ReceiveScreen.styles';
import { ArrowLeftIcon, CopyIcon, ShareIcon } from '../components/icons';

const ReceiveScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const { walletAddress } = useWallet();
  const styles = createReceiveScreenStyles(theme);
  const [selectedToken, setSelectedToken] = useState('AQY');
  const [activeTab, setActiveTab] = useState('receive'); // 'receive' or 'scan'
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

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

  const handleQRCodeScanned = ({ type, data }) => {
    setScanned(true);
    // Handle scanned QR code data
    Alert.alert(
      'QR Code Scanned',
      `Scanned data: ${data}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Process', onPress: () => {
          // Here you would process the scanned QR code
          // For example, extract wallet address or payment info
          console.log('Processing QR code:', data);
        }}
      ]
    );
    setTimeout(() => setScanned(false), 1500);
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

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'receive' && styles.activeTab,
            { backgroundColor: activeTab === 'receive' ? theme.actionPrimary : 'transparent' }
          ]}
          onPress={() => setActiveTab('receive')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'receive' ? theme.contentInversePrimary : theme.contentPrimary }
          ]}>
            Receive SUI
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'scan' && styles.activeTab,
            { backgroundColor: activeTab === 'scan' ? theme.actionPrimary : 'transparent' }
          ]}
          onPress={() => setActiveTab('scan')}
        >
          <Text style={[
            styles.tabText,
            { color: activeTab === 'scan' ? theme.contentInversePrimary : theme.contentPrimary }
          ]}>
            Scan code
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'receive' ? (
        <View style={styles.mainContent}>
          <ScrollView style={[styles.content, styles.scrollContent]}>
            {/* QR Code Section (no background) */}
            <View style={styles.qrSection}>
              <View style={styles.qrContainer}>
                <View style={styles.qrBackground}>
                  {walletAddress && (
                    <QRCode
                      value={walletAddress}
                      size={200}
                      backgroundColor="white"
                      color="black"
                      logo={require('../../assets/red-wallet-logo.jpg')}
                      logoSize={40}
                      logoBackgroundColor='red'
                      logoBorderRadius={20}
                      logoBorderColor='transparent'
                      logoBorderWidth={0}
                      logoMargin={0}
                    />
                  )}
                </View>
              </View>

            </View>

            {/* Name and short address under QR (separate container) */}
            <View style={styles.addressContainer}>
              <Text style={[styles.walletName, { color: theme.contentPrimary }]}>bearbeast131</Text>
              <Text style={[styles.addressShort, { color: theme.contentSecondary }]}>
                {formatAddress(walletAddress)}
              </Text>
            </View>
          </ScrollView>

          {/* Fixed bottom Copy button */}
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.actionPrimary }]}
              onPress={handleCopyAddress}
            >
              <CopyIcon size={20} color={theme.contentInversePrimary} />
              <Text style={[styles.actionButtonText, { color: theme.contentInversePrimary }]}>Copy Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* Camera Scanner View */
        (!permission || !permission.granted) ? (
          <View style={styles.cameraContainer}>
            <Text style={[styles.scanInstruction, { color: theme.contentPrimary }]}>We need your permission to use the camera</Text>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.actionPrimary, marginTop: 12, alignSelf: 'center' }]}
              onPress={requestPermission}
            >
              <Text style={[styles.actionButtonText, { color: theme.contentInversePrimary }]}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              facing="back"
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
              onBarcodeScanned={scanned ? undefined : handleQRCodeScanned}
            >
              <View style={styles.cameraOverlay}>
                <View style={styles.scanArea}>
                  <View style={[styles.scanCorner, styles.topLeft]} />
                  <View style={[styles.scanCorner, styles.topRight]} />
                  <View style={[styles.scanCorner, styles.bottomLeft]} />
                  <View style={[styles.scanCorner, styles.bottomRight]} />
                </View>
                <Text style={[styles.scanInstruction, { color: theme.contentPrimary }]}>Position QR code within the frame</Text>
              </View>
            </CameraView>
          </View>
        )
      )}
    </View>
  );
};


export default ReceiveScreen;
