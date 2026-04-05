import { useRef, useEffect } from 'react';

const MagneticButton = ({
  children,
  className = '',
  strength = 0.2,
  as: Tag = 'button',
  ...props
}) => {
  const ref = useRef(null);

  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    let raf;

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.1);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.1);

      if (ref.current) {
        ref.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(1.02)`;
      }

      raf = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(raf);
  }, []);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    target.current.x = (e.clientX - cx) * strength;
    target.current.y = (e.clientY - cy) * strength;
  };

  const handleMouseLeave = () => {
    target.current.x = 0;
    target.current.y = 0;

    if (ref.current) {
      ref.current.style.transform = 'translate(0px, 0px) scale(1)';
    }
  };

  return (
    <Tag
      ref={ref}
      className={`magnetic-btn transition-transform duration-200 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default MagneticButton;