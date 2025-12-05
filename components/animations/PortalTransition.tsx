'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface PortalTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
}

export const PortalTransition: React.FC<PortalTransitionProps> = ({
  isActive,
  onComplete,
}) => {
  useEffect(() => {
    if (isActive && onComplete) {
      const timer = setTimeout(onComplete, 1600);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Outer Ring */}
        <motion.div
          className="absolute w-96 h-96 border-4 border-jin-woo-blue rounded-full"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          exit={{ scale: 0 }}
          transition={{ duration: 1.6 }}
          style={{
            boxShadow: '0 0 30px #1F6BFF',
          }}
        />

        {/* Middle Ring */}
        <motion.div
          className="absolute w-72 h-72 border-2 border-neon-cyan rounded-full"
          initial={{ scale: 0, rotate: 360 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0 }}
          transition={{ duration: 1.6 }}
          style={{
            boxShadow: '0 0 20px #37F8FF',
          }}
        />

        {/* Inner Ring */}
        <motion.div
          className="absolute w-48 h-48 border-2 border-cursed-purple rounded-full"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          exit={{ scale: 0 }}
          transition={{ duration: 1.6 }}
          style={{
            boxShadow: '0 0 20px #6F2BFF',
          }}
        />

        {/* Center Glow */}
        <motion.div
          className="absolute w-32 h-32 bg-gradient-radial from-jin-woo-blue to-transparent rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.5] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6 }}
        />
      </motion.div>

      {/* Shadow Overlay */}
      <motion.div
        className="absolute inset-0 bg-shadow-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.3, 0] }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.6 }}
      />
    </div>
  );
};
