import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Reward % to color mapping function (from PROJECT.md)
export const rewardToColor = (pct) => {
  const clamped = Math.min(100, Math.max(3, pct));

  if (clamped <= 50) {
    // pink (350°, 100%, 90%) → red (0°, 100%, 50%)
    const t = (clamped - 3) / (50 - 3);

    // Handle hue wraparound (350° to 0°)
    const hue = 350 + (360 + 0 - 350) * t;
    const finalHue = hue >= 360 ? hue - 360 : hue;

    const sat = 100;
    const light = 90 + (50 - 90) * t;

    return `hsl(${finalHue}, ${sat}%, ${light}%)`;
  } else {
    // red (0°, 100%, 50%) → purple (~265°, 100%, 50%)
    const t = (clamped - 50) / (100 - 50);
    const hue = 0 + 265 * t;

    return `hsl(${hue}, 100%, 50%)`;
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [rewardPercentage, setRewardPercentage] = useState(12); // Default reward %

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const updateRewardPercentage = (percentage) => {
    setRewardPercentage(Math.min(100, Math.max(3, percentage)));
  };

  // Get the dynamic reward color
  const rewardBackgroundColor = rewardToColor(rewardPercentage);

  const theme = {
    ...(isDarkTheme ? darkTheme : lightTheme),
    rewardBackgroundColor,
    rewardPercentage,
  };

  return (
    <ThemeContext.Provider value={{
      theme,
      isDarkTheme,
      toggleTheme,
      rewardPercentage,
      updateRewardPercentage,
      rewardToColor
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

const darkTheme = {
  // Background colors - Red Envelope theme
  backgroundPrimary: '#1a0c0c', // Dark red background
  backgroundSecondary: '#2d1212', // Slightly lighter red
  backgroundTertiary: '#0f0606', // Very dark red
  backgroundInverse: '#0f0606', // Card backgrounds
  backgroundAccent: '#ff4444', // Red accent
  backgroundTabBar: 'rgba(180, 30, 30, 0.95)', // Red tab bar

  // Text colors
  contentPrimary: '#fafcff',
  contentSecondary: '#fafcffa3',
  contentInversePrimary: '#1a0c0c',

  // Action colors - Red Envelope theme
  actionPrimary: '#ff3333', // Red primary action
  actionSecondary: 'rgba(180, 30, 30, 0.3)', // Red secondary action

  // Border colors
  borderWeak: '#2d1212',

  // Status bar
  statusBarStyle: 'light',
};

const lightTheme = {
  // Background colors - Red Envelope light theme
  backgroundPrimary: '#ffe5e5', // Light red/pink background
  backgroundSecondary: '#ffcccc', // Slightly deeper pink
  backgroundTertiary: '#ffffff', // White cards
  backgroundInverse: '#ffffff', // White card backgrounds
  backgroundAccent: '#ff6666', // Light red accent
  backgroundTabBar: '#ffaaaa', // Pink tab bar

  // Text colors
  contentPrimary: '#1a0c0c', // Dark red text
  contentSecondary: '#4a2525', // Medium red text
  contentInversePrimary: '#ffffff',

  // Action colors - Red Envelope theme
  actionPrimary: '#ff3333', // Red primary action
  actionSecondary: '#ffdddd', // Light pink secondary

  // Border colors
  borderWeak: '#ffcccc',

  // Status bar
  statusBarStyle: 'dark',
};

export { darkTheme, lightTheme };
