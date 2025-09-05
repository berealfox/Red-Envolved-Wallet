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
  // Background colors
  // backgroundPrimary: '#060d14',
  backgroundPrimary: '#082d57',
  backgroundSecondary: '#082d57',
  backgroundTertiary: '#060d14',
  backgroundInverse: '#060d14',
  backgroundAccent: '#4da2ff',
  backgroundTabBar: 'rgba(18, 94, 176, 0.95)',

  // Text colors
  contentPrimary: '#fafcff',
  contentSecondary: '#fafcffa3',
  contentInversePrimary: '#060d14',

  // Action colors
  actionPrimary: '#47e299',
  actionSecondary: '#125eb0a3',

  // Border colors
  borderWeak: '#082d57',

  // Status bar
  statusBarStyle: 'light',
};

const lightTheme = {
  // Background colors
  backgroundPrimary: '#cce5ff',
  backgroundSecondary: '#cce5ff',
  backgroundTertiary: '#ffffff',
  backgroundInverse: '#ffffff',
  backgroundAccent: '#4da2ff',
  backgroundTabBar: '#8fc5ff',

  // Text colors
  contentPrimary: '#1a202c',
  contentSecondary: '#4a5568',
  contentInversePrimary: '#ffffff',

  // Action colors
  actionPrimary: '#47e299',
  actionSecondary: '#e2e8f0',

  // Border colors
  borderWeak: '#cce5ff',

  // Status bar
  statusBarStyle: 'dark',
};

export { darkTheme, lightTheme };
