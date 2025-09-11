import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import { createNetworkScreenStyles } from '../styles/NetworkScreen.styles';
import Svg, { Path } from 'react-native-svg';

// Icon Components
const BackIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" fill={color}/>
  </Svg>
);

const CheckIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" fill={color}/>
  </Svg>
);

const NetworkScreen = ({ onBack }) => {
  const { theme } = useTheme();
  const styles = createNetworkScreenStyles(theme);
  const [selectedNetwork, setSelectedNetwork] = useState('Mainnet');

  const networks = [
    { id: 'mainnet', name: 'Mainnet' },
    { id: 'testnet', name: 'Testnet' },
    { id: 'devnet', name: 'Devnet' },
  ];

  const handleNetworkSelect = (networkName) => {
    setSelectedNetwork(networkName);
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon size={24} color={theme.contentPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Network</Text>
      </View>

      {/* Network Options */}
      <View style={styles.content}>
        {networks.map((network) => {
          const isSelected = selectedNetwork === network.name;
          return (
            <TouchableOpacity
              key={network.id}
              style={[
                styles.networkItem,
                isSelected && styles.selectedNetworkItem
              ]}
              onPress={() => handleNetworkSelect(network.name)}
            >
              <Text style={[
                styles.networkName,
                isSelected && styles.selectedNetworkName
              ]}>
                {network.name}
              </Text>

              <View style={[
                styles.checkIcon,
                !isSelected && styles.hiddenCheck
              ]}>
                <CheckIcon
                  size={24}
                  color={isSelected ? "#4ade80" : "transparent"}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default NetworkScreen;
