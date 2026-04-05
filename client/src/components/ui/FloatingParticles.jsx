import { useMemo } from 'react';

const PARTICLE_COUNT = 16;

const generateParticles = (count) => {
  return Array.from({ length: count }, (_, i) => {
    const seed = (i * 137.5) % 100;

    return {
      id: i,
      left: `${(seed + i * 11) % 100}%`,
      size: 1 + (i % 3),
      delay: `${(i * 0.7) % 10}s`,
      duration: `${12 + (i * 1.5) % 12}s`,
      opacity: 0.08 + (i % 3) * 0.05,
    };
  });
};

const FloatingParticles = ({ count = PARTICLE_COUNT, className = '' }) => {
  const particles = useMemo(() => generateParticles(count), [count]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animationName: 'particleFloat',
            animationDuration: p.duration,
            animationDelay: p.delay,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;