'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'cyan' | 'green' | 'orange';
}

const glowStyles = {
  blue: 'border-jin-woo-blue shadow-[0_0_20px_rgba(31,107,255,0.3)]',
  purple: 'border-cursed-purple shadow-[0_0_20px_rgba(111,43,255,0.3)]',
  cyan: 'border-neon-cyan shadow-[0_0_20px_rgba(55,248,255,0.3)]',
  green: 'border-crystal-green shadow-[0_0_20px_rgba(142,255,193,0.3)]',
  orange: 'border-chakra-orange shadow-[0_0_20px_rgba(255,107,24,0.3)]',
};

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
}) => {
  return (
    <motion. div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`glass rounded-lg p-6 border-2 ${glowStyles[glowColor]} ${className}`}
    >
      {children}
    </motion.div>
  );
};
