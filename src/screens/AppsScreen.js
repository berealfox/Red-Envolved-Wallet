import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { SearchIcon } from "../components/icons";
import Svg, { Path } from 'react-native-svg';

// Icon Components
const CloseIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill={color}/>
  </Svg>
);

const ArrowRightIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" fill={color}/>
  </Svg>
);

const AppsScreen = () => {
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [modalSearchText, setModalSearchText] = useState("");

  const filters = ["All", "Walrus", "Finance", "Play", "Bridge"];

  const apps = [
    {
      name: "Walrus Staking",
      description: "Stake your WAL tokens to help grow the Walrus network",
      icon: require("../../assets/walrus_staking.png"),
      badge: "walrus",
      url: "stake-wal.wal.app",
    },
    {
      name: "Tusky",
      description: "Own your data with web3 storage on Walrus",
      icon: require("../../assets/tusky__2_.png"),
      badge: "walrus",
      url: "app.tusky.io",
    },
    {
      name: "Aftermath Finance",
      description: "The all-in-one DEX on Sui, featuring a fully on-chain",
      icon: require("../../assets/Aftermath-Finance.png"),
      url: "aftermath.finance",
    },
  ];

  // Filter apps based on search text
  const getFilteredApps = (searchQuery) => {
    if (!searchQuery.trim()) return apps;
    return apps.filter(app =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleSearchPress = () => {
    setShowSearchModal(true);
  };

  const handleAppPress = (app) => {
    // Here you can implement navigation or opening external links
    console.log(`Opening app: ${app.name} at ${app.url}`);
    // For now, just close the modal
    setShowSearchModal(false);
  };

  return (
    <>
      <View
        style={[styles.header, { backgroundColor: theme.backgroundTertiary }]}
      >
        {/* Search Bar */}
        <TouchableOpacity
          style={[
            styles.searchContainer,
            { backgroundColor: theme.backgroundPrimary },
          ]}
          onPress={handleSearchPress}
        >
          <SearchIcon size={20} color={theme.contentSecondary} />
          <Text
            style={[styles.searchPlaceholder, { color: theme.contentSecondary }]}
          >
            Search apps
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}
      >
        {/* Featured Section */}
        <View
          style={[
            styles.featuredSection,
            { backgroundColor: theme.backgroundTertiary },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>
            Featured
          </Text>

          {/* Coinbase Promo Banner */}
          <View
            style={[
              styles.promoBanner,
              { backgroundColor: theme.backgroundAccent },
            ]}
          >
            <View style={styles.promoHeader}>
              <Text style={styles.promoBrand}>coinbase</Text>
              <Text style={styles.promoBadge}>Limited time</Text>
            </View>

            <View style={styles.promoContent}>
              <View style={styles.promoIcon}>
                <Text style={styles.dollarIcon}>$</Text>
              </View>
              <View style={styles.promoText}>
                <Text style={styles.promoMainText}>
                  Buy and sell USDC with{" "}
                  <Text style={styles.promoHighlight}>no fees</Text>
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.promoButton,
                { backgroundColor: theme.backgroundAccent },
              ]}
            >
              <Text style={styles.promoButtonText}>Buy and sell USDC</Text>
              <View style={styles.promoToggle} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Apps Section */}
        <View
          style={[
            styles.appsSection,
            { backgroundColor: theme.backgroundTertiary },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: theme.contentPrimary }]}>
            Apps
          </Text>

          {/* Filter Buttons */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
          >
            {filters.map((filter, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.filterButton,
                  {backgroundColor: theme.backgroundSecondary},
                  selectedFilter === filter && {
                    backgroundColor: theme.backgroundAccent,
                  },
                ]}
                onPress={() => setSelectedFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    {
                      color:
                        selectedFilter === filter
                          ? theme.contentPrimary
                          : theme.contentSecondary,
                    },
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Apps List */}
          <View style={styles.appsList}>
            {apps.map((app, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.appItem,
                  { backgroundColor: theme.backgroundPrimary },
                ]}
              >
                <View style={styles.appIconContainer}>
                  <Image
                    source={app.icon}
                    style={styles.appIcon}
                    resizeMode="contain"
                  />
                  {app.badge && (
                    <View style={styles.appBadge}>
                      <Text style={styles.badgeText}>W</Text>
                    </View>
                  )}
                </View>
                <View style={styles.appInfo}>
                  <Text
                    style={[styles.appName, { color: theme.contentPrimary }]}
                  >
                    {app.name}
                  </Text>
                  <Text
                    style={[
                      styles.appDescription,
                      { color: theme.contentSecondary },
                    ]}
                  >
                    {app.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Search Modal */}
      <Modal
        visible={showSearchModal}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <View style={[styles.modalContainer, { backgroundColor: theme.backgroundPrimary }]}>
          {/* Modal Header */}
          <View style={[styles.modalHeader, { backgroundColor: theme.backgroundPrimary }]}>
            <View style={[styles.modalSearchContainer, { backgroundColor: theme.backgroundSecondary }]}>
              <SearchIcon size={20} color={theme.contentSecondary} />
              <TextInput
                style={[styles.modalSearchInput, { color: theme.contentPrimary }]}
                placeholder="Search apps"
                placeholderTextColor={theme.contentSecondary}
                value={modalSearchText}
                onChangeText={setModalSearchText}
                autoFocus={true}
              />
              {modalSearchText.length > 0 && (
                <TouchableOpacity onPress={() => setModalSearchText("")}>
                  <CloseIcon size={20} color={theme.contentSecondary} />
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowSearchModal(false)}
            >
              <Text style={[styles.cancelText, { color: theme.contentSecondary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>

          {/* Search Results */}
          <ScrollView style={styles.resultsContainer}>
            {modalSearchText.length > 0 && (
              <>
                <Text style={[styles.resultsTitle, { color: theme.contentPrimary }]}>Results</Text>
                {getFilteredApps(modalSearchText).map((app, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.resultItem, { backgroundColor: theme.backgroundSecondary }]}
                    onPress={() => handleAppPress(app)}
                  >
                    <View style={styles.resultIconContainer}>
                      <Image
                        source={app.icon}
                        style={styles.resultIcon}
                        resizeMode="contain"
                      />
                      {app.badge && (
                        <View style={styles.resultBadge}>
                          <Text style={styles.resultBadgeText}>W</Text>
                        </View>
                      )}
                    </View>
                    <View style={styles.resultInfo}>
                      <Text style={[styles.resultName, { color: theme.contentPrimary }]}>
                        {app.name}
                      </Text>
                      <Text style={[styles.resultUrl, { color: theme.contentSecondary }]}>
                        {app.url}
                      </Text>
                    </View>
                    <ArrowRightIcon size={20} color={theme.contentSecondary} />
                  </TouchableOpacity>
                ))}
                {getFilteredApps(modalSearchText).length === 0 && (
                  <Text style={[styles.noResults, { color: theme.contentSecondary }]}>
                    No apps found
                  </Text>
                )}
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
  },
  bounder: {
    backgroundColor: "#060d14",
    borderRadius: 20,
    borderWidth: 1,
    padding: 16,
    borderColor: "black",
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 20,
    margin: 12,
    marginTop: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  searchPlaceholder: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    paddingTop: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  modalSearchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
  },
  modalSearchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
  cancelButton: {
    paddingHorizontal: 8,
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '500',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 8,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  resultIconContainer: {
    position: 'relative',
    marginRight: 16,
  },
  resultIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
  },
  resultBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#8b5cf6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultUrl: {
    fontSize: 14,
    opacity: 0.8,
  },
  noResults: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 40,
  },
  featuredSection: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "black",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  promoBanner: {
    borderRadius: 12,
    padding: 16,
  },
  promoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  promoBrand: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  promoBadge: {
    color: "#ffffff",
    fontSize: 12,
  },
  promoContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  promoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  dollarIcon: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4da2ff",
  },
  promoText: {
    flex: 1,
  },
  promoMainText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  promoHighlight: {
    color: "#47e299",
  },
  promoButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  promoButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  promoToggle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#e2e8f0",
  },
  appsSection: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "black",
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: "#051b33",
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  appsList: {
    gap: 12,
  },
  appItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
  },
  appIconContainer: {
    position: "relative",
    marginRight: 12,
  },
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  appBadge: {
    position: "absolute",
    bottom: -4,
    right: -4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#8b5cf6",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  appDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default AppsScreen;
