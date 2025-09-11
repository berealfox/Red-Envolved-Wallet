import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Svg, { Path, G } from 'react-native-svg';

// Back Icon Component
const BackIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" fill={color}/>
  </Svg>
);

// Mock data for pinned coins
const mockPinnedCoins = [
  {
    id: 'sui',
    symbol: 'SUI',
    icon: require('../../assets/sui.svg'),
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    icon: require('../../assets/sui.svg'), // Using placeholder
  },
  {
    id: 'aqy',
    symbol: 'AQY',
    icon: require('../../assets/sui.svg'), // Using placeholder
  },
  {
    id: 'gc',
    symbol: 'GC',
    icon: require('../../assets/sui.svg'), // Using placeholder
  },
];

const BuySellModal = ({ visible, onClose }) => {
  const { theme } = useTheme();
  const [selectedCoin, setSelectedCoin] = useState(null);

  const handleBuySell = (coin, action) => {
    // Handle buy/sell action
    console.log(`${action} ${coin.symbol}`);
    // Here you would navigate to the actual buy/sell flow
  };

  const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    modalContainer: {
      backgroundColor: theme.backgroundPrimary,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: '80%',
      paddingTop: 20,
    },
    header: {
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingBottom: 20,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderWeak,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.contentPrimary,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    coinList: {
      gap: 12,
    },
    coinItem: {
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    coinInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    coinIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.backgroundAccent,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    coinIconText: {
      color: theme.contentInversePrimary,
      fontSize: 16,
      fontWeight: '600',
    },
    coinDetails: {
      flex: 1,
    },
    coinSymbol: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.contentPrimary,
    },
    actionButtons: {
      flexDirection: 'row',
      gap: 8,
    },
    actionButton: {
      backgroundColor: theme.actionPrimary,
      borderRadius: 8,
      paddingVertical: 8,
      paddingHorizontal: 16,
      minWidth: 60,
      alignItems: 'center',
      justifyContent: 'center',
    },
    actionButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: theme.contentInversePrimary,
      textAlign: 'center',
    },
  });

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={onClose}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Buy & Sell</Text>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.coinList}>
              {mockPinnedCoins.map((coin) => (
                <View key={coin.id} style={styles.coinItem}>
                  <View style={styles.coinInfo}>
                    <View style={styles.coinIcon}>
                      <Text style={styles.coinIconText}>
                        {coin.symbol.charAt(0)}
                      </Text>
                    </View>
                    <View style={styles.coinDetails}>
                      <Text style={styles.coinSymbol}>{coin.symbol}</Text>
                    </View>
                  </View>

                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleBuySell(coin, 'Buy')}
                    >
                      <Text style={styles.actionButtonText}>Buy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.actionButton}
                      onPress={() => handleBuySell(coin, 'Sell')}
                    >
                      <Text style={styles.actionButtonText}>Sell</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

export default BuySellModal;
