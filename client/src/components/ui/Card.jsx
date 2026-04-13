import React from 'react';
import { cn } from '../../utils/cn';
import { motion } from 'framer-motion';

const Card = React.forwardRef(({ className, hover = false, children, ...props }, ref) => {
  const Component = hover ? motion.div : 'div';
  const motionProps = hover ? {
    whileHover: { scale: 1.03, y: -2, transition: { duration: 0.3, ease: "easeOut" } },
    transition: { duration: 0.3, ease: "easeOut" }
  } : {};

  return (
    <Component
      ref={ref}
      className={cn(
        'relative h-full rounded-xl overflow-hidden',
        'bg-[var(--theme-surface)] border border-[var(--theme-border)]',
        'shadow-[var(--theme-shadow-sm)]',
        'transition-all duration-300 ease-out',
        hover && 'hover:shadow-[var(--theme-shadow-lg)] hover:border-[var(--theme-accent-primary)]/30 cursor-pointer',
        className
      )}
      {...motionProps}
      {...props}
    >
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </Component>
  );
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 pt-6 pb-4 flex flex-col space-y-1.5', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-semibold tracking-tight text-[var(--theme-text-primary)] leading-none',
      className
    )}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      'text-sm text-[var(--theme-text-muted)] leading-relaxed',
      className
    )}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 pb-6', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center p-6 pt-0 border-t border-[var(--theme-border)] mt-4',
      className
    )}
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
};
