/**
 * CertiVerify design tokens — warm premium light theme and modern rose dark theme.
 * Used by ThemeProvider to inject CSS variables; keep in sync with index.css fallbacks.
 */
export const lightTheme = {
  name: 'light',
  colors: {
    background: '#FBF3EE',
    surface: '#FFFFFF',
    hoverSurface: '#F7EEE9',
    border: '#E7D7D1',
    divider: '#ECE0DA',

    text: {
      primary: '#111827',
      secondary: '#4B4450',
      muted: '#7A6F7A',
      disabled: '#B7AEB5',
    },

    accent: {
      primary: '#B24F6D',
      hover: '#9A3F5B',
      active: '#7C2F48',
      softBg: '#F8E3E8',
    },

    error: {
      text: '#B8252D',
      bg: '#FDE8E9',
      border: '#F7A2A9',
    },
    success: {
      text: '#2C7A4B',
      bg: '#E8F6EC',
      border: '#8BD0A2',
    },
    warning: {
      text: '#9C6C1A',
      bg: '#FFF3D9',
      border: '#F0C27D',
    },

    button: {
      primary: {
        bg: '#1F1724',
        hover: '#34273A',
        active: '#09080F',
        text: '#F8F4F2',
      },
      secondary: {
        bg: '#FFFFFF',
        border: '#E7D7D1',
        hover: '#F7EEE9',
        text: '#322F31',
      },
    },

    input: {
      bg: '#FFFFFF',
      border: '#E7D7D1',
      focusBorder: '#B24F6D',
      placeholder: '#A8949B',
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
    subtle: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
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
    // Obsidian / Charcoal Dark Theme
    background: '#0F0B12',
    surface: '#18131D',
    hoverSurface: '#2B2331',
    border: '#382E3E',
    divider: '#342E3A',

    text: {
      primary: '#F8F4F2',
      secondary: '#CBC0CA',
      muted: '#8F8592',
      disabled: '#6D6571',
    },

    accent: {
      primary: '#E7A9C2',
      hover: '#D48AAC',
      active: '#B36F90',
      softBg: '#492D43',
    },

    error: {
      text: '#F7A1A9',
      bg: '#5D222A',
      border: '#BF3A4C',
    },
    success: {
      text: '#8ED6A7',
      bg: '#163325',
      border: '#2B7B53',
    },
    warning: {
      text: '#F6C96A',
      bg: '#3E2F12',
      border: '#A56E1F',
    },

    button: {
      primary: {
        bg: '#F8F4F2',
        hover: '#EEE5E2',
        active: '#DDD0CC',
        text: '#1B1220',
      },
      secondary: {
        bg: 'transparent',
        border: '#382E3E',
        hover: '#342B3C',
        text: '#F8F4F2',
      },
    },

    input: {
      bg: '#1F1825',
      border: '#382E3E',
      focusBorder: '#E7A9C2',
      placeholder: '#8F8592',
    },
  },
  typography: lightTheme.typography,
  shadows: {
    subtle: '0 4px 6px -1px rgba(0, 0, 0, 0.35), 0 2px 4px -2px rgba(0, 0, 0, 0.35)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.45)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.45), 0 2px 4px -2px rgba(0, 0, 0, 0.25)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.55), 0 4px 6px -4px rgba(0, 0, 0, 0.3)',
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
