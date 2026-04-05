import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTheme, getStoredTheme, STORAGE_KEY } from '../theme/theme';

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  toggle: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getStoredTheme);

  const isDark = theme === 'dark';
  const currentTheme = getTheme(theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem(STORAGE_KEY, theme);
    
    const t = currentTheme.colors;
    root.style.setProperty('--bg-base', t.bg.base);
    root.style.setProperty('--bg-surface', t.bg.surface);
    root.style.setProperty('--bg-card', t.bg.card);
    root.style.setProperty('--bg-input', t.bg.input);
    root.style.setProperty('--bg-hover', t.bg.hover);
    
    root.style.setProperty('--text-primary', t.text.primary);
    root.style.setProperty('--text-secondary', t.text.secondary);
    root.style.setProperty('--text-muted', t.text.muted);
    root.style.setProperty('--text-inverse', t.text.inverse);
    
    root.style.setProperty('--border-default', t.border.default);
    root.style.setProperty('--border-strong', t.border.strong);
    root.style.setProperty('--border-hover', t.border.hover);
    
    root.style.setProperty('--accent', t.accent.default);
    root.style.setProperty('--accent-hover', t.accent.hover);
    root.style.setProperty('--accent-muted', t.accent.muted);
    
    root.style.setProperty('--success', t.status.success);
    root.style.setProperty('--warning', t.status.warning);
    root.style.setProperty('--error', t.status.error);
    
    root.style.setProperty('--shadow-sm', currentTheme.shadows.sm);
    root.style.setProperty('--shadow-base', currentTheme.shadows.base);
    root.style.setProperty('--shadow-md', currentTheme.shadows.md);
  }, [theme, currentTheme]);

  const toggle = useCallback(() => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const setTheme = useCallback((newTheme) => {
    if (newTheme === 'light' || newTheme === 'dark') {
      setThemeState(newTheme);
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggle, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
