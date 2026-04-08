import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTheme, getStoredTheme, STORAGE_KEY } from './theme';

export const ThemeContext = createContext({
  theme: 'light',
  isDark: false,
  currentTheme: {},
  toggle: () => {},
  setTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(getStoredTheme);
  const isDark = theme === 'dark';
  const currentTheme = getTheme(theme);

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    const colors = currentTheme.colors;
    const typography = currentTheme.typography;

    root.style.setProperty('--theme-background', colors.background);
    root.style.setProperty('--theme-surface', colors.surface);
    root.style.setProperty('--theme-hover-surface', colors.hoverSurface);
    root.style.setProperty('--theme-border', colors.border);
    root.style.setProperty('--theme-divider', colors.divider);

    root.style.setProperty('--bg-base', colors.background);
    root.style.setProperty('--bg-surface', colors.surface);
    root.style.setProperty('--bg-card', colors.surface);
    root.style.setProperty('--bg-input', colors.input?.bg || colors.surface);
    root.style.setProperty('--bg-hover', colors.hoverSurface);

    root.style.setProperty('--text-primary', colors.text.primary);
    root.style.setProperty('--text-secondary', colors.text.secondary);
    root.style.setProperty('--text-muted', colors.text.muted);
    root.style.setProperty('--text-disabled', colors.text.disabled);

    root.style.setProperty('--theme-text-primary', colors.text.primary);
    root.style.setProperty('--theme-text-secondary', colors.text.secondary);
    root.style.setProperty('--theme-text-muted', colors.text.muted);
    root.style.setProperty('--theme-text-disabled', colors.text.disabled);

    root.style.setProperty('--accent', colors.accent.primary);
    root.style.setProperty('--accent-hover', colors.accent.hover);
    root.style.setProperty('--accent-active', colors.accent.active);
    root.style.setProperty('--accent-soft-bg', colors.accent.softBg);

    root.style.setProperty('--theme-accent-primary', colors.accent.primary);
    root.style.setProperty('--theme-accent-hover', colors.accent.hover);
    root.style.setProperty('--theme-accent-active', colors.accent.active);
    root.style.setProperty('--theme-accent-soft-bg', colors.accent.softBg);
    
    // Gold colors
    root.style.setProperty('--theme-accent-gold', colors.accent.gold || '#D97706');
    root.style.setProperty('--theme-accent-gold-hover', colors.accent.goldHover || '#B45309');
    root.style.setProperty('--theme-accent-gold-soft-bg', colors.accent.goldSoftBg || '#FEF3C7');

    root.style.setProperty('--theme-error-text', colors.error.text);
    root.style.setProperty('--theme-error-bg', colors.error.bg);
    root.style.setProperty('--theme-error-border', colors.error.border);

    root.style.setProperty('--theme-success-text', colors.success.text);
    root.style.setProperty('--theme-success-bg', colors.success.bg);
    root.style.setProperty('--theme-success-border', colors.success.border);

    root.style.setProperty('--theme-warning-text', colors.warning.text);
    root.style.setProperty('--theme-warning-bg', colors.warning.bg);
    root.style.setProperty('--theme-warning-border', colors.warning.border);

    root.style.setProperty('--theme-button-primary-bg', colors.button.primary.bg);
    root.style.setProperty('--theme-button-primary-hover', colors.button.primary.hover);
    root.style.setProperty('--theme-button-primary-active', colors.button.primary.active);
    root.style.setProperty('--theme-button-primary-text', colors.button.primary.text);

    // Gold button
    if (colors.button.gold) {
      root.style.setProperty('--theme-button-gold-bg', colors.button.gold.bg);
      root.style.setProperty('--theme-button-gold-hover', colors.button.gold.hover);
      root.style.setProperty('--theme-button-gold-text', colors.button.gold.text);
    } else {
      root.style.setProperty('--theme-button-gold-bg', '#D97706');
      root.style.setProperty('--theme-button-gold-hover', '#B45309');
      root.style.setProperty('--theme-button-gold-text', '#FFFFFF');
    }

    root.style.setProperty('--theme-button-secondary-bg', colors.button.secondary.bg);
    root.style.setProperty('--theme-button-secondary-border', colors.button.secondary.border);
    root.style.setProperty('--theme-button-secondary-hover', colors.button.secondary.hover);
    root.style.setProperty('--theme-button-secondary-text', colors.button.secondary.text);

    root.style.setProperty('--theme-input-bg', colors.input.bg);
    root.style.setProperty('--theme-input-border', colors.input.border);
    root.style.setProperty('--theme-input-focus-border', colors.input.focusBorder);
    root.style.setProperty('--theme-input-placeholder', colors.input.placeholder);

    root.style.setProperty('--theme-shadow-subtle', currentTheme.shadows.subtle);
    root.style.setProperty('--theme-shadow-sm', currentTheme.shadows.sm);
    root.style.setProperty('--theme-shadow-md', currentTheme.shadows.md);
    root.style.setProperty('--theme-shadow-lg', currentTheme.shadows.lg);
    root.style.setProperty('--theme-shadow-xl', currentTheme.shadows.xl || currentTheme.shadows.lg);
    root.style.setProperty('--theme-border-radius', currentTheme.borderRadius);

    root.style.setProperty('--theme-font-family', typography.fontFamily);
    root.style.setProperty('--theme-font-size-xs', typography.fontSize.xs);
    root.style.setProperty('--theme-font-size-sm', typography.fontSize.sm);
    root.style.setProperty('--theme-font-size-base', typography.fontSize.base);
    root.style.setProperty('--theme-font-size-lg', typography.fontSize.lg);
    root.style.setProperty('--theme-font-size-xl', typography.fontSize.xl);
    root.style.setProperty('--theme-font-size-2xl', typography.fontSize['2xl']);
    root.style.setProperty('--theme-font-size-3xl', typography.fontSize['3xl']);
    root.style.setProperty('--theme-font-size-4xl', typography.fontSize['4xl']);
    root.style.setProperty('--theme-font-size-5xl', typography.fontSize['5xl']);
    root.style.setProperty('--theme-font-weight-normal', typography.fontWeight.normal);
    root.style.setProperty('--theme-font-weight-medium', typography.fontWeight.medium);
    root.style.setProperty('--theme-font-weight-semibold', typography.fontWeight.semibold);
    root.style.setProperty('--theme-font-weight-bold', typography.fontWeight.bold);
    root.style.setProperty('--theme-line-height-tight', typography.lineHeight.tight);
    root.style.setProperty('--theme-line-height-normal', typography.lineHeight.normal);
    root.style.setProperty('--theme-line-height-relaxed', typography.lineHeight.relaxed);

    localStorage.setItem(STORAGE_KEY, theme);
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
    <ThemeContext.Provider value={{
      theme,
      isDark,
      currentTheme,
      toggle,
      setTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};
