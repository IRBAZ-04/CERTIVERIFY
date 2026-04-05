import { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Staggered springs for organic comet trail effect
    const springX1 = useSpring(cursorX, { damping: 15, stiffness: 400, mass: 0.5 });
    const springY1 = useSpring(cursorY, { damping: 15, stiffness: 400, mass: 0.5 });

    const springX2 = useSpring(cursorX, { damping: 20, stiffness: 400, mass: 0.5 });
    const springY2 = useSpring(cursorY, { damping: 20, stiffness: 400, mass: 0.5 });

    const springX3 = useSpring(cursorX, { damping: 25, stiffness: 400, mass: 0.5 });
    const springY3 = useSpring(cursorY, { damping: 25, stiffness: 400, mass: 0.5 });

    const springX4 = useSpring(cursorX, { damping: 32, stiffness: 400, mass: 0.5 });
    const springY4 = useSpring(cursorY, { damping: 32, stiffness: 400, mass: 0.5 });

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const moveCursor = (e) => {
            if (!isVisible) setIsVisible(true);
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a, button, input, textarea, select, [role="button"], .magnetic-btn')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseOver);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseOver);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [cursorX, cursorY, isVisible]);

    if (!isVisible) return null;

    return (
        <div className="pointer-events-none z-[9999] fixed inset-0">
            {/* The Leading Core Dot */}
            <motion.div
                className="absolute w-2.5 h-2.5 -ml-[5px] -mt-[5px] bg-[var(--theme-text-primary)] rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]"
                style={{ x: cursorX, y: cursorY }}
                animate={{
                    scale: isClicking ? 0.5 : isHovering ? 2.5 : 1,
                    opacity: isHovering ? 0.2 : 1,
                    backgroundColor: isHovering ? 'var(--theme-accent-primary)' : 'var(--theme-text-primary)'
                }}
                transition={{ duration: 0.15 }}
            />

            {/* Trail Dot 1 */}
            <motion.div
                className="absolute w-2 h-2 -ml-1 -mt-1 bg-[var(--theme-accent-primary)] rounded-full"
                style={{ x: springX1, y: springY1 }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 0.8
                }}
            />

            {/* Trail Dot 2 */}
            <motion.div
                className="absolute w-1.5 h-1.5 -ml-[3px] -mt-[3px] bg-[var(--theme-accent-primary)] rounded-full"
                style={{ x: springX2, y: springY2 }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 0.5
                }}
            />

            {/* Trail Dot 3 */}
            <motion.div
                className="absolute w-1 h-1 -ml-[2px] -mt-[2px] bg-[var(--theme-text-primary)] rounded-full"
                style={{ x: springX3, y: springY3 }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 0.3
                }}
            />
            
            {/* Trail Dot 4 */}
            <motion.div
                className="absolute w-0.5 h-0.5 -ml-[1px] -mt-[1px] bg-[var(--theme-text-primary)] rounded-full"
                style={{ x: springX4, y: springY4 }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 0.15
                }}
            />
        </div>
    );
};

export default CustomCursor;