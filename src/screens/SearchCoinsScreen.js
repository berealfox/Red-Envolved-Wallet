import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Svg, { Path, Circle } from 'react-native-svg';

// Icons
const BackIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" fill={color}/>
  </Svg>
);

const SearchIcon = ({ size = 20, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill={color}/>
  </Svg>
);

const PinIcon = ({ size = 16, color = "#000", filled = false }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"
      fill={filled ? color : "none"}
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CheckIcon = ({ size = 16, color = "#4caf50" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill={color}/>
  </Svg>
);

const SearchCoinsScreen = ({ onBack }) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [pinnedCoins, setPinnedCoins] = useState(['SUI', 'WAL']);

  // Mock token data
  const mockTokens = [
    {
      id: 'SUI',
      name: 'Sui',
      symbol: 'SUI',
      price: '$3.39',
      change: '+1.77%',
      balance: '0.4000 SUI',
      value: '$1.35',
      icon: '🔵',
      verified: true,
    },
    {
      id: 'WAL',
      name: 'WAL',
      symbol: 'WAL',
      price: '$0.4260',
      change: '+0.4900%',
      balance: null,
      value: null,
      icon: '❄️',
      verified: true,
    },
    {
      id: 'DRF',
      name: '$DRF',
      symbol: '$DRF',
      price: '$0.8445',
      change: '+9.26%',
      balance: null,
      value: null,
      icon: '💧',
      verified: true,
    },
    {
      id: 'SE4C',
      name: '$E4C',
      symbol: '$E4C',
      price: '$0.0038',
      change: '+1.1%',
      balance: null,
      value: null,
      icon: '🔴',
      verified: true,
    },
    {
      id: 'OXWSB',
      name: '0xWSB on SUI',
      symbol: '0xWSB',
      price: '$0.8906',
      change: '+1.82%',
      balance: null,
      value: null,
      icon: '😎',
      verified: true,
    },
    {
      id: 'AAACAT',
      name: 'aaa cat',
      symbol: 'AAACAT',
      price: '$0.3150',
      change: '+14.32%',
      balance: null,
      value: null,
      icon: '🐱',
      verified: true,
    },
    {
      id: 'AFSUI',
      name: 'afSUI',
      symbol: 'afSUI',
      price: '$3.58',
      change: '+1.79%',
      balance: null,
      value: null,
      icon: '🔵',
      verified: true,
    },
    {
      id: 'AGENTS',
      name: 'Agent S',
      symbol: 'AGENTS',
      price: '$0.0002',
      change: '+3.24%',
      balance: null,
      value: null,
      icon: '🕴️',
      verified: true,
    },
    {
      id: 'ALKIMI',
      name: 'Alkimi',
      symbol: 'ALKIMI',
      price: '$0.0749',
      change: '+16.75%',
      balance: null,
      value: null,
      icon: '🔵',
      verified: true,
    },
    {
      id: 'ALPHACITY',
      name: 'Alpha City',
      symbol: 'ALPHACITY',
      price: '$0.0000',
      change: '+1.43%',
      balance: null,
      value: null,
      icon: '🌆',
      verified: true,
    },
  ];

  const filteredTokens = mockTokens.filter(token =>
    token.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    token.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const togglePin = (tokenId) => {
    setPinnedCoins(prev =>
      prev.includes(tokenId)
        ? prev.filter(id => id !== tokenId)
        : [...prev, tokenId]
    );
  };

  const isPositiveChange = (change) => {
    return change.startsWith('+');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 20,
      paddingTop: 40,
    },
    backButton: {
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.contentPrimary,
    },
    searchContainer: {
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundAccent,
      borderRadius: 25,
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    searchIcon: {
      marginRight: 12,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: theme.contentPrimary,
    },
    tokenList: {
      flex: 1,
      paddingHorizontal: 16,
    },
    tokenItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderWeak,
    },
    pinButton: {
      marginRight: 16,
      padding: 4,
    },
    tokenIcon: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: theme.backgroundSecondary,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    tokenIconText: {
      fontSize: 20,
    },
    tokenInfo: {
      flex: 1,
    },
    tokenHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    tokenName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.contentPrimary,
      marginRight: 6,
    },
    verifiedIcon: {
      marginLeft: 4,
    },
    tokenPrice: {
      fontSize: 14,
      color: theme.contentSecondary,
    },
    tokenRight: {
      alignItems: 'flex-end',
    },
    tokenValue: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.contentPrimary,
      marginBottom: 2,
    },
    tokenBalance: {
      fontSize: 14,
      color: theme.contentSecondary,
      marginBottom: 2,
    },
    tokenChange: {
      fontSize: 14,
      fontWeight: '500',
    },
    positiveChange: {
      color: '#4caf50',
    },
    negativeChange: {
      color: '#f44336',
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon size={24} color={theme.contentPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search and pin coins</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <SearchIcon size={20} color={theme.contentSecondary} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor={theme.contentSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Token List */}
      <ScrollView style={styles.tokenList} showsVerticalScrollIndicator={false}>
        {filteredTokens.map((token) => (
          <View key={token.id} style={styles.tokenItem}>
            {/* Pin Button */}
            <TouchableOpacity
              style={styles.pinButton}
              onPress={() => togglePin(token.id)}
            >
              <PinIcon
                size={16}
                color={pinnedCoins.includes(token.id) ? theme.backgroundAccent : theme.contentSecondary}
                filled={pinnedCoins.includes(token.id)}
              />
            </TouchableOpacity>

            {/* Token Icon */}
            <View style={styles.tokenIcon}>
              <Text style={styles.tokenIconText}>{token.icon}</Text>
            </View>

            {/* Token Info */}
            <View style={styles.tokenInfo}>
              <View style={styles.tokenHeader}>
                <Text style={styles.tokenName}>{token.name}</Text>
                {token.verified && (
                  <CheckIcon size={16} color={theme.backgroundAccent} style={styles.verifiedIcon} />
                )}
              </View>
              <Text style={styles.tokenPrice}>{token.price} {token.change && (
                <Text style={[
                  styles.tokenChange,
                  isPositiveChange(token.change) ? styles.positiveChange : styles.negativeChange
                ]}>
                  {token.change}
                </Text>
              )}</Text>
            </View>

            {/* Token Right Side */}
            <View style={styles.tokenRight}>
              {token.value && (
                <Text style={styles.tokenValue}>{token.value}</Text>
              )}
              {token.balance && (
                <Text style={styles.tokenBalance}>{token.balance}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SearchCoinsScreen;
