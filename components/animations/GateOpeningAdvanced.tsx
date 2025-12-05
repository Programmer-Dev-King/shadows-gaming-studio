'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface GateOpeningAdvancedProps {
  onComplete?: () => void;
  duration?: number;
}

export const GateOpeningAdvanced: React.FC<GateOpeningAdvancedProps> = ({
  onComplete,
  duration = 2000,
}) => {
  const [animationPhase, setAnimationPhase] = useState<string>('initial');

  useEffect(() => {
    // Listen for animation phases
    const handlePhase = (e: any) => {
      setAnimationPhase(e.detail.phase);
    };

    document.addEventListener('animationPhase', handlePhase);

    // Sequence timeline
    const timeline = [
      { time: 0, phase: 'gateMovement' },
      { time: 400, phase: 'auraShadowRise' },
      { time: 800, phase: 'textGlow' },
      { time: duration, phase: 'complete' },
    ];

    timeline.forEach(({ time, phase }) => {
      setTimeout(() => {
        setAnimationPhase(phase);
        if (phase === 'complete') {
          onComplete?.();
        }
      }, time);
    });

    return () => {
      document.removeEventListener('animationPhase', handlePhase);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-shadow-black overflow-hidden z-50">
      {/* Background Gradient Mist */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center bottom, rgba(31, 107, 255, 0.3), transparent 70%)',
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: animationPhase !== 'initial' ? [0.1, 0.3, 0.1] : 0,
        }}
        transition={{ duration: 2 }}
      />

      {/* LEFT GATE DOOR - Solo Leveling Blue */}
      <motion.div
        className="absolute left-0 w-1/2 h-full bg-gradient-to-r from-shadow-black via-abyss-blue to-jin-woo-blue border-r-4 border-jin-woo-blue"
        initial={{ x: 0 }}
        animate={{
          x: animationPhase === 'gateMovement' ? -500 : 0,
        }}
        transition={{
          duration: 1.6,
          ease: 'easeInOut',
          delay: 0,
        }}
        style={{
          boxShadow: animationPhase === 'gateMovement' ? '10px 0 40px rgba(31, 107, 255, 0.8)' : 'none',
        }}
      >
        {/* Gate texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jin-woo-blue/20 to-transparent" />
      </motion.div>

      {/* RIGHT GATE DOOR - Solo Leveling Blue */}
      <motion.div
        className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-shadow-black via-abyss-blue to-jin-woo-blue border-l-4 border-jin-woo-blue"
        initial={{ x: 0 }}
        animate={{
          x: animationPhase === 'gateMovement' ? 500 : 0,
        }}
        transition={{
          duration: 1.6,
          ease: 'easeInOut',
          delay: 0,
        }}
        style={{
          boxShadow: animationPhase === 'gateMovement' ? '-10px 0 40px rgba(31, 107, 255, 0.8)' : 'none',
        }}
      >
        {/* Gate texture overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-jin-woo-blue/20 to-transparent" />
      </motion.div>

      {/* SHADOW AURA RISING - Center bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-96 h-96 -translate-x-1/2"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{
          opacity: animationPhase === 'auraShadowRise' ?  [0, 1, 0.7] : 0,
          scaleY: animationPhase === 'auraShadowRise' ? 1 : 0,
        }}
        transition={{
          duration: 1.2,
          delay: 0.4,
        }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(31, 107, 255, 0.4), transparent 60%)',
          filter: 'blur(40px)',
        }}
      />

      {/* CENTER GLOWING TEXT */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: animationPhase === 'textGlow' ? 1 : 0,
          scale: animationPhase === 'textGlow' ? 1 : 0.5,
        }}
        transition={{
          duration: 0.8,
          delay: 0.8,
        }}
      >
        <h1
          className="anime-text text-8xl font-black mb-4"
          style={{
            color: '#1F6BFF',
            textShadow: animationPhase === 'textGlow' 
              ? '0 0 30px #1F6BFF, 0 0 60px #1F6BFF, 0 0 90px #1F6BFF' 
              : '0 0 10px #1F6BFF',
            letterSpacing: '0.05em',
          }}
        >
          SHADOWS
        </h1>
        <p className="text-2xl font-bold" style={{ color: '#A5C7FF' }}>
          Gaming Studio
        </p>
      </motion.div>

      {/* SAO HUD SCANNING ELEMENTS */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 border-2 border-jin-woo-blue"
        style={{ opacity: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase === 'textGlow' ? 0.3 : 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="w-full h-full flex items-center justify-center text-jin-woo-blue text-sm">
          [SCANNING]
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 w-40 h-16 border-2 border-jin-woo-blue"
        style={{ opacity: 0.3 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: animationPhase === 'textGlow' ? 0.3 : 0 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-full h-full border-l-2 border-jin-woo-blue"
          animate={{ x: ['0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};
