import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { motion, AnimatePresence } from 'framer-motion';

const Input = React.forwardRef(({
  className,
  type = 'text',
  icon: Icon,
  suffix,
  error,
  disabled,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="w-full relative">
      <motion.div
        className="relative group flex items-center"
        animate={{
          scale: isFocused && !disabled ? 1.01 : 1,
          y: isFocused && !disabled ? -1 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glow behind input on focus */}
        <AnimatePresence>
          {isFocused && !disabled && !error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute -inset-1 bg-[var(--theme-accent-primary)]/20 blur-md rounded-xl z-0 pointer-events-none"
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        {Icon && (
          <div className="pointer-events-none absolute left-3 z-20">
            <Icon className={cn(
              "h-[1.125rem] w-[1.125rem] transition-colors duration-200",
              isFocused ? "text-[var(--theme-accent-primary)]" : "text-[var(--theme-text-muted)]"
            )} />
          </div>
        )}

        {/* Input */}
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
            'flex h-11 w-full rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] px-3 py-2 text-sm text-[var(--theme-text-primary)] shadow-sm',
            'transition-colors duration-200 outline-none z-10 relative',
            'file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'placeholder:text-[var(--theme-input-placeholder)]',

            // spacing
            Icon && 'pl-10',
            suffix && 'pr-10',

            // focus state
            'focus:border-[var(--theme-accent-primary)] focus:ring-[1.5px] focus:ring-[var(--theme-accent-primary)] focus:bg-[var(--theme-background)]',

            // hover
            'hover:border-[var(--theme-text-muted)]/50',

            // disabled
            'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--theme-background)] hover:disabled:border-[var(--theme-border)]',

            // error state
            error &&
            'border-[var(--theme-error-border)] focus:border-[var(--theme-error-border)] focus:ring-[var(--theme-error-border)] bg-[var(--theme-error-bg)]/30',

            className
          )}
          {...props}
        />

        {/* Suffix */}
        {suffix && (
          <div className="absolute right-3 text-[var(--theme-text-muted)] text-sm z-20">
            {suffix}
          </div>
        )}
      </motion.div>

      {/* Error text with Framer Motion slide-in */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mt-1.5 ml-1 text-[0.8rem] font-medium text-[var(--theme-error-text)]"
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