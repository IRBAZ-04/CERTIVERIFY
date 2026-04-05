import { cn } from '../../utils/cn';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const Badge = ({
  variant = 'info',
  className,
  children,
  icon = true,
  ...props
}) => {
  const styles = {
    success:
      'bg-[var(--theme-success-bg)] text-[var(--theme-success-text)] border border-[var(--theme-success-border)]',
    warning:
      'bg-[var(--theme-warning-bg)] text-[var(--theme-warning-text)] border border-[var(--theme-warning-border)]',
    error:
      'bg-[var(--theme-error-bg)] text-[var(--theme-error-text)] border border-[var(--theme-error-border)]',
    info:
      'bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)]',
  };

  const icons = {
    success: CheckCircle,
    warning: AlertTriangle,
    error: XCircle,
    info: Info,
  };

  const Icon = icons[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-200 hover:scale-[1.03]',
        styles[variant],
        className
      )}
      {...props}
    >
      {icon && <Icon className="h-3.5 w-3.5 opacity-80" />}
      {children}
    </span>
  );
};

export { Badge };