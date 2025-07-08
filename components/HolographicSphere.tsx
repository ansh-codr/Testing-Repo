'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function HolographicSphere() {
  const [nodes, setNodes] = useState<Array<{ x: number; y: number; z: number }>>([]);

  useEffect(() => {
    const generateNodes = () => {
      const newNodes = [];
      for (let i = 0; i < 50; i++) {
        const phi = Math.acos(-1 + (2 * i) / 50);
        const theta = Math.sqrt(50 * Math.PI) * phi;
        
        newNodes.push({
          x: Math.cos(theta) * Math.sin(phi),
          y: Math.sin(theta) * Math.sin(phi),
          z: Math.cos(phi)
        });
      }
      setNodes(newNodes);
    };

    generateNodes();
  }, []);

  return (
    <div className="relative w-64 h-64 mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.1) 0%, transparent 70%)',
          boxShadow: '0 0 50px rgba(0,212,255,0.3), inset 0 0 50px rgba(0,212,255,0.1)'
        }}
      />
      
      {nodes.map((node, index) => (
        <motion.div
          key={index}
          className="absolute w-2 h-2 bg-cyan-400 rounded-full"
          style={{
            left: `${50 + node.x * 40}%`,
            top: `${50 + node.y * 40}%`,
            boxShadow: '0 0 10px #00d4ff'
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}
      
      <motion.div
        className="absolute inset-4 rounded-full border border-yellow-400/50"
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute inset-8 rounded-full border border-purple-400/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}