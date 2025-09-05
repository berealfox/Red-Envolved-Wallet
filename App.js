import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated, Image } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import EarnScreen from './src/screens/EarnScreen';
import NFTsScreen from './src/screens/NFTsScreen';
import AppsScreen from './src/screens/AppsScreen';
import ActivityScreen from './src/screens/ActivityScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { HomeIcon, EarnIcon, NFTsIcon, AppsIcon, ActivityIcon, SettingsIcon } from './src/components/icons';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';
import { WalletProvider, useWallet } from './src/context/WalletContext';

function AppContent() {
  const { theme } = useTheme();
  const {
    hasWallet,
    walletAddress,
    balances,
    recentTxs,
    createWallet,
    importWallet,
    isLoading,
    error
  } = useWallet();
  const [activeTab, setActiveTab] = useState('Home');
  const [tabBarOpacity] = useState(new Animated.Value(0));
  const [pressedTab, setPressedTab] = useState(null);

  useEffect(() => {
    if (hasWallet) {
      Animated.timing(tabBarOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [hasWallet, tabBarOpacity]);

  const handleTabPress = (tabKey) => {
    setActiveTab(tabKey);
    // Add a subtle scale animation
    setPressedTab(tabKey);
    setTimeout(() => setPressedTab(null), 150);
  };



  const handleCreateWallet = async () => {
    const result = await createWallet();
    if (result.success) {
      // Wallet created successfully
      console.log('Wallet created:', result.address);
      // You might want to show the mnemonic to the user here
    } else {
      console.error('Failed to create wallet:', result.error);
      // Handle error (show alert, etc.)
    }
  };

  const handleImportWallet = async () => {
    // For now, we'll use a placeholder mnemonic
    // In production, you'd show an input dialog for the user to enter their mnemonic
    const testMnemonic = "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about";

    const result = await importWallet(testMnemonic);
    if (result.success) {
      console.log('Wallet imported:', result.address);
    } else {
      console.error('Failed to import wallet:', result.error);
      // Handle error
    }
  };



  const renderContent = () => {
    if (!hasWallet) {
      return (
        <View style={styles.onboardContainer}>
          <Text style={[styles.onboardTitle, { color: theme.contentPrimary }]}>Welcome to Red Envelope</Text>
          <TouchableOpacity style={[styles.onboardButton, { backgroundColor: theme.actionPrimary }]} onPress={handleCreateWallet}>
            <Text style={[styles.onboardButtonText, { color: theme.contentInversePrimary }]}>Create Wallet</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.onboardButtonSecondary, { borderColor: theme.borderWeak }]} onPress={handleImportWallet}>
            <Text style={[styles.onboardButtonSecondaryText, { color: theme.contentSecondary }]}>Import Wallet</Text>
          </TouchableOpacity>
        </View>
      );
    }

    switch (activeTab) {
      case 'Home':
        return <HomeScreen />;
      case 'Earn':
        return <EarnScreen />;
      case 'NFTs':
        return <NFTsScreen />;
      case 'Apps':
        return <AppsScreen />;
      case 'Activity':
        return <ActivityScreen />;
      case 'Settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const renderTabBar = () => {
    if (!hasWallet) return null;

    const tabs = [
      { key: 'Home', icon: HomeIcon, label: 'Home' },
      { key: 'Earn', icon: EarnIcon, label: 'Earn' },
      { key: 'NFTs', icon: NFTsIcon, label: 'NFTs' },
      { key: 'Apps', icon: AppsIcon, label: 'Apps' },
      { key: 'Activity', icon: ActivityIcon, label: 'Activity' },
      { key: 'Settings', icon: SettingsIcon, label: 'Settings' },
    ];

    return (
      <Animated.View style={[styles.tabBar, {
        opacity: tabBarOpacity,
        backgroundColor: theme.backgroundTabBar,
        borderTopColor: theme.borderWeak
      }]}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.key;
          const isPressed = pressedTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => handleTabPress(tab.key)}
            >
              <Animated.View
                style={[
                  styles.tabContent,
                  isActive && [styles.tabContentActive, { backgroundColor: theme.backgroundPrimary }],
                  {
                    transform: [{ scale: isPressed ? 0.95 : 1 }]
                  }
                ]}
              >
                <IconComponent
                  size={20}
                  color={isActive ? theme.contentPrimary : theme.contentSecondary}
                />
              </Animated.View>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
    );
  };

    return (
    <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
      {renderContent()}
      <View style={styles.tabBarContainer}>
        {renderTabBar()}
      </View>
      <StatusBar style={theme.statusBarStyle} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#060d14', // --color-background-primary
  },

  onboardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  onboardLogo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  onboardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fafcff', // --color-content-primary
    marginBottom: 16,
    textAlign: 'center',
  },
  onboardSubtitle: {
    fontSize: 18,
    color: '#fafcffa3', // --color-content-secondary
    marginBottom: 48,
    textAlign: 'center',
  },
  onboardButton: {
    backgroundColor: '#47e299', // --color-action-primary
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  onboardButtonText: {
    color: '#060d14', // --color-content-inverse-primary
    fontSize: 18,
    fontWeight: '600',
  },
  onboardButtonSecondary: {
    backgroundColor: 'transparent',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4da2ff', // --color-border-weak
    width: '100%',
    alignItems: 'center',
  },
  onboardButtonSecondaryText: {
    color: '#fafcffa3', // --color-content-secondary
    fontSize: 18,
    fontWeight: '600',
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(18, 94, 176, 0.95)', // --color-page-tab-bar with transparency
    borderTopWidth: 1,
    borderTopColor: 'rgba(8, 45, 87, 0.3)', // --color-border-weak with transparency
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 15,
    backdropFilter: 'blur(20px)', // This will work on iOS
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  tabActive: {
    // Active tab styling
  },
  tabContent: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabContentActive: {
    backgroundColor: '#060d14', // --color-background-primary
    shadowColor: '#000',
    borderRadius: 70,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default function App() {
  return (
    <ThemeProvider>
      <WalletProvider>
        <AppContent />
      </WalletProvider>
    </ThemeProvider>
  );
}
