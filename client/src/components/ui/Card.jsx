import React from 'react';
import { cn } from '../../utils/cn';
import Tilt from 'react-parallax-tilt';

const Card = React.forwardRef(({ className, hover = false, children, ...props }, ref) => {
  const content = (
    <div
      ref={ref}
      className={cn(
        'relative h-full rounded-2xl overflow-hidden',
        'bg-[var(--theme-surface)] border border-[var(--theme-border)]',
        'transition-colors duration-300 ease-in-out',
        hover &&
          'group-hover:border-[var(--theme-accent-primary)]/40',
        className
      )}
      {...props}
    >
      {/* Subtle inner noise/glow texture for premium feel */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--theme-accent-primary)]/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-overlay" />
      
      {/* Content Wrapper */}
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </div>
  );

  if (hover) {
    return (
      <Tilt
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
        glareEnable={true}
        glareMaxOpacity={0.15}
        glareColor="var(--theme-text-primary)"
        glarePosition="all"
        glareBorderRadius="16px"
        perspective={1000}
        scale={1.015}
        transitionSpeed={2000}
        className="group relative shadow-sm hover:shadow-[var(--theme-shadow-md)] rounded-2xl transition-all duration-300"
      >
        {content}
      </Tilt>
    );
  }

  return (
    <div className="relative shadow-sm rounded-2xl">
      {content}
    </div>
  );
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 pt-6 pb-4 flex flex-col space-y-1.5 translate-z-[20px] transform-style-3d', className)}
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-lg font-bold tracking-tight text-[var(--theme-text-primary)] leading-none translate-z-[30px]',
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
      'text-sm text-[var(--theme-text-muted)] leading-relaxed translate-z-[10px]',
      className
    )}
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('px-6 pb-6 translate-z-[20px]', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center p-6 pt-0 border-t border-[var(--theme-border)]/50 mt-4 translate-z-[15px]',
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