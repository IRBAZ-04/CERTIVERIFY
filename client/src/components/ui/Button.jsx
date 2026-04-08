import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'default',
  loading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  ...props
}, ref) => {

  const variants = {
    primary:
      'bg-[var(--theme-button-primary-bg)] text-[var(--theme-button-primary-text)] border border-transparent shadow-[var(--theme-shadow-sm)] hover:shadow-[var(--theme-shadow-md)] hover:bg-[var(--theme-button-primary-hover)] hover:-translate-y-0.5',

    gold:
      'bg-[var(--theme-button-gold-bg)] text-[var(--theme-button-gold-text)] border border-transparent shadow-[var(--theme-shadow-sm)] hover:shadow-[var(--theme-shadow-md)] hover:bg-[var(--theme-accent-gold-hover)] hover:-translate-y-0.5',

    secondary:
      'bg-[var(--theme-button-secondary-bg)] text-[var(--theme-button-secondary-text)] border border-[var(--theme-button-secondary-border)] hover:shadow-[var(--theme-shadow-sm)] hover:bg-[var(--theme-hover-surface)] hover:-translate-y-0.5',

    outline:
      'bg-transparent text-[var(--theme-text-primary)] border border-[var(--theme-border)] hover:bg-[var(--theme-hover-surface)] hover:border-[var(--theme-accent-primary)] hover:-translate-y-0.5',

    ghost:
      'bg-transparent text-[var(--theme-text-secondary)] border-transparent hover:bg-[var(--theme-hover-surface)] hover:text-[var(--theme-text-primary)] hover:-translate-y-0.5',

    danger:
      'bg-[var(--theme-error-text)] text-white border border-transparent shadow-[var(--theme-shadow-sm)] hover:shadow-[var(--theme-shadow-md)] hover:-translate-y-0.5',

    success:
      'bg-[var(--theme-success-text)] text-white border border-transparent shadow-[var(--theme-shadow-sm)] hover:shadow-[var(--theme-shadow-md)] hover:-translate-y-0.5',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-lg',
    default: 'h-10 px-4 py-2 text-sm rounded-xl',
    lg: 'h-12 px-6 text-base rounded-xl',
    xl: 'h-14 px-10 text-base rounded-xl',
    icon: 'h-10 w-10 p-0 rounded-xl',
    'icon-sm': 'h-8 w-8 p-0 rounded-lg',
  };

  return (
    <motion.button
      ref={ref}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98, y: 0 } : {}}
      className={cn(
        'flex items-center justify-center gap-2 font-medium transition-all duration-200 ease-out ' +
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-background)] ' +
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
export { Button };
