import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const Input = React.forwardRef(({
  className,
  type = 'text',
  icon: Icon,
  suffix,
  rightIcon: RightIcon,
  rightIconAction,
  error,
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full relative">
      <div className="relative flex items-center">
        {Icon && (
          <div className="pointer-events-none absolute left-3 z-10">
            <Icon className={cn(
              "h-5 w-5 transition-colors duration-300",
              isFocused ? "text-[var(--theme-accent-primary)]" : "text-[var(--theme-text-muted)]"
            )} />
          </div>
        )}

        <input
          ref={ref}
          type={type}
          disabled={disabled}
          aria-invalid={error ? 'true' : undefined}
          onFocus={(e) => {
            setIsFocused(true);
            if (props.onFocus) props.onFocus(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            if (props.onBlur) props.onBlur(e);
          }}
          className={cn(
            'flex h-12 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-4 py-3 text-sm text-[var(--theme-text-primary)] shadow-sm',
            'transition-all duration-300 ease-out',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-[var(--theme-input-placeholder)]',

            Icon && 'pl-11',
            (suffix || RightIcon) && 'pr-11',

            isFocused 
              ? 'border-[var(--theme-accent-primary)] ring-2 ring-[var(--theme-accent-primary)]/20 bg-[var(--theme-background)]' 
              : 'hover:border-[var(--theme-accent-primary)]/50',

            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--theme-background)]',

            error &&
            'border-[var(--theme-error-border)] ring-2 ring-[var(--theme-error-border)]/20 bg-[var(--theme-error-bg)]/30',

            className
          )}
          {...props}
        />

        {suffix && (
          <div className="absolute right-3 text-[var(--theme-text-muted)] text-sm z-10">
            {suffix}
          </div>
        )}

        {RightIcon && (
          <button
            type="button"
            onClick={rightIconAction}
            className="absolute right-3 z-10 text-[var(--theme-text-muted)] hover:text-[var(--theme-accent-primary)] transition-colors duration-200 focus:outline-none"
            tabIndex={-1}
          >
            <RightIcon className="h-5 w-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 ml-1 text-xs font-medium text-[var(--theme-error-text)]"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
});

Input.displayName = 'Input';
export { Input };
