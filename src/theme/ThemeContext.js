import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const theme = isDarkTheme ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkTheme, toggleTheme }}>
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
