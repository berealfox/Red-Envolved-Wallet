import React from "react";
import {
  View,
  Text,
  StyleSheet,
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
import Svg, { Path, G } from 'react-native-svg';


const GoogleGIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </Svg>
);

const HomeScreen = ({ walletAddress, walletBalance, recentTxs }) => {
  const { theme, toggleTheme } = useTheme();
  
  const handleManageAccount = () => {
    console.log("Manage account pressed");
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
              source={require("../../assets/favicon.png")}
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
        <View style={[styles.promoBanner, { backgroundColor: theme.backgroundAccent }]}>
          <Text style={styles.promoIconText}>C</Text>
          <View style={styles.promoContent}>
            <Text style={[styles.promoText, { color: theme.contentPrimary }]}>
              Buy and sell USDC with no fees for a limited time
            </Text>
          </View>
        </View>

        <View style={[styles.coinStackSection, { backgroundColor: theme.backgroundInverse }]}>
          <View style={styles.coinStackHeader}>
            <View style={styles.coinStackIcon}>
              <SuiIcon size={70} background={false} shadow={true} />
            </View>
            <Text style={[styles.coinStackTitle, { color: theme.contentPrimary }]}>
              To send transactions on the Sui network, you need SUI in your
              wallet.
            </Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.actionSecondary }]}>
              <BuySellIcon size={20} color={theme.contentPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.contentPrimary }]}>Buy/Sell</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.actionSecondary }]}>
              <ReceiveIcon size={20} color={theme.contentPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.contentPrimary }]}>Receive</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonDisabled, { backgroundColor: theme.actionSecondary }]}
            >
              <SendIcon size={20} color={theme.contentPrimary} />
              <Text style={[styles.actionButtonText, { color: theme.contentPrimary }]}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.actionButtonDisabled, { backgroundColor: theme.actionSecondary }]}
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
          <TouchableOpacity style={[styles.searchButton, { backgroundColor: theme.actionSecondary }]}>
            <SearchIcon size={16} color={theme.contentPrimary} />
            <Text style={[styles.searchButtonText, { color: theme.contentPrimary }]}>Search and pin coins</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#082d57", // --color-background-primary
    padding: 16,
    marginBottomBottom: 100, // Add padding for floating tab bar
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  logoContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  logoButton: {
    width: 30,
    height: 30,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  manageAccountButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black", // --color-action-secondary
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  manageAccountText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fafcff", // --color-content-primary
    marginRight: 8,
  },
  googleIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  googleIconText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4da2ff",
  },
  scrollContainer: {
    flex: 1,
  },
  promoBanner: {
    backgroundColor: "#4da2ff", // --color-background-accent
    borderRadius: 12,
    padding: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  promoIconText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  promoContent: {
    flex: 1,
    marginLeft: 12,
  },
  promoText: {
    fontSize: 14,
    color: "#fafcffa3", // --color-content-primary
    fontWeight: "500",
  },
  coinStackSection: {
    backgroundColor: "#060d14", // --color-background-inverse
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
    padding: 16,
    marginBottom: 16,
  },
  coinStackHeader: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  coinStackIcon: {
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 18,
  },
  coinStackTitle: {
    fontSize: 16,
    color: "#fafcff", // --color-content-primary
    flex: 1,
    lineHeight: 22,
  },
  actionButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
  actionButton: {
    flex: 1,
    minWidth: "30%",
    backgroundColor: "#125eb0a3", // --color-action-secondary
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    maxHeight: "53%",
    gap: 8,
  },
  actionButtonDisabled: {
    opacity: 0.4,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fafcff", // --color-content-primary
  },
  noCoinsSection: {
    backgroundColor: "#060d14", // --color-background-inverse
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "black",
    padding: 16,
    marginBottom: 16,
  },
  noCoinsHeader: {
    alignItems: "center",
    marginBottom: 16,
  },
  noCoinsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fafcff", // --color-content-primary
    marginBottom: 12,
    textAlign: "center",
  },
  noCoinsSubtitle: {
    fontSize: 14,
    color: "#fafcffa3", // --color-content-secondary
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: "#125eb0a3", // --color-action-secondary
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  searchButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fafcff", // --color-content-primary
  },
});

export default HomeScreen;
