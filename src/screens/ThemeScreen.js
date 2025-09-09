import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../theme/ThemeContext';
import Svg, { Path, Circle } from 'react-native-svg';

// Icon Components
const BackIcon = ({ size = 24, color = "#000" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.42z" fill={color}/>
  </Svg>
);

const RadioButton = ({ selected, color = "#4ade80" }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Circle cx="10" cy="10" r="9" stroke={selected ? color : "#666"} strokeWidth="2" fill="none"/>
    {selected && <Circle cx="10" cy="10" r="4" fill={color}/>}
  </Svg>
);

const ThemeScreen = ({ onBack }) => {
  const { theme, isDarkTheme, toggleTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState('Red Envelope');
  const [selectedMode, setSelectedMode] = useState(isDarkTheme ? 'Dark' : 'Light');

  // Sync local state with theme context
  useEffect(() => {
    setSelectedMode(isDarkTheme ? 'Dark' : 'Light');
  }, [isDarkTheme]);

  // Define theme variations using app colors
  const themeOptions = [
    {
      id: 'red-envelope',
      name: 'Red Envelope',
      color: theme.backgroundAccent, // Dynamic theme accent color
    },
  ];

  const handleThemeSelect = (themeName) => {
    setSelectedTheme(themeName);
  };

  const handleModeSelect = (themeName, mode) => {
    if (selectedTheme === themeName) {
      setSelectedMode(mode);

      // Apply the theme change
      const shouldBeDark = mode === 'Dark';
      if (shouldBeDark !== isDarkTheme) {
        toggleTheme();
      }
    } else {
      setSelectedTheme(themeName);
      setSelectedMode(mode);

      // Apply the theme change
      const shouldBeDark = mode === 'Dark';
      if (shouldBeDark !== isDarkTheme) {
        toggleTheme();
      }
    }
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
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 20,
    },
    themeItem: {
      backgroundColor: theme.backgroundSecondary,
      borderRadius: 16,
      padding: 20,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    selectedThemeItem: {
      backgroundColor: theme.backgroundSecondary, // App's darker background color
    },
    themeColorCircle: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 16,
    },
    themeInfo: {
      flex: 1,
    },
    themeName: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.contentPrimary,
      marginBottom: 4,
    },
    selectedThemeName: {
      color: '#ffffff',
    },
    modeOptions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    modeOption: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    modeText: {
      fontSize: 14,
      color: theme.contentSecondary,
      fontWeight: '500',
    },
    selectedModeText: {
      color: '#ffffff',
    },
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <BackIcon size={24} color={theme.contentPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Theme</Text>
      </View>

      {/* Theme Options */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {themeOptions.map((themeOption) => {
          const isSelected = selectedTheme === themeOption.name;
          return (
            <TouchableOpacity
              key={themeOption.id}
              style={[
                styles.themeItem,
                isSelected && styles.selectedThemeItem
              ]}
              onPress={() => handleThemeSelect(themeOption.name)}
            >
              {/* Theme Color Circle */}
              <View style={[
                styles.themeColorCircle,
                { backgroundColor: themeOption.color }
              ]} />

              {/* Theme Info */}
              <View style={styles.themeInfo}>
                <Text style={[
                  styles.themeName,
                  isSelected && styles.selectedThemeName
                ]}>
                  {themeOption.name}
                </Text>
              </View>

              {/* Dark/Light Mode Options */}
              <View style={styles.modeOptions}>
                <TouchableOpacity
                  style={styles.modeOption}
                  onPress={() => handleModeSelect(themeOption.name, 'Dark')}
                >
                  <RadioButton
                    selected={isSelected && selectedMode === 'Dark'}
                    color="#4ade80"
                  />
                  <Text style={[
                    styles.modeText,
                    isSelected && styles.selectedModeText
                  ]}>
                    Dark
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modeOption}
                  onPress={() => handleModeSelect(themeOption.name, 'Light')}
                >
                  <RadioButton
                    selected={isSelected && selectedMode === 'Light'}
                    color="#4ade80"
                  />
                  <Text style={[
                    styles.modeText,
                    isSelected && styles.selectedModeText
                  ]}>
                    Light
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default ThemeScreen;
