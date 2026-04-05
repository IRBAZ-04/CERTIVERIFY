import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const Toast = ({ message, variant = 'info', onDismiss }) => {
  const styles = {
    success: 'text-[var(--theme-success-text)] bg-[var(--theme-success-bg)] border border-[var(--theme-success-border)]',
    error: 'text-[var(--theme-error-text)] bg-[var(--theme-error-bg)] border border-[var(--theme-error-border)]',
    info: 'text-[var(--theme-text-primary)] bg-[var(--theme-surface)] border border-[var(--theme-border)]',
  };

  const icons = {
    success: <CheckCircle className="h-4 w-4" />,
    error: <AlertCircle className="h-4 w-4" />,
    info: <Info className="h-4 w-4" />,
  };

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.96 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'fixed bottom-6 right-6 z-50',
            'flex items-start gap-3 px-4 py-3 min-w-[280px] max-w-sm',
            'rounded-xl backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.3)]',
            'transition-all duration-200',
            styles[variant]
          )}
        >
          {/* Icon */}
          <div className="mt-0.5 opacity-80">
            {icons[variant]}
          </div>

          {/* Message */}
          <div className="flex-1 text-sm leading-relaxed">
            {message}
          </div>

          {/* Close */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="opacity-50 hover:opacity-100 transition active:scale-90"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Toast };