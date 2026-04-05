/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/flowbite-react/**/*.js"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                // Theme-based colors
                background: 'var(--theme-background)',
                surface: 'var(--theme-surface)',
                'hover-surface': 'var(--theme-hover-surface)',
                border: 'var(--theme-border)',
                divider: 'var(--theme-divider)',

                // Text colors
                'text-primary': 'var(--theme-text-primary)',
                'text-secondary': 'var(--theme-text-secondary)',
                'text-muted': 'var(--theme-text-muted)',
                'text-disabled': 'var(--theme-text-disabled)',

                // Accent colors
                accent: {
                    primary: 'var(--theme-accent-primary)',
                    hover: 'var(--theme-accent-hover)',
                    active: 'var(--theme-accent-active)',
                    'soft-bg': 'var(--theme-accent-soft-bg)',
                },

                // State colors
                error: {
                    text: 'var(--theme-error-text)',
                    bg: 'var(--theme-error-bg)',
                    border: 'var(--theme-error-border)',
                },
                success: {
                    text: 'var(--theme-success-text)',
                    bg: 'var(--theme-success-bg)',
                    border: 'var(--theme-success-border)',
                },
                warning: {
                    text: 'var(--theme-warning-text)',
                    bg: 'var(--theme-warning-bg)',
                    border: 'var(--theme-warning-border)',
                },

                // Button colors
                'button-primary': {
                    bg: 'var(--theme-button-primary-bg)',
                    hover: 'var(--theme-button-primary-hover)',
                    active: 'var(--theme-button-primary-active)',
                    text: 'var(--theme-button-primary-text)',
                },
                'button-secondary': {
                    bg: 'var(--theme-button-secondary-bg)',
                    border: 'var(--theme-button-secondary-border)',
                    hover: 'var(--theme-button-secondary-hover)',
                    text: 'var(--theme-button-secondary-text)',
                },

                // Input colors
                input: {
                    bg: 'var(--theme-input-bg)',
                    border: 'var(--theme-input-border)',
                    'focus-border': 'var(--theme-input-focus-border)',
                    placeholder: 'var(--theme-input-placeholder)',
                },
            },
            backgroundColor: {
                base: 'var(--bg-base)',
                surface: 'var(--bg-surface)',
                card: 'var(--bg-card)',
                input: 'var(--bg-input)',
                hover: 'var(--bg-hover)',
            },
            borderColor: {
                default: 'var(--border-default)',
                strong: 'var(--border-strong)',
            },
            textColor: {
                primary: 'var(--text-primary)',
                secondary: 'var(--text-secondary)',
                muted: 'var(--text-muted)',
            },
            boxShadow: {
                sm: 'var(--shadow-sm)',
                base: 'var(--shadow-base)',
                md: 'var(--shadow-md)',
            },
            borderRadius: {
                DEFAULT: '10px',
                lg: '12px',
            },
            animation: {
                'fade-in': 'fadeIn 0.2s ease-out',
                'slide-up': 'slideUp 0.3s ease-out',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
                slideUp: {
                    from: { opacity: 0, transform: 'translateY(8px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                },
            },
        },
    },
    plugins: [],
};
