import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MouseFollowerProps {
  baseColor?: string;
  size?: number;
  enabled?: boolean;
}

const MouseFollower: React.FC<MouseFollowerProps> = ({
  baseColor = '#6366F1',
  size = 20,
  enabled = true,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (!enabled) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = performance.now();
      if (currentTime - lastTime < 16) return; // Limit to ~60fps

      lastTime = currentTime;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [enabled]);

  return (
    <AnimatePresence>
      {enabled && (
        <motion.div
          className="fixed pointer-events-none z-50"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 0.6,
            scale: 1,
            x: mousePosition.x - size / 2,
            y: mousePosition.y - size / 2,
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            mass: 0.5,
          }}
          style={{
            width: size,
            height: size,
            backgroundColor: baseColor,
            borderRadius: '50%',
            filter: 'blur(2px)',
            mixBlendMode: 'multiply',
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default MouseFollower;