'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export default function GlassCard({ children, className = '', hover = true, glow = false }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={`
        glass-card rounded-2xl p-6
        ${hover ? 'glass-card-hover' : ''}
        ${glow ? 'glow-border' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}