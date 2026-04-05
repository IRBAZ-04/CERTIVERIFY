import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('cv_loaded')) {
      onComplete?.();
      return;
    }

    let start = performance.now();
    const duration = 1400;

    const tick = (now) => {
      const elapsed = now - start;
      const eased = 1 - Math.pow(1 - elapsed / duration, 3);
      const value = Math.min(100, Math.floor(eased * 100));

      setProgress(value);

      if (value < 100) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem('cv_loaded', '1');
          setTimeout(() => onComplete?.(), 600);
        }, 200);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--theme-background)] text-[var(--theme-text-primary)]"
          exit={{ opacity: 0, transition: { duration: 0.6 } }}
        >
          <div className="flex flex-col items-center gap-6">

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[var(--theme-text-primary)] text-xl font-semibold tracking-tight"
            >
              CertiVerify
            </motion.div>

            {/* Progress */}
            <div className="w-56">
              <div className="h-[2px] bg-[var(--theme-border)] overflow-hidden rounded-full">
                <motion.div
                  className="h-full bg-[var(--theme-accent-primary)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-2 text-xs text-[var(--theme-text-secondary)] text-right tabular-nums">
                {progress}%
              </div>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;