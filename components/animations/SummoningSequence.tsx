'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface SummoningSequenceProps {
  characterName: string;
  summoningColor: string;
  onComplete?: () => void;
  duration?: number;
}

export const SummoningSequence: React.FC<SummoningSequenceProps> = ({
  characterName,
  summoningColor,
  onComplete,
  duration = 2200,
}) => {
  const [showText, setShowText] = React. useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 1000);
    const completeTimer = setTimeout(() => onComplete?. (), duration);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [duration, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-40">
      {/* Summoning Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: 0 }}
        animate={{ scale: 1, opacity: 1, rotate: 360 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute"
      >
        <svg width="300" height="300" viewBox="0 0 300 300">
          <circle
            cx="150"
            cy="150"
            r="140"
            fill="none"
            stroke={summoningColor}
            strokeWidth="2"
            opacity="0.8"
          />
          <circle
            cx="150"
            cy="150"
            r="100"
            fill="none"
            stroke={summoningColor}
            strokeWidth="1"
            opacity="0.5"
          />
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
      </motion.div>

      {/* Shadow Rising */}
      <motion.div
        className="relative z-10"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div
          className="w-40 h-64 rounded-lg"
          style={{
            background: `linear-gradient(180deg, ${summoningColor} 0%, transparent 100%)`,
            boxShadow: `0 0 30px ${summoningColor}`,
          }}
        />
      </motion.div>

      {/* Character Name */}
      {showText && (
        <motion.div
          className="absolute bottom-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="anime-text text-4xl"
            style={{ textShadow: `0 0 20px ${summoningColor}` }}
          >
            {characterName}
          </h2>
          <p className="text-sm mt-2" style={{ color: summoningColor }}>
            SUMMONED
          </p>
        </motion.div>
      )}
    </div>
  );
};
