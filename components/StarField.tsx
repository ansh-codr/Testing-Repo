'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';
import MovingFrames from './MovingFrames';
import WireframeGrid from './WireframeGrid';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  color: string;
  speed: number;
  direction: number;
}

export default function StarField() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ['#00d4ff', '#FFD700', '#ffffff', '#9D00FF', '#FF00F7'];
      
      for (let i = 0; i < 100; i++) { // Reduced particle count for better performance
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 0.5,
          direction: Math.random() * 360
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Deep space background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A23] via-[#000000] to-[#0f0c29]" />
      
      {/* Wireframe grid overlay */}
      <WireframeGrid />
      
      {/* Moving geometric frames */}
      <MovingFrames />
      
      {/* Particle system */}
      <ParticleBackground />
      
      {/* Animated cosmic layers */}
      <div className="absolute inset-0 opacity-30">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(157,0,255,0.2) 0%, transparent 70%)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>
      
      {/* Floating enhanced particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
          animate={{
            x: [0, Math.cos(particle.direction) * 30, 0],
            y: [0, Math.sin(particle.direction) * 30, 0],
            opacity: [particle.opacity, particle.opacity * 0.2, particle.opacity],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: particle.speed + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Scanning lines effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,212,255,0.1) 50%, transparent 100%)',
          width: '200%',
        }}
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Subtle overlay for content readability */}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}