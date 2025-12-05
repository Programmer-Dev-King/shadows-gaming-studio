'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PortalTimelineProps {
  onComplete?: () => void;
  duration?: number;
  color?: string;
}

/**
 * PortalTimeline - Solo Leveling style portal transition
 * Three concentric rotating rings with center glow
 */
export const PortalTimeline: React.FC<PortalTimelineProps> = ({
  onComplete,
  duration = 1600,
  color = '#1F6BFF',
}) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  const durationSec = duration / 1000;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-shadow-black/90 overflow-hidden">
      {/* Background Pulse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${color}20, transparent 70%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.3] }}
        transition={{ duration: durationSec }}
      />

      {/* Outer Ring */}
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full"
        style={{
          border: `4px solid ${color}`,
          boxShadow: `0 0 40px ${color}, inset 0 0 40px ${color}40`,
        }}
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.1, 1],
          rotate: [0, 360],
          opacity: [0, 1, 0.8],
        }}
        transition={{ duration: durationSec, ease: 'easeOut' }}
      />

      {/* Middle Ring */}
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full"
        style={{
          border: `3px solid #37F8FF`,
          boxShadow: `0 0 30px #37F8FF, inset 0 0 30px #37F8FF40`,
        }}
        initial={{ scale: 0, rotate: 360, opacity: 0 }}
        animate={{
          scale: [0, 1.1, 1],
          rotate: [360, 0],
          opacity: [0, 1, 0.8],
        }}
        transition={{ duration: durationSec * 0.9, delay: 0.1, ease: 'easeOut' }}
      />

      {/* Inner Ring */}
      <motion.div
        className="absolute w-[200px] h-[200px] rounded-full"
        style={{
          border: `2px solid #6F2BFF`,
          boxShadow: `0 0 25px #6F2BFF, inset 0 0 25px #6F2BFF40`,
        }}
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{
          scale: [0, 1.2, 1],
          rotate: [0, 360],
          opacity: [0, 1, 0.8],
        }}
        transition={{ duration: durationSec * 0.8, delay: 0.2, ease: 'easeOut' }}
      />

      {/* Center Vortex */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}, transparent)`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0.6],
          scale: [0, 1.5, 1],
        }}
        transition={{ duration: durationSec, ease: 'easeOut' }}
      />

      {/* Center Core */}
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-white"
        style={{
          boxShadow: `0 0 50px white, 0 0 100px ${color}`,
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0, 2, 0],
        }}
        transition={{ duration: durationSec, ease: 'easeInOut' }}
      />

      {/* Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? color : '#37F8FF',
            boxShadow: `0 0 10px ${i % 2 === 0 ? color : '#37F8FF'}`,
          }}
          initial={{
            opacity: 0,
            x: 0,
            y: 0,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: Math.cos((i / 20) * Math.PI * 2) * 250,
            y: Math.sin((i / 20) * Math.PI * 2) * 250,
          }}
          transition={{
            duration: durationSec * 0.8,
            delay: i * 0.05,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Status Text */}
      <motion.p
        className="absolute bottom-32 text-icy-blue font-mono text-sm tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        [PORTAL ACTIVE]
      </motion.p>
    </div>
  );
};

export default PortalTimeline;
