'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface GateOpeningProps {
  onComplete?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const GateOpening: React. FC<GateOpeningProps> = ({
  onComplete,
  autoClose = true,
  duration = 2000,
}) => {
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, autoClose, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-shadow-black overflow-hidden z-50">
      {/* Background Mist */}
      <motion. div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'radial-gradient(ellipse at center, #1F6BFF 0%, transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        transition={{ duration: 2 }}
      />

      {/* Left Gate Door */}
      <motion.div
        className="absolute left-0 w-1/2 h-full bg-gradient-to-r from-abyss-blue to-jin-woo-blue border-r-4 border-jin-woo-blue"
        initial={{ x: 0 }}
        animate={{ x: -500 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jin-woo-blue/20 to-transparent" />
        </div>
      </motion.div>

      {/* Right Gate Door */}
      <motion.div
        className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-abyss-blue to-jin-woo-blue border-l-4 border-jin-woo-blue"
        initial={{ x: 0 }}
        animate={{ x: 500 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jin-woo-blue/20 to-transparent" />
        </div>
      </motion.div>

      {/* Center Text */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h1 className="anime-text text-8xl glow-blue">SHADOWS</h1>
        <p className="text-2xl text-jin-woo-blue mt-4 animate-typewriter">
          Gaming Studio
        </p>
      </motion.div>
    </div>
  );
};
