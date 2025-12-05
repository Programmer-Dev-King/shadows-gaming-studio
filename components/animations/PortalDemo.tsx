'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PortalTimeline } from './PortalTimeline';

/**
 * PortalDemo - Demo page for Portal Timeline animation
 * Allows triggering and customizing the portal effect
 */
export const PortalDemo: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(1600);
  const [color, setColor] = useState('#1F6BFF');

  const handleTrigger = () => {
    setIsActive(true);
  };

  const handleComplete = () => {
    setIsActive(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl font-black mb-4"
            style={{ color: '#1F6BFF', textShadow: '0 0 30px #1F6BFF' }}
          >
            PORTAL TIMELINE DEMO
          </h1>
          <p className="text-icy-blue text-lg">Interactive demonstration of the portal transition</p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-lg p-8 border-2 border-jin-woo-blue mb-8"
        >
          <h2 className="text-2xl font-bold text-jin-woo-blue mb-6">Animation Controls</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Duration Slider */}
            <div>
              <label className="block text-silver-white mb-2">
                Duration: <span className="text-jin-woo-blue font-bold">{duration}ms</span>
              </label>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-abyss-blue"
              />
            </div>

            {/* Color Picker */}
            <div>
              <label className="block text-silver-white mb-2">Primary Color</label>
              <div className="flex gap-4">
                {['#1F6BFF', '#6F2BFF', '#37F8FF', '#8EFFC1', '#FF6B18'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`w-10 h-10 rounded-full border-2 transition-transform ${
                      color === c ? 'scale-110 border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: c, boxShadow: `0 0 10px ${c}` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Trigger Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleTrigger}
            disabled={isActive}
            className="w-full py-4 bg-jin-woo-blue text-white font-bold rounded-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ boxShadow: `0 0 20px ${color}` }}
          >
            {isActive ? 'PORTAL ACTIVE...' : 'ACTIVATE PORTAL'}
          </motion.button>
        </motion.div>

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass rounded-lg p-8 border-2 border-cursed-purple"
        >
          <h2 className="text-2xl font-bold text-cursed-purple mb-4">About Portal Timeline</h2>
          <ul className="space-y-3 text-silver-white">
            <li className="flex items-start gap-3">
              <span className="text-jin-woo-blue">◆</span>
              <span>Three concentric rotating rings create the portal effect</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-neon-cyan">◆</span>
              <span>Center vortex with radiating particles</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cursed-purple">◆</span>
              <span>Inspired by Solo Leveling gate aesthetics</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-crystal-green">◆</span>
              <span>Used for page-to-page navigation transitions</span>
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Portal Animation */}
      {isActive && (
        <PortalTimeline onComplete={handleComplete} duration={duration} color={color} />
      )}
    </div>
  );
};

export default PortalDemo;
