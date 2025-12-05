'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SummoningTimelineProps {
  characterName: string;
  role: string;
  title?: string;
  summoningColor?: string;
  onComplete?: () => void;
  duration?: number;
}

/**
 * SummoningTimeline - Solo Leveling inspired summoning animation
 * Features summoning circle, shadow rise, and character reveal
 */
export const SummoningTimeline: React.FC<SummoningTimelineProps> = ({
  characterName,
  role,
  title = '',
  summoningColor = '#1F6BFF',
  onComplete,
  duration = 2200,
}) => {
  const [phase, setPhase] = useState<'circle' | 'rise' | 'reveal' | 'complete'>('circle');

  useEffect(() => {
    const timeline = [
      { time: 0, phase: 'circle' as const },
      { time: duration * 0.35, phase: 'rise' as const },
      { time: duration * 0.65, phase: 'reveal' as const },
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 overflow-hidden">
      {/* Background Aura */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center bottom, ${summoningColor}30, transparent 70%)`,
        }}
        animate={{
          opacity: phase === 'complete' ? 0 : [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 1.5, repeat: phase === 'complete' ? 0 : Infinity }}
      />

      {/* Summoning Circle - Outer */}
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: phase === 'circle' || phase === 'rise' ? 1 : 1.2,
          opacity: phase === 'complete' ? 0 : 1,
          rotate: 360,
        }}
        transition={{
          scale: { duration: 0.8 },
          opacity: { duration: 0.5 },
          rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
        }}
      >
        <svg width="350" height="350" viewBox="0 0 350 350">
          {/* Outer Circle */}
          <circle
            cx="175"
            cy="175"
            r="160"
            fill="none"
            stroke={summoningColor}
            strokeWidth="3"
            opacity="0.8"
          />
          {/* Rune Circle */}
          <circle
            cx="175"
            cy="175"
            r="130"
            fill="none"
            stroke={summoningColor}
            strokeWidth="1"
            strokeDasharray="10 5"
            opacity="0.5"
          />
          {/* Inner Circle */}
          <circle
            cx="175"
            cy="175"
            r="100"
            fill="none"
            stroke={summoningColor}
            strokeWidth="2"
            opacity="0.6"
          />
          {/* Center Rune */}
          <text
            x="175"
            y="185"
            textAnchor="middle"
            fill={summoningColor}
            fontSize="24"
            fontWeight="bold"
          >
            ◆ ARISE ◆
          </text>
        </svg>
      </motion.div>

      {/* Shadow Rising Effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-48 -translate-x-1/2"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: phase === 'rise' || phase === 'reveal' ? '60%' : 0,
          opacity: phase === 'rise' || phase === 'reveal' ? 0.8 : 0,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          background: `linear-gradient(to top, ${summoningColor}, transparent)`,
          filter: 'blur(30px)',
        }}
      />

      {/* Shadow Silhouette */}
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 0, y: 100 }}
        animate={{
          scale: phase === 'rise' || phase === 'reveal' ? 1 : 0,
          opacity: phase === 'reveal' ? 1 : phase === 'rise' ? 0.5 : 0,
          y: phase === 'rise' || phase === 'reveal' ? 0 : 100,
        }}
        transition={{ duration: 0.6, delay: phase === 'rise' ? 0.2 : 0 }}
      >
        <div
          className="w-32 h-48 rounded-t-full"
          style={{
            background: `linear-gradient(180deg, ${summoningColor}80, ${summoningColor}20)`,
            boxShadow: `0 0 40px ${summoningColor}, inset 0 0 20px ${summoningColor}40`,
          }}
        />
      </motion.div>

      {/* Character Info Card */}
      {(phase === 'reveal' || phase === 'complete') && (
        <motion.div
          className="absolute bottom-16 glass rounded-lg p-6 border-2 max-w-sm text-center"
          style={{ borderColor: summoningColor }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: phase === 'complete' ? 0 : 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="anime-text text-3xl mb-2"
            style={{ textShadow: `0 0 20px ${summoningColor}` }}
          >
            {characterName}
          </motion.h2>
          <p className="text-lg font-bold mb-1" style={{ color: summoningColor }}>
            {role}
          </p>
          {title && <p className="text-icy-blue text-sm mb-3">{title}</p>}
          <motion.p
            className="text-crystal-green text-xs font-mono"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            [SUMMONED SUCCESSFULLY]
          </motion.p>
        </motion.div>
      )}

      {/* Particle Effects */}
      {(phase === 'rise' || phase === 'reveal') && (
        <>
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ background: summoningColor }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: Math.cos((i / 16) * Math.PI * 2) * 180,
                y: Math.sin((i / 16) * Math.PI * 2) * 180 - 100,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: 'easeOut',
              }}
            />
          ))}
        </>
      )}

      {/* Status Indicator */}
      <motion.div
        className="absolute top-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-icy-blue font-mono text-sm">
          {phase === 'circle' && '[INITIATING SUMMON...]'}
          {phase === 'rise' && '[SHADOW EMERGING...]'}
          {phase === 'reveal' && '[SUMMON COMPLETE]'}
        </p>
      </motion.div>
    </div>
  );
};

export default SummoningTimeline;
