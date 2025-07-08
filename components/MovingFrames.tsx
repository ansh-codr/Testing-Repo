'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Frame {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  opacity: number;
  color: string;
}

export default function MovingFrames() {
  const [frames, setFrames] = useState<Frame[]>([]);

  useEffect(() => {
    const generateFrames = () => {
      const newFrames: Frame[] = [];
      const colors = ['#00d4ff', '#FFD700', '#9D00FF', '#FF00F7'];
      
      for (let i = 0; i < 12; i++) {
        newFrames.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 100 + 50,
          rotation: Math.random() * 360,
          opacity: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setFrames(newFrames);
    };

    generateFrames();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {frames.map((frame) => (
        <motion.div
          key={frame.id}
          className="absolute border-2 rounded-lg"
          style={{
            left: `${frame.x}%`,
            top: `${frame.y}%`,
            width: `${frame.size}px`,
            height: `${frame.size}px`,
            borderColor: frame.color,
            opacity: frame.opacity,
            boxShadow: `0 0 20px ${frame.color}`,
          }}
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 60, 0],
            rotate: [frame.rotation, frame.rotation + 180, frame.rotation + 360],
            scale: [1, 1.2, 0.8, 1],
            opacity: [frame.opacity, frame.opacity * 0.5, frame.opacity],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
}