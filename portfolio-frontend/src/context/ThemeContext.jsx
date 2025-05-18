import { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '../theme/theme';

// Create context
export const ThemeContext = createContext({
  mode: 'dark',
  toggleColorMode: () => {},
});

// Custom hook to use theme context
export const useThemeMode = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Try to get saved mode from localStorage, default to dark
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'dark';
  });

  // Toggle between light and dark modes
  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', newMode); // Save to localStorage
      return newMode;
    });
  };

  // Create theme based on current mode
  const theme = useMemo(() => createAppTheme(mode), [mode]);

  // Context value
  const contextValue = useMemo(() => ({
    mode,
    toggleColorMode,
  }), [mode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
