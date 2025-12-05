'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SummoningTimelineProps {
  characterName: string;
  role: string;
  title?: string;
  summoningColor?: string;
  onComplete?: () => void;
  duration?: number;
}

type SummoningPhase = 'circle' | 'rise' | 'reveal' | 'complete';

/**
 * SummoningTimeline - Naruto-style summoning sequence
 * Circle appears → Shadow rises → Character revealed
 */
export const SummoningTimeline: React.FC<SummoningTimelineProps> = ({
  characterName,
  role,
  title,
  summoningColor = '#1F6BFF',
  onComplete,
  duration = 2200,
}) => {
  const [phase, setPhase] = useState<SummoningPhase>('circle');

  useEffect(() => {
    const circleTime = duration * 0.3;
    const riseTime = duration * 0.4;
    const revealTime = duration * 0.3;

    const timer1 = setTimeout(() => setPhase('rise'), circleTime);
    const timer2 = setTimeout(() => setPhase('reveal'), circleTime + riseTime);
    const timer3 = setTimeout(() => {
      setPhase('complete');
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-shadow-black/95 overflow-hidden">
      {/* Background Smoke */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center bottom, ${summoningColor}30, transparent 60%)`,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: phase !== 'circle' ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />

      {/* Summoning Circle */}
      <AnimatePresence>
        {(phase === 'circle' || phase === 'rise') && (
          <motion.div
            className="absolute bottom-20 w-[400px] h-[200px]"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            {/* Outer Circle */}
            <motion.div
              className="absolute inset-0 rounded-full border-4"
              style={{
                borderColor: summoningColor,
                boxShadow: `0 0 30px ${summoningColor}`,
                transform: 'rotateX(70deg)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner Symbols */}
            <motion.div
              className="absolute inset-8 rounded-full border-2"
              style={{
                borderColor: summoningColor,
                boxShadow: `0 0 20px ${summoningColor}`,
                transform: 'rotateX(70deg)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />

            {/* Center Glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full"
              style={{
                background: `radial-gradient(circle, ${summoningColor}, transparent)`,
                boxShadow: `0 0 50px ${summoningColor}`,
              }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rising Shadow */}
      <AnimatePresence>
        {(phase === 'rise' || phase === 'reveal') && (
          <motion.div
            className="absolute flex flex-col items-center"
            initial={{ opacity: 0, y: 200, scale: 0.5 }}
            animate={{
              opacity: 1,
              y: phase === 'reveal' ? 0 : 50,
              scale: phase === 'reveal' ? 1 : 0.8,
            }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Character Silhouette/Placeholder */}
            <motion.div
              className="w-40 h-40 rounded-full mb-8"
              style={{
                background: `linear-gradient(135deg, ${summoningColor}, ${summoningColor}80)`,
                boxShadow: `0 0 50px ${summoningColor}, 0 0 100px ${summoningColor}50`,
              }}
              animate={{
                boxShadow: [
                  `0 0 50px ${summoningColor}`,
                  `0 0 80px ${summoningColor}`,
                  `0 0 50px ${summoningColor}`,
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Character Name */}
            <motion.h2
              className="text-5xl font-black tracking-wider mb-2"
              style={{
                color: summoningColor,
                textShadow: `0 0 30px ${summoningColor}, 0 0 60px ${summoningColor}`,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: phase === 'reveal' ? 1 : 0, y: phase === 'reveal' ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {characterName.toUpperCase()}
            </motion.h2>

            {/* Role */}
            <motion.p
              className="text-xl font-bold text-icy-blue mb-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase === 'reveal' ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {role}
            </motion.p>

            {/* Title */}
            {title && (
              <motion.p
                className="text-lg text-silver-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: phase === 'reveal' ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {title}
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smoke Particles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full"
          style={{
            background: `radial-gradient(circle, ${summoningColor}50, transparent)`,
            left: `${30 + Math.random() * 40}%`,
            bottom: '10%',
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: -300 - Math.random() * 200,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 2 + Math.random(),
            delay: i * 0.1,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
        />
      ))}

      {/* Status Text */}
      <motion.p
        className="absolute bottom-8 text-icy-blue font-mono text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {phase === 'circle' && '[SUMMONING JUTSU...]'}
        {phase === 'rise' && '[SHADOW RISING...]'}
        {phase === 'reveal' && '[SUMMONED]'}
      </motion.p>
    </div>
  );
};

export default SummoningTimeline;
