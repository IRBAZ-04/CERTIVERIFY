import { useEffect, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { useTranslation } from "react-i18next";

export function Modal({ isOpen, onClose, title, children, className }) {
  const { t } = useTranslation();
  const titleId = useId();
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => (document.body.style.overflow = "unset");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "relative w-full max-w-lg rounded-2xl",
              "bg-[var(--theme-surface)] border border-[var(--theme-border)]",
              "shadow-[var(--theme-shadow-lg)]",
              "overflow-hidden",
              className
            )}
          >

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[var(--theme-accent-soft-bg)]/30 to-transparent dark:from-white/[0.03]" />

            <div className="relative flex items-center justify-between px-6 py-5 border-b border-[var(--theme-border)]">
              <h3 id={titleId} className="text-base font-semibold text-[var(--theme-text-primary)] tracking-tight">
                {title}
              </h3>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:bg-[var(--theme-hover-surface)] transition-all duration-200 active:scale-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent-primary)]/35"
                aria-label={t('dashboard.modal.cancel')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative px-6 py-6 text-sm text-[var(--theme-text-secondary)]">
              {children}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}