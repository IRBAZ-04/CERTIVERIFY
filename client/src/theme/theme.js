/**
 * CertiVerify design tokens — elegant emerald & gold premium theme.
 * Used by ThemeProvider to inject CSS variables; keep in sync with index.css fallbacks.
 */
export const lightTheme = {
  name: 'light',
  colors: {
    background: '#F0FDF4',
    surface: '#FFFFFF',
    hoverSurface: '#ECFDF5',
    border: '#D1FAE5',
    divider: '#E5E7EB',

    text: {
      primary: '#022C22',
      secondary: '#065F46',
      muted: '#6B7280',
      disabled: '#9CA3AF',
    },

    accent: {
      primary: '#059669',
      hover: '#047857',
      active: '#065F46',
      softBg: '#D1FAE5',
      gold: '#D97706',
      goldHover: '#B45309',
      goldSoftBg: '#FEF3C7',
    },

    error: {
      text: '#DC2626',
      bg: '#FEE2E2',
      border: '#FECACA',
    },
    success: {
      text: '#059669',
      bg: '#D1FAE5',
      border: '#6EE7B7',
    },
    warning: {
      text: '#D97706',
      bg: '#FEF3C7',
      border: '#FCD34D',
    },

    button: {
      primary: {
        bg: '#059669',
        hover: '#047857',
        active: '#065F46',
        text: '#FFFFFF',
      },
      gold: {
        bg: '#D97706',
        hover: '#B45309',
        active: '#92400E',
        text: '#FFFFFF',
      },
      secondary: {
        bg: '#FFFFFF',
        border: '#D1FAE5',
        hover: '#ECFDF5',
        text: '#022C22',
      },
    },

    input: {
      bg: '#FFFFFF',
      border: '#D1FAE5',
      focusBorder: '#059669',
      placeholder: '#9CA3AF',
    },
  },
  typography: {
    fontFamily: "'Outfit', 'Inter', system-ui, -apple-system, sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: '1.2',
      normal: '1.5',
      relaxed: '1.65',
    },
  },
  shadows: {
    subtle: '0 1px 2px 0 rgba(5, 150, 105, 0.05)',
    sm: '0 1px 3px 0 rgba(5, 150, 105, 0.1), 0 1px 2px -1px rgba(5, 150, 105, 0.1)',
    md: '0 4px 6px -1px rgba(5, 150, 105, 0.1), 0 2px 4px -2px rgba(5, 150, 105, 0.1)',
    lg: '0 10px 15px -3px rgba(5, 150, 105, 0.1), 0 4px 6px -4px rgba(5, 150, 105, 0.1)',
    xl: '0 20px 25px -5px rgba(5, 150, 105, 0.1), 0 8px 10px -6px rgba(5, 150, 105, 0.1)',
  },
  borderRadius: '12px',
  spacing: {
    sectionY: '5rem',
    cardPad: '1.5rem',
  },
};

export const darkTheme = {
  name: 'dark',
  colors: {
    background: '#022C22',
    surface: '#064E3B',
    hoverSurface: '#065F46',
    border: '#047857',
    divider: '#065F46',

    text: {
      primary: '#ECFDF5',
      secondary: '#A7F3D0',
      muted: '#6EE7B7',
      disabled: '#34D399',
    },

    accent: {
      primary: '#34D399',
      hover: '#6EE7B7',
      active: '#A7F3D0',
      softBg: '#065F46',
      gold: '#FCD34D',
      goldHover: '#FBBF24',
      goldSoftBg: '#451A03',
    },

    error: {
      text: '#FCA5A5',
      bg: '#7F1D1D',
      border: '#DC2626',
    },
    success: {
      text: '#34D399',
      bg: '#064E3B',
      border: '#059669',
    },
    warning: {
      text: '#FCD34D',
      bg: '#78350F',
      border: '#D97706',
    },

    button: {
      primary: {
        bg: '#34D399',
        hover: '#6EE7B7',
        active: '#A7F3D0',
        text: '#022C22',
      },
      gold: {
        bg: '#FCD34D',
        hover: '#FBBF24',
        active: '#F59E0B',
        text: '#022C22',
      },
      secondary: {
        bg: 'transparent',
        border: '#047857',
        hover: '#065F46',
        text: '#ECFDF5',
      },
    },

    input: {
      bg: '#064E3B',
      border: '#047857',
      focusBorder: '#34D399',
      placeholder: '#6EE7B7',
    },
  },
  typography: lightTheme.typography,
  shadows: {
    subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.4), 0 1px 2px -1px rgba(0, 0, 0, 0.3)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -2px rgba(0, 0, 0, 0.3)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -4px rgba(0, 0, 0, 0.4)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.4)',
  },
  borderRadius: '12px',
  spacing: lightTheme.spacing,
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (name) => themes[name] || lightTheme;

export const STORAGE_KEY = 'certiverify-theme';

export const getStoredTheme = () => {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === 'dark' ? 'dark' : 'light';
};
