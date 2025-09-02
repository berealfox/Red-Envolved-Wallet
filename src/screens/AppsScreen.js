import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import { SearchIcon } from "../components/icons";

const AppsScreen = () => {
  const { theme } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchText, setSearchText] = useState("");

  const filters = ["All", "Walrus", "Finance", "Play", "Bridge"];

  const apps = [
    {
      name: "Walrus Staking",
      description: "Stake your WAL tokens to help grow the Walrus network",
      icon: require("../../assets/walrus_staking.png"),
      badge: "walrus",
    },
    {
      name: "Tusky",
      description: "Own your data with web3 storage on Walrus",
      icon: require("../../assets/tusky__2_.png"),
      badge: "walrus",
    },
    {
      name: "Aftermath Finance",
      description: "The all-in-one DEX on Sui, featuring a fully on-chain",
      icon: require("../../assets/Aftermath-Finance.png"),
    },
  ];

  return (
    <>
      <View
        style={[styles.header, { backgroundColor: theme.backgroundTertiary }]}
      >
        {/* Search Bar */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: theme.backgroundPrimary },
          ]}
        >
          <SearchIcon size={20} color={theme.contentSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.contentPrimary }]}
            placeholder="Search apps"
            placeholderTextColor={theme.contentSecondary}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
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
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
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
