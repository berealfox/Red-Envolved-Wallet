import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import Svg, { Path, Circle } from 'react-native-svg';
import SuiIcon from '../components/icons/SuiIcon';

// Icons
const MenuDotsIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="5" r="2" fill={color}/>
    <Circle cx="12" cy="12" r="2" fill={color}/>
    <Circle cx="12" cy="19" r="2" fill={color}/>
  </Svg>
);



const NFTsScreen = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('NFTs');

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      padding: 16,
      paddingBottom: 100, // Add padding for floating tab bar
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: theme.contentPrimary,
    },
    menuButton: {
      backgroundColor: theme.backgroundAccent,
      borderRadius: 20,
      padding: 8,
    },
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: theme.backgroundInverse,
      borderRadius: 25,
      padding: 4,
      marginBottom: 40,
    },
    tab: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 20,
      alignItems: 'center',
    },
    activeTab: {
      backgroundColor: theme.backgroundAccent,
    },
    tabText: {
      fontSize: 16,
      fontWeight: '600',
    },
    activeTabText: {
      color: theme.contentInversePrimary,
    },
    inactiveTabText: {
      color: theme.contentSecondary,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
      marginTop: 60,
    },
    emptyIconContainer: {
      position: 'relative',
      marginBottom: 24,
    },
    coinOverlay: {
      position: 'absolute',
      bottom: -8,
      right: -8,
      width: 32,
      height: 32,
      backgroundColor: '#FFD700',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: theme.backgroundPrimary,
    },
    coinText: {
      color: '#000',
      fontSize: 14,
      fontWeight: 'bold',
    },
    emptyTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: theme.contentPrimary,
      marginBottom: 12,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 16,
      color: theme.contentSecondary,
      textAlign: "center",
      marginBottom: 32,
      lineHeight: 22,
    },
    browseButton: {
      backgroundColor: '#47e299', // Green button
      paddingHorizontal: 32,
      paddingVertical: 16,
      borderRadius: 25,
    },
    browseButtonText: {
      color: '#060d14',
      fontSize: 16,
      fontWeight: "600",
    },
  });

  const getEmptyStateContent = () => {
    if (activeTab === 'NFTs') {
      return {
        title: 'No NFTs owned',
        subtitle: 'Digital assets that you purchase or receive will be displayed here.',
      };
    } else {
      return {
        title: 'No NFTs in kiosks',
        subtitle: 'Digital kiosk assets that you purchase or receive will be displayed here.',
      };
    }
  };

  const emptyContent = getEmptyStateContent();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Assets</Text>
        <TouchableOpacity style={styles.menuButton}>
          <MenuDotsIcon size={20} color={theme.contentInversePrimary} />
        </TouchableOpacity>
      </View>

      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'NFTs' && styles.activeTab]}
          onPress={() => setActiveTab('NFTs')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'NFTs' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            NFTs
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Kiosks' && styles.activeTab]}
          onPress={() => setActiveTab('Kiosks')}
        >
          <Text style={[
            styles.tabText,
            activeTab === 'Kiosks' ? styles.activeTabText : styles.inactiveTabText
          ]}>
            Kiosks
          </Text>
        </TouchableOpacity>
      </View>

      {/* Empty State */}
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconContainer}>
          <SuiIcon size={80} color={theme.backgroundAccent} />
        </View>

        <Text style={styles.emptyTitle}>{emptyContent.title}</Text>
        <Text style={styles.emptySubtitle}>{emptyContent.subtitle}</Text>

        <TouchableOpacity style={styles.browseButton}>
          <Text style={styles.browseButtonText}>Browse marketplace</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NFTsScreen;
