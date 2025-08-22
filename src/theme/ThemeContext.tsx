import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeState {
  mode: 'light' | 'dark' | 'system';
  colors: typeof lightColors;
}

const lightColors = {
  primary: {
    100: '#e0e9ff',
    500: '#5b6bff',
    900: '#2f2f85',
  },
  secondary: {
    100: '#f1f5f9',
    300: '#cbd5e1',
    500: '#64748b',
    700: '#334155',
  },
  surface: '#ffffff',
  background: '#f5f5f5',
  text: {
    primary: '#1f2937',
    secondary: '#6b7280',
    accent: '#3b82f6',
  },
  border: '#e5e7eb',
  social: {
    google: '#ea4335',
    facebook: '#1877f2',
    twitter: '#1da1f2',
  },
};

const darkColors = {
  ...lightColors,
  surface: '#1a1a1a',
  background: '#0a0a0a',
  text: {
    primary: '#f9fafb',
    secondary: '#9ca3af',
    accent: '#60a5fa',
  },
  border: '#374151',
};

type ThemeAction =
  | { type: 'SET_MODE'; payload: 'light' | 'dark' | 'system' }
  | { type: 'TOGGLE_THEME' };

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'TOGGLE_THEME':
      const newMode = state.mode === 'light' ? 'dark' : 'light';
      return { ...state, mode: newMode };
    default:
      return state;
  }
};

const ThemeContext = createContext<{
  state: ThemeState;
  dispatch: React.Dispatch<ThemeAction>;
  toggleTheme: () => void;
  setMode: (mode: 'light' | 'dark' | 'system') => void;
} | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [state, dispatch] = useReducer(themeReducer, {
    mode: 'system',
    colors: systemColorScheme === 'dark' ? darkColors : lightColors,
  });

  useEffect(() => {
    if (state.mode === 'system') {
      dispatch({ type: 'SET_MODE', payload: systemColorScheme || 'light' });
    }
  }, [systemColorScheme, state.mode]);

  const currentColors = state.mode === 'dark' ? darkColors : lightColors;

  const toggleTheme = () => dispatch({ type: 'TOGGLE_THEME' });
  const setMode = (mode: 'light' | 'dark' | 'system') =>
    dispatch({ type: 'SET_MODE', payload: mode });

  return (
    <ThemeContext.Provider
      value={{
        state: { ...state, colors: currentColors },
        dispatch,
        toggleTheme,
        setMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
