'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalTimeline } from './PortalTimeline';

interface PortalDemoProps {
  showControls?: boolean;
}

/**
 * PortalDemo - Interactive demo component for portal animation
 * Allows testing different colors and durations
 */
export const PortalDemo: React.FC<PortalDemoProps> = ({ showControls = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [portalColor, setPortalColor] = useState('#1F6BFF');
  const [duration, setDuration] = useState(1600);

  const colorOptions = [
    { name: 'Jin-Woo Blue', value: '#1F6BFF' },
    { name: 'Cursed Purple', value: '#6F2BFF' },
    { name: 'Neon Cyan', value: '#37F8FF' },
    { name: 'Crystal Green', value: '#8EFFC1' },
    { name: 'Chakra Orange', value: '#FF6B18' },
  ];

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleComplete = () => {
    setIsPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="anime-text text-5xl mb-4"
            style={{ textShadow: `0 0 30px ${portalColor}` }}
          >
            PORTAL DEMO
          </h1>
          <p className="text-icy-blue text-lg">SAO-inspired portal transition animation</p>
        </motion.div>

        {/* Portal Animation */}
        {isPlaying && (
          <PortalTimeline
            color={portalColor}
            duration={duration}
            onComplete={handleComplete}
          />
        )}

        {/* Controls */}
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-lg p-8 border-2 border-jin-woo-blue"
          >
            <h2 className="text-xl font-bold text-jin-woo-blue mb-6">Animation Controls</h2>

            {/* Color Selection */}
            <div className="mb-6">
              <label className="block text-silver-white mb-3 font-semibold">Portal Color</label>
              <div className="flex flex-wrap gap-3">
                {colorOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setPortalColor(option.value)}
                    className={`px-4 py-2 rounded font-bold text-sm transition-all ${
                      portalColor === option.value
                        ? 'ring-2 ring-white'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: option.value,
                      color: option.value === '#8EFFC1' ? '#05070A' : '#fff',
                    }}
                  >
                    {option.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Duration Slider */}
            <div className="mb-8">
              <label className="block text-silver-white mb-3 font-semibold">
                Duration: {duration}ms
              </label>
              <input
                type="range"
                min="800"
                max="3000"
                step="100"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-abyss-blue rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-icy-blue text-xs mt-1">
                <span>Fast (800ms)</span>
                <span>Slow (3000ms)</span>
              </div>
            </div>

            {/* Play Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handlePlay}
              disabled={isPlaying}
              className="w-full py-4 bg-jin-woo-blue text-white font-bold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              style={{ backgroundColor: portalColor }}
            >
              {isPlaying ? 'PORTAL ACTIVE...' : 'ACTIVATE PORTAL'}
            </motion.button>
          </motion.div>
        )}

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 glass rounded-lg p-6 border border-neon-cyan/30"
        >
          <h3 className="text-neon-cyan font-bold mb-3">Animation Phases</h3>
          <ul className="text-silver-white text-sm space-y-2">
            <li>
              <span className="text-neon-cyan">1. Rings:</span> Rotating portal rings appear
            </li>
            <li>
              <span className="text-neon-cyan">2. Glitch:</span> Visual glitch effect pulses
            </li>
            <li>
              <span className="text-neon-cyan">3. Fade:</span> Portal expands and fades out
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default PortalDemo;
