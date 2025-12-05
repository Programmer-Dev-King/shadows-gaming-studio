'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface SummoningSequenceAdvancedProps {
  characterName: string;
  role: string;
  title: string;
  summoningColor: string;
  onComplete?: () => void;
  duration?: number;
}

export const SummoningSequenceAdvanced: React.FC<SummoningSequenceAdvancedProps> = ({
  characterName,
  role,
  title,
  summoningColor,
  onComplete,
  duration = 2200,
}) => {
  const [phase, setPhase] = useState<'initial' | 'circle' | 'rise' | 'reveal' | 'complete'>('initial');

  useEffect(() => {
    const timeline = [
      { time: 0, phase: 'circle' as const },
      { time: 800, phase: 'rise' as const },
      { time: 1400, phase: 'reveal' as const },
      { time: duration, phase: 'complete' as const },
    ];

    timeline.forEach(({ time, phase: ph }) => {
      setTimeout(() => {
        setPhase(ph);
        if (ph === 'complete') {
          onComplete?.();
        }
      }, time);
    });
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-40">
      {/* SUMMONING CIRCLE - Rotating */}
      <motion.div
        className="absolute"
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{
          scale: phase === 'circle' || phase === 'rise' || phase === 'reveal' ? 1 : 0,
          opacity: phase === 'circle' || phase === 'rise' || phase === 'reveal' ? 1 : 0,
          rotate: phase === 'circle' || phase === 'rise' || phase === 'reveal' ? 360 : 0,
        }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <svg width="300" height="300" viewBox="0 0 300 300">
          {/* Outer circle */}
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke={summoningColor}
            strokeWidth="2"
            opacity="0.8"
          />
          {/* Inner circle */}
          <circle
            cx="150"
            cy="150"
            r="100"
            fill="none"
            stroke={summoningColor}
            strokeWidth="1"
            opacity="0.5"
          />
          {/* Runes */}
          <text
            x="150"
            y="160"
            textAnchor="middle"
            fill={summoningColor}
            fontSize="20"
            fontWeight="bold"
            opacity="0.7"
          >
            ◆ ★ ◆
          </text>
        </svg>
      </motion. div>

      {/* SHADOW RISING - Center */}
      <motion.div
        className="relative z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: phase === 'rise' || phase === 'reveal' ? 0 : 100,
          opacity: phase === 'rise' || phase === 'reveal' ?  1 : 0,
        }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div
          className="w-40 h-64 rounded-lg"
          style={{
            background: `linear-gradient(180deg, ${summoningColor} 0%, transparent 100%)`,
            boxShadow: `0 0 40px ${summoningColor}, inset 0 0 30px ${summoningColor}`,
          }}
        />
      </motion.div>

      {/* CHARACTER CARD REVEAL - Bottom */}
      {phase === 'reveal' && (
        <motion.div
          className="absolute bottom-20 bg-gradient-to-b from-abyss-blue to-shadow-black border-2 rounded-lg p-8 max-w-md"
          style={{ borderColor: summoningColor }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="anime-text text-4xl mb-2"
            style={{ textShadow: `0 0 20px ${summoningColor}` }}
          >
            {characterName}
          </h2>
          <p className="text-lg font-bold mb-2" style={{ color: summoningColor }}>
            {role}
          </p>
          <p className="text-icy-blue text-sm mb-4">{title}</p>
          <p className="text-silver-white text-sm">SUMMONED</p>
        </motion.div>
      )}

      {/* ANIMATED PARTICLES */}
      {(phase === 'rise' || phase === 'reveal') && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ background: summoningColor }}
              initial={{
                x: Math.cos((i / 12) * Math.PI * 2) * 50,
                y: Math.sin((i / 12) * Math.PI * 2) * 50,
                opacity: 1,
              }}
              animate={{
                x: Math.cos((i / 12) * Math. PI * 2) * 150,
                y: Math.sin((i / 12) * Math.PI * 2) * 150,
                opacity: 0,
              }}
              transition={{ duration: 1. 5, delay: 0.3 }}
            />
          ))}
        </>
      )}
    </div>
  );
};
