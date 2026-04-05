import { useTheme } from '../theme/useTheme';
import { cn } from '../utils/cn';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ className = '' }) => {
  const { t } = useTranslation();
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={cn(
        'relative w-9 h-9 rounded-xl flex items-center justify-center',
        'bg-[var(--theme-surface)] border border-[var(--theme-border)] backdrop-blur-md',
        'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover-surface)]',
        'transition-all duration-200',
        'active:scale-90',
        className
      )}
      aria-label={isDark ? t('nav.lightMode') : t('nav.darkMode')}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <Sun className="w-[18px] h-[18px]" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25 }}
            className="absolute"
          >
            <Moon className="w-[18px] h-[18px]" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;