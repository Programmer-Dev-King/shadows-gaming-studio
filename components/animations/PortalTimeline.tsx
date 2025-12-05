'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PortalTimelineProps {
  onComplete?: () => void;
  duration?: number;
  color?: string;
}

/**
 * PortalTimeline - SAO-inspired portal transition animation
 * Features rotating rings, glitch effects, and scan lines
 */
export const PortalTimeline: React.FC<PortalTimelineProps> = ({
  onComplete,
  duration = 1600,
  color = '#1F6BFF',
}) => {
  const [phase, setPhase] = useState<'rings' | 'glitch' | 'fade' | 'complete'>('rings');

  useEffect(() => {
    const timeline = [
      { time: 0, phase: 'rings' as const },
      { time: duration * 0.5, phase: 'glitch' as const },
      { time: duration * 0.8, phase: 'fade' as const },
      { time: duration, phase: 'complete' as const },
    ];

    const timers = timeline.map(({ time, phase: p }) =>
      setTimeout(() => {
        setPhase(p);
        if (p === 'complete') {
          onComplete?.();
        }
      }, time)
    );

    return () => timers.forEach(clearTimeout);
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-shadow-black/90 overflow-hidden">
      {/* Background Glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, ${color}20, transparent 70%)`,
        }}
        animate={{
          opacity: phase === 'fade' ? 0 : [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1,
          repeat: phase === 'fade' ? 0 : Infinity,
        }}
      />

      {/* Outer Ring */}
      <motion.div
        className="absolute w-80 h-80 rounded-full border-4"
        style={{ borderColor: color }}
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{
          scale: phase === 'fade' ? 2 : 1,
          rotate: 360,
          opacity: phase === 'fade' ? 0 : 1,
        }}
        transition={{
          scale: { duration: 0.8 },
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Middle Ring */}
      <motion.div
        className="absolute w-60 h-60 rounded-full border-2"
        style={{ borderColor: '#37F8FF' }}
        initial={{ scale: 0, rotate: 360, opacity: 0 }}
        animate={{
          scale: phase === 'fade' ? 1.5 : 1,
          rotate: 0,
          opacity: phase === 'fade' ? 0 : 0.8,
        }}
        transition={{
          scale: { duration: 0.6, delay: 0.1 },
          rotate: { duration: 1.5, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Inner Ring */}
      <motion.div
        className="absolute w-40 h-40 rounded-full border-2"
        style={{ borderColor: '#6F2BFF' }}
        initial={{ scale: 0, rotate: 0, opacity: 0 }}
        animate={{
          scale: phase === 'fade' ? 1 : 1,
          rotate: 360,
          opacity: phase === 'fade' ? 0 : 0.6,
        }}
        transition={{
          scale: { duration: 0.4, delay: 0.2 },
          rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
          opacity: { duration: 0.3 },
        }}
      />

      {/* Center Core */}
      <motion.div
        className="absolute w-20 h-20 rounded-full"
        style={{
          background: `radial-gradient(circle, ${color}, transparent)`,
          boxShadow: `0 0 60px ${color}`,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: phase === 'fade' ? 3 : [1, 1.2, 1],
          opacity: phase === 'fade' ? 0 : [0.8, 1, 0.8],
        }}
        transition={{
          scale: { duration: phase === 'fade' ? 0.5 : 0.8, repeat: phase === 'fade' ? 0 : Infinity },
          opacity: { duration: 0.5 },
        }}
      />

      {/* Glitch Effect */}
      {phase === 'glitch' && (
        <>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(90deg, transparent 45%, ${color}40 50%, transparent 55%)`,
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 0.2, repeat: 3 }}
          />
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(0deg, transparent 45%, #37F8FF40 50%, transparent 55%)`,
            }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 0.15, repeat: 4, delay: 0.05 }}
          />
        </>
      )}

      {/* Scan Lines */}
      <motion.div
        className="absolute w-full h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        initial={{ y: -200, opacity: 0 }}
        animate={{
          y: 200,
          opacity: phase === 'fade' ? 0 : [0, 0.8, 0],
        }}
        transition={{
          y: { duration: 1.5, repeat: Infinity },
          opacity: { duration: 0.3 },
        }}
      />

      {/* HUD Corner Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border-l-2 border-t-2"
        style={{ borderColor: color, opacity: 0.4 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: phase === 'fade' ? 0 : 0.4, scale: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-20 h-20 border-r-2 border-b-2"
        style={{ borderColor: color, opacity: 0.4 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: phase === 'fade' ? 0 : 0.4, scale: 1 }}
        transition={{ delay: 0.4 }}
      />

      {/* Status Text */}
      <motion.div
        className="absolute bottom-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === 'fade' ? 0 : 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-icy-blue font-mono text-sm animate-pulse">[PORTAL ACTIVE]</p>
      </motion.div>
    </div>
  );
};

export default PortalTimeline;
