import React from 'react';
import { cn } from '../../utils/cn';
import { Loader2 } from 'lucide-react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

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

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`
    radial-gradient(
      60px circle at ${mouseX}px ${mouseY}px,
      rgba(255,255,255,0.15),
      transparent 80%
    )
  `;

  const variants = {
    primary:
      'bg-[var(--theme-button-primary-bg)] text-[var(--theme-button-primary-text)] border border-transparent shadow-[var(--theme-shadow-sm)]',

    secondary:
      'bg-[var(--theme-button-secondary-bg)] text-[var(--theme-button-secondary-text)] border border-[var(--theme-button-secondary-border)] shadow-sm hover:shadow-[var(--theme-shadow-md)] bg-clip-padding',

    outline:
      'bg-transparent text-[var(--theme-text-primary)] border border-[var(--theme-border)] hover:bg-[var(--theme-hover-surface)]',

    ghost:
      'bg-transparent text-[var(--theme-text-secondary)] border-transparent hover:bg-[var(--theme-hover-surface)] hover:text-[var(--theme-text-primary)]',

    danger:
      'bg-[var(--theme-error-text)] text-[var(--theme-surface)] border border-transparent shadow-sm hover:shadow-md',

    success:
      'bg-[var(--theme-success-text)] text-[var(--theme-surface)] border border-transparent shadow-sm hover:shadow-md',
  };

  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-lg',
    default: 'h-10 px-4 py-2 text-sm rounded-xl',
    lg: 'h-12 px-8 text-base rounded-2xl',
    icon: 'h-10 w-10 p-0 rounded-xl',
    'icon-sm': 'h-8 w-8 p-0 rounded-lg',
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={disabled || loading ? {} : { scale: 1.025, transition: { type: "spring", stiffness: 400, damping: 10 } }}
      whileTap={disabled || loading ? {} : { scale: 0.96 }}
      className={cn(
        'group relative inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-colors duration-200 ease-out ' +
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--theme-background)] ' +
        'disabled:pointer-events-none disabled:opacity-50 overflow-hidden',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {/* Magnetic / Spotlight Glow Effect */}
      {variant === 'primary' && !disabled && !loading && (
        <motion.div
           className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
           style={{ background }}
        />
      )}

      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin opacity-80" />
      ) : leftIcon ? (
        <span className="shrink-0 transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>
      ) : null}

      <span className="relative z-10">{children}</span>

      {!loading && rightIcon && (
        <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{rightIcon}</span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
export { Button };