'use client';

import { motion } from 'framer-motion';

export default function WireframeGrid() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Horizontal lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
          style={{ top: `${i * 5}%` }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleX: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
      
      {/* Vertical lines */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
          style={{ left: `${i * 5}%` }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
      
      {/* Diagonal scanning lines */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-400/5"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(0,212,255,0.05) 0%, transparent 50%, rgba(157,0,255,0.05) 100%)',
            'linear-gradient(45deg, rgba(157,0,255,0.05) 0%, transparent 50%, rgba(255,215,0,0.05) 100%)',
            'linear-gradient(45deg, rgba(255,215,0,0.05) 0%, transparent 50%, rgba(0,212,255,0.05) 100%)',
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
        }}
      />
    </div>
  );
}