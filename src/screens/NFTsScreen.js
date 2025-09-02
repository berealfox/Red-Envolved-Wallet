import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";

const NFTsScreen = () => {
  const { theme } = useTheme();
  
  const mockNFTs = [
    {
      id: 1,
      name: "Cute #0131",
      collection: "Cute",
      image: "😺",
      Value: "0.35 SUI",
    },
    {
      id: 2,
      name: "Puse #1996",
      collection: "Puse",
      image: "😺",
      Value: "0.35 SUI",
    },
    {
      id: 3,
      name: "Cute #2025",
      collection: "Cute",
      image: "😺",
      Value: "0.35 SUI",
    },
    {
      id: 4,
      name: "Cute #Apollo",
      collection: "Cute",
      image: "😺",
      Value: "0.5 SUI",
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      padding: 16,
      paddingBottom: 100, // Add padding for floating tab bar
    },
    bounder:{
      backgroundColor: theme.backgroundTertiary,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: "black",
      padding: 16,
    }, 
    header: {
      alignItems: "center",
      marginBottom: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.contentPrimary,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      color: theme.contentSecondary,
      textAlign: "center",
    },
    nftGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
    },
    nftCard: {
      width: "48%",
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      alignItems: "center",
    },
    nftImage: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: theme.borderWeak,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 12,
    },
    nftEmoji: {
      fontSize: 40,
    },
    nftInfo: {
      alignItems: "center",
    },
    nftName: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.contentPrimary,
      textAlign: "center",
      marginBottom: 4,
    },
    nftCollection: {
      fontSize: 12,
      color: theme.contentSecondary,
      marginBottom: 4,
    },
    nftFloor: {
      fontSize: 12,
      color: theme.backgroundAccent,
      fontWeight: "500",
    },
    emptyState: {
      alignItems: "center",
      marginTop: 60,
    },
    emptyEmoji: {
      fontSize: 64,
      marginBottom: 16,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.contentPrimary,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      color: theme.contentSecondary,
      textAlign: "center",
      marginBottom: 24,
      paddingHorizontal: 20,
    },
    browseButton: {
      backgroundColor: theme.backgroundAccent,
      paddingHorizontal: 24,
      paddingVertical: 12,
      borderRadius: 8,
    },
    browseButtonText: {
      color: theme.contentInversePrimary,
      fontSize: 16,
      fontWeight: "600",
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bounder}>
        <View style={styles.header}>
          <Text style={styles.title}>Assets</Text>
          <Text style={styles.subtitle}>Your digital collections</Text>
        </View>

        {mockNFTs.length > 0 ? (
          <View style={styles.nftGrid}>
            {mockNFTs.map((nft) => (
              <TouchableOpacity key={nft.id} style={styles.nftCard}>
                <View style={styles.nftImage}>
                  <Text style={styles.nftEmoji}>{nft.image}</Text>
                </View>
                <View style={styles.nftInfo}>
                  <Text style={styles.nftName}>{nft.name}</Text>
                  <Text style={styles.nftCollection}>{nft.collection}</Text>
                  <Text style={styles.nftFloor}>Vlaue: {nft.Value}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🎨</Text>
            <Text style={styles.emptyTitle}>No NFTs yet</Text>
            <Text style={styles.emptySubtitle}>
              Start collecting digital art and collectibles on Sui
            </Text>
            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse Marketplace</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default NFTsScreen;
