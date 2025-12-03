'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'awakening' | 'cursed' | 'holo' | 'chakra' | 'default';
  className?: string;
  disabled?: boolean;
}

const variantStyles = {
  awakening: 'bg-jin-woo-blue text-white hover:shadow-lg hover:glow-blue',
  cursed: 'bg-cursed-purple text-white hover:shadow-lg hover:glow-purple',
  holo: 'bg-neon-cyan text-shadow-black hover:shadow-lg hover:glow-cyan',
  chakra: 'bg-chakra-orange text-white hover:shadow-lg',
  default: 'bg-silver-white text-shadow-black hover:shadow-lg',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'default',
  className = '',
  disabled = false,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded font-bold transition-all ${variantStyles[variant]} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </motion.button>
  );
};
