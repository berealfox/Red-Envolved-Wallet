import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { createCustomTabBarStyles } from '../styles/CustomTabBar.styles';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const styles = createCustomTabBarStyles();
  const tabConfig = [
    { key: 'Home', icon: '🏠', label: 'Home' },
    { key: 'Earn', icon: '💰', label: 'Earn' },
    { key: 'NFTs', icon: '🎨', label: 'NFTs' },
    { key: 'Apps', icon: '📱', label: 'Apps' },
    { key: 'Activity', icon: '📊', label: 'Activity' },
    { key: 'Settings', icon: '⚙️', label: 'Settings' },
  ];

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const tab = tabConfig.find(t => t.key === route.name);

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            <View style={[styles.tabContent, isFocused && styles.tabContentActive]}>
              <Text style={styles.tabIcon}>{tab?.icon}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};


export default CustomTabBar;