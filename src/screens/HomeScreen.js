import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  BuySellIcon,
  ReceiveIcon,
  SendIcon,
  SwapIcon,
  SearchIcon,
  SuiIcon,
} from "../components/icons";
import { useTheme } from "../theme/ThemeContext";
import { useWallet } from "../context/WalletContext";
import { createHomeScreenStyles } from "../styles/HomeScreen.styles";
import SendScreen from "./SendScreen";
import ReceiveScreen from "./ReceiveScreen";
import SwapScreen from "./SwapScreen";
import SearchCoinsScreen from "./SearchCoinsScreen";
import ManageAccountsScreen from "./ManageAccountsScreen";
import BuySellModal from "../components/BuySellModal";
import SendMethodModal from "../components/SendMethodModal";
import Svg, { Path, G } from 'react-native-svg';


const GoogleGIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </Svg>
);

const HomeScreen = ({ navigation }) => {
  const {
    theme,
    toggleTheme,
    rewardPercentage,
    updateRewardPercentage,
    rewardToColor
  } = useTheme();
  const {
    walletAddress,
    balances,
    recentTxs,
    formatBalance,
    getTotalValue,
    refreshWalletData,
    isLoading
  } = useWallet();
  const styles = createHomeScreenStyles(theme);

  const [showSendScreen, setShowSendScreen] = useState(false);
  const [showReceiveScreen, setShowReceiveScreen] = useState(false);
  const [showSwapScreen, setShowSwapScreen] = useState(false);
  const [showSearchCoins, setShowSearchCoins] = useState(false);
  const [showManageAccounts, setShowManageAccounts] = useState(false);
  const [showBuySellModal, setShowBuySellModal] = useState(false);
  const [showSendMethodModal, setShowSendMethodModal] = useState(false);

  const handleManageAccount = () => {
    setShowManageAccounts(true);
  };

  const handleSendMethodSelect = (method) => {
    // Close the modal and show the SendScreen
    setShowSendMethodModal(false);
    setShowSendScreen(true);
  };

  const handleLogoPress = () => {
    toggleTheme();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
      <View style={styles.topButtons}>
        <TouchableOpacity style={[styles.logoContainer, { backgroundColor: theme.backgroundInverse }]} onPress={handleLogoPress}>
          <View style={styles.logoButton}>
            <Image
              source={require("../../assets/red-wallet-logo.jpg")}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.manageAccountButton, { backgroundColor: theme.backgroundInverse }]}
          onPress={handleManageAccount}
        >
          <Text style={[styles.manageAccountText, { color: theme.contentPrimary }]}>bearbeast131@gmail.com</Text>
          <View style={styles.googleIcon}>
            <GoogleGIcon size={24} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollContainer}>

        <View style={[styles.coinStackSection, { backgroundColor: theme.backgroundInverse }]}>
          <View style={styles.coinStackHeader}>
            <View style={styles.coinStackIcon}>
              <SuiIcon size={70} background={false} shadow={true} />
            </View>
            <Text style={[styles.coinStackTitle, { color: theme.contentPrimary }]}>
              To send transactions on the AQY network, you need AQY in your
              wallet.
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.actionSecondary }]}
              onPress={() => setShowBuySellModal(true)}
            >
              <BuySellIcon size={20} color={theme.contentPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.contentPrimary }]}>Buy/Sell</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.actionSecondary }]}
              onPress={() => setShowReceiveScreen(true)}
            >
              <ReceiveIcon size={20} color={theme.contentPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.contentPrimary }]}>Receive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.actionSecondary }]}
              onPress={() => setShowSendMethodModal(true)}
            >
              <SendIcon size={20} color={theme.contentPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.contentPrimary }]}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.actionSecondary }]}
              onPress={() => setShowSwapScreen(true)}
            >
              <SwapIcon size={20} color={theme.contentPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.contentPrimary }]}>Swap</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.noCoinsSection, { backgroundColor: theme.backgroundInverse }]}>
          <Text style={[styles.noCoinsTitle, { color: theme.contentPrimary }]}>No coins</Text>
          <Text style={[styles.noCoinsSubtitle, { color: theme.contentSecondary }]}>
            Once you have purchased or received coins, they will be listed here.
            Coins of interest can also be pinned.
          </Text>
          <TouchableOpacity
            style={[styles.searchButton, { backgroundColor: theme.actionSecondary }]}
            onPress={() => setShowSearchCoins(true)}
          >
            <SearchIcon size={16} color={theme.contentPrimary} />
            <Text style={[styles.searchButtonText, { color: theme.contentPrimary }]}>Search and manage coins</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>

      {/* Send Screen Modal */}
      {showSendScreen && (
        <View style={styles.modalOverlay}>
          <SendScreen navigation={{ goBack: () => setShowSendScreen(false) }} />
        </View>
      )}

      {/* Receive Screen Modal */}
      {showReceiveScreen && (
        <View style={styles.modalOverlay}>
          <ReceiveScreen navigation={{ goBack: () => setShowReceiveScreen(false) }} />
        </View>
      )}

      {/* Swap Screen Modal */}
      {showSwapScreen && (
        <View style={styles.modalOverlay}>
          <SwapScreen navigation={{ goBack: () => setShowSwapScreen(false) }} />
        </View>
      )}

      {/* Search Coins Screen Modal */}
      {showSearchCoins && (
        <View style={styles.modalOverlay}>
          <SearchCoinsScreen onBack={() => setShowSearchCoins(false)} />
        </View>
      )}

      {/* Manage Accounts Screen Modal */}
      {showManageAccounts && (
        <View style={styles.modalOverlay}>
          <ManageAccountsScreen onBack={() => setShowManageAccounts(false)} />
        </View>
      )}

      {/* Buy/Sell Modal */}
      <BuySellModal
        visible={showBuySellModal}
        onClose={() => setShowBuySellModal(false)}
      />

      {/* Send Method Modal */}
      <SendMethodModal
        visible={showSendMethodModal}
        onClose={() => setShowSendMethodModal(false)}
        onSelectMethod={handleSendMethodSelect}
      />
    </View>
  );
};


export default HomeScreen;
