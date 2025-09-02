import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomTabBar = ({ state, descriptors, navigation }) => {
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

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#1F2937',
    borderTopWidth: 1,
    borderTopColor: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  tabContentActive: {
    backgroundColor: '#3B82F6',
  },
  tabIcon: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});

export default CustomTabBar; 