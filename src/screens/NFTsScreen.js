import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useTheme } from "../theme/ThemeContext";
import Svg, { Path, Circle } from 'react-native-svg';
import SuiIcon from '../components/icons/SuiIcon';

// Icons
const MenuDotsIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="5" cy="12" r="2" fill={color}/>
    <Circle cx="12" cy="12" r="2" fill={color}/>
    <Circle cx="19" cy="12" r="2" fill={color}/>
  </Svg>
);

const BackIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" fill={color}/>
  </Svg>
);



const NFTsScreen = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('NFTs');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showHideAssets, setShowHideAssets] = useState(false);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      padding: 16, // Add padding for floating tab bar
      paddingTop: 20,
      paddingBottom: 10,
    },
    assetsCard: {
      flex: 1,
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 20,
      padding: 25,
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
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      minWidth: 40,
      alignItems: 'center',
      justifyContent: 'center',
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
    // Dropdown Menu Styles
    dropdownOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    },
    dropdownMenu: {
      position: 'absolute',
      top: 60,
      right: 16,
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 12,
      paddingVertical: 8,
      minWidth: 150,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
      zIndex: 1001,
    },
    dropdownItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      marginHorizontal: 4,
    },
    dropdownItemText: {
      fontSize: 16,
      color: theme.contentPrimary,
      fontWeight: '500',
    },
    // Hide Assets Modal Styles
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    hideAssetsContainer: {
      flex: 1,
      backgroundColor: theme.backgroundPrimary,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    },
    hideAssetsHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 20,
      paddingTop: 40,
    },
    hideAssetsTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.contentPrimary,
    },
    doneButton: {
      backgroundColor: '#ff6b35',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
    },
    doneButtonText: {
      color: '#ffffff',
      fontSize: 16,
      fontWeight: '600',
    },
    hideAssetsContent: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
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

  const handleMenuPress = () => {
    setShowDropdown(!showDropdown);
  };

  const handleHideAssets = () => {
    setShowDropdown(false);
    setShowHideAssets(true);
  };

  const handleCloseHideAssets = () => {
    setShowHideAssets(false);
  };

  const renderDropdownMenu = () => {
    if (!showDropdown) return null;

    return (
      <>
        <TouchableOpacity
          style={styles.dropdownOverlay}
          onPress={() => setShowDropdown(false)}
          activeOpacity={1}
        />
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={handleHideAssets}
          >
            <Text style={styles.dropdownItemText}>Hide Assets</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderHideAssetsModal = () => {
    return (
      <Modal
        visible={showHideAssets}
        animationType="slide"
        presentationStyle="fullScreen"
        statusBarTranslucent={true}
      >
        <View style={styles.hideAssetsContainer}>
          {/* Header */}
          <View style={styles.hideAssetsHeader}>
            <Text style={styles.hideAssetsTitle}>Hide Assets</Text>
            <TouchableOpacity
              style={styles.doneButton}
              onPress={handleCloseHideAssets}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.hideAssetsContent}>
            <View style={styles.emptyIconContainer}>
              <SuiIcon size={80} color={theme.backgroundAccent} />
            </View>

            <Text style={styles.emptyTitle}>No NFTs owned</Text>
            <Text style={styles.emptySubtitle}>
              Digital assets that you purchase or receive will be displayed here.
            </Text>

            <TouchableOpacity style={styles.browseButton}>
              <Text style={styles.browseButtonText}>Browse marketplace</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.assetsCard}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Assets</Text>
          <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
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

      {/* Dropdown Menu */}
      {renderDropdownMenu()}

      {/* Hide Assets Modal */}
      {renderHideAssetsModal()}
    </View>
  );
};

export default NFTsScreen;
