'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BookWireframe() {
  const [words, setWords] = useState<Array<{ id: number; text: string; x: number; y: number; delay: number }>>([]);

  const educationWords = [
    'KNOWLEDGE', 'WISDOM', 'LEARNING', 'GROWTH', 'FUTURE', 'SUCCESS', 
    'EXCELLENCE', 'INNOVATION', 'CREATIVITY', 'DISCOVERY', 'ACHIEVEMENT', 
    'INSPIRATION', 'POTENTIAL', 'DREAMS', 'VISION', 'PROGRESS'
  ];

  useEffect(() => {
    const generateWords = () => {
      const newWords = [];
      for (let i = 0; i < 12; i++) {
        newWords.push({
          id: i,
          text: educationWords[Math.floor(Math.random() * educationWords.length)],
          x: Math.random() * 300 + 50,
          y: Math.random() * 200 + 50,
          delay: Math.random() * 2
        });
      }
      setWords(newWords);
    };

    generateWords();
    const interval = setInterval(generateWords, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-96 h-96">
      {/* Book Wireframe Structure */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Book Cover */}
        <motion.div
          className="absolute left-1/2 top-1/2 w-48 h-64 border-2 border-cyan-400/60 rounded-lg transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            boxShadow: [
              '0 0 20px rgba(0, 212, 255, 0.3)',
              '0 0 40px rgba(0, 212, 255, 0.6)',
              '0 0 20px rgba(0, 212, 255, 0.3)'
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {/* Book Spine */}
          <div className="absolute left-0 top-0 w-2 h-full bg-gradient-to-b from-cyan-400/40 to-blue-500/40 rounded-l-lg" />
          
          {/* Book Pages Lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-4 w-40 h-px bg-cyan-400/30"
              style={{ top: `${20 + i * 25}px` }}
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
          
          {/* Book Title Area */}
          <div className="absolute left-4 top-4 w-40 h-8 border border-yellow-400/40 rounded flex items-center justify-center">
            <motion.span 
              className="text-xs font-orbitron text-yellow-400 font-bold"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              EDUCATION
            </motion.span>
          </div>
        </motion.div>

        {/* Wireframe Grid Lines */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent"
            style={{ top: `${i * 60}px` }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
        
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute h-full w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
            style={{ left: `${i * 60}px` }}
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-8 right-8 w-8 h-8 border border-yellow-400/60"
          animate={{ 
            rotate: [0, 90, 180, 270, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-8 left-8 w-6 h-6 border border-purple-400/60 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute top-16 left-16 w-4 h-8 border-l-2 border-t-2 border-pink-400/60"
          animate={{ 
            rotateZ: [0, 45, 90, 135, 180],
            x: [0, 10, 0, -10, 0]
          }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </motion.div>

      {/* Floating Words */}
      {words.map((word) => (
        <motion.div
          key={word.id}
          className="absolute text-xs font-orbitron font-bold text-cyan-300/70"
          style={{ left: word.x, top: word.y }}
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ 
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            y: [20, 0, -10, -30],
            x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30]
          }}
          transition={{ 
            duration: 4,
            delay: word.delay,
            repeat: Infinity,
            repeatDelay: 4
          }}
        >
          {word.text}
        </motion.div>
      ))}

      {/* Data Flow Lines */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(0,212,255,0.1) 50%, transparent 100%)',
        }}
        animate={{
          background: [
            'linear-gradient(45deg, transparent 0%, rgba(0,212,255,0.1) 50%, transparent 100%)',
            'linear-gradient(135deg, transparent 0%, rgba(255,215,0,0.1) 50%, transparent 100%)',
            'linear-gradient(225deg, transparent 0%, rgba(157,0,255,0.1) 50%, transparent 100%)',
            'linear-gradient(315deg, transparent 0%, rgba(0,212,255,0.1) 50%, transparent 100%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Central Glow Effect */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-32 h-32 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)'
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  );
}