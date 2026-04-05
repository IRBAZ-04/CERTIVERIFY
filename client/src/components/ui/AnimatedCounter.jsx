import { useRef, useEffect, useState } from 'react';

const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

const AnimatedCounter = ({
  from = 0,
  to,
  duration = 2000,
  suffix = '',
  prefix = '',
  decimals = 0,
  label = '',
  description = '',
}) => {
  const [value, setValue] = useState(from);
  const [started, setStarted] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          setVisible(true);

          let startTime;
          const tick = (now) => {
            if (!startTime) startTime = now;
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutQuart(progress);
            const current = from + (to - from) * eased;

            setValue(parseFloat(current.toFixed(decimals)));

            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [from, to, duration, decimals, started]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.floor(value).toLocaleString();

  return (
    <div
      ref={ref}
      className={`group relative rounded-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-6 transition-all duration-500 hover:scale-[1.02] hover:border-[var(--theme-accent-primary)] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-neutral-700/10 to-transparent opacity-0 group-hover:opacity-100 transition" />

      {/* Number */}
      <div className="text-3xl font-semibold tracking-tight text-[var(--theme-text-primary)]">
        {prefix}
        {display}
        {suffix}
      </div>

      {/* Label */}
      <div className="mt-2 text-sm text-[var(--theme-text-secondary)]">
        {label}
      </div>

      {/* Description */}
      {description && (
        <div className="mt-1 text-xs text-[var(--theme-text-secondary)]">
          {description}
        </div>
      )}
    </div>
  );
};

export default AnimatedCounter;