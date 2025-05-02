import React from 'react';
import { motion } from 'framer-motion';
import { Bot, MessageSquare, Phone, Star, Sparkles } from 'lucide-react';

const FloatingElements: React.FC = () => {
  const elements = [
    { Icon: Bot, delay: 0, duration: 20, size: 24 },
    { Icon: MessageSquare, delay: 2, duration: 15, size: 20 },
    { Icon: Sparkles, delay: 4, duration: 18, size: 16 },
    { Icon: Star, delay: 1, duration: 25, size: 14 },
    { Icon: Bot, delay: 3, duration: 22, size: 18 },
    { Icon: Star, delay: 5, duration: 17, size: 12 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((Element, index) => (
        <motion.div
          key={index}
          className="absolute text-primary/5"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100
          }}
          animate={{
            y: -100,
            x: ['0%', '100%', '0%'],
            rotate: [0, 360]
          }}
          transition={{
            duration: Element.duration,
            delay: Element.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Element.Icon size={Element.size} />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;