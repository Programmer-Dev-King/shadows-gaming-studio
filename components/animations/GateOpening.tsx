// components/animations/GateOpening. tsx

'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SoundManager from '@/lib/sounds';

interface GateOpeningProps {
  onComplete?: () => void;
  autoClose?: boolean;
  duration?: number;
}

export const GateOpening: React.FC<GateOpeningProps> = ({
  onComplete,
  autoClose = true,
  duration = 2000,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const soundManager = new SoundManager();

  useEffect(() => {
    soundManager.playSound('gate-opening');

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 300);

    if (autoClose) {
      const closeTimer = setTimeout(() => {
        onComplete?.();
      }, duration);

      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }

    return () => clearTimeout(timer);
  }, []);

  const leftDoor = {
    initial: { x: 0 },
    animate: { x: -200 },
    transition: { duration: 1. 6, ease: 'easeInOut' },
  };

  const rightDoor = {
    initial: { x: 0 },
    animate: { x: 200 },
    transition: { duration: 1.6, ease: 'easeInOut' },
  };

  const glowEffect = {
    initial: { opacity: 0 },
    animate: { opacity: [0, 1, 0. 5] },
    transition: { duration: 2, ease: 'easeInOut' },
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-shadow-black overflow-hidden z-50">
      {/* Background Mist */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-jin-woo-blue/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-jin-woo-blue/10"
        {... glowEffect}
      />

      {/* Left Gate Door */}
      <motion.div
        className="absolute left-0 w-1/2 h-full bg-gradient-to-r from-abyss-blue to-jin-woo-blue border-r-4 border-jin-woo-blue"
        variants={leftDoor}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jin-woo-blue/20 to-transparent" />
        </div>
      </motion.div>

      {/* Right Gate Door */}
      <motion.div
        className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-abyss-blue to-jin-woo-blue border-l-4 border-jin-woo-blue"
        variants={rightDoor}
        initial="initial"
        animate="animate"
      >
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jin-woo-blue/20 to-transparent" />
        </div>
      </motion.div>

      {/* Center Text */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <h1 className="anime-text glow-blue">SHADOWS</h1>
        <p className="text-jin-woo-blue text-lg animate-typewriter">
          Gaming Studio
        </p>
      </motion.div>
    </div>
  );
};
