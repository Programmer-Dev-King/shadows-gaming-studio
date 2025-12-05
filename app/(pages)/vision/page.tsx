'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function VisionPage() {
  const [phase, setPhase] = useState<'initial' | 'crack' | 'transform' | 'complete'>('initial');

  useEffect(() => {
    const timeline = [
      { time: 0, phase: 'crack' as const },
      { time: 600, phase: 'transform' as const },
      { time: 1400, phase: 'complete' as const },
    ];

    timeline.forEach(({ time, phase: ph }) => {
      setTimeout(() => setPhase(ph), time);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Animated Stone Tablet - Crack & Transform */}
        {phase !== 'complete' && (
          <div className="fixed inset-0 z-40 flex items-center justify-center">
            <motion.div
              className="relative w-96 h-96"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Stone Tablet */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-gray-500 to-gray-700 rounded-lg"
                animate={{
                  opacity: phase === 'crack' ? 1 : 0,
                }}
              >
                {/* Crack Lines */}
                {phase === 'crack' && (
                  <>
                    <motion.svg
                      className="absolute inset-0 w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.path
                        d="M 100 50 Q 150 100 200 80 T 300 150"
                        stroke="#FFD700"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <motion.path
                        d="M 50 200 Q 100 250 150 220 T 350 280"
                        stroke="#FFD700"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      />
                    </motion.svg>
                  </>
                )}
              </motion.div>

              {/* Transform to Hologram */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-neon-cyan to-jin-woo-blue rounded-lg"
                animate={{
                  opacity: phase === 'transform' || phase === 'complete' ? 1 : 0,
                  scale: phase === 'transform' ? 1.1 : phase === 'complete' ? 1 : 0. 8,
                }}
                style={{
                  boxShadow: phase === 'transform' || phase === 'complete' ? '0 0 40px #37F8FF' : 'none',
                }}
              >
                {phase === 'transform' && (
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center text-center p-8"
                    animate={{
                      opacity: [0, 1, 1],
                    }}
                    transition={{ duration: 0.8 }}
                  >
                    <div>
                      <p className="text-neon-cyan text-sm font-mono mb-4">[VISION UNLOCKED]</p>
                      <p className="text-white text-xl font-bold">Hologram Activated</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        )}

        {/* Content - Appears after animation */}
        {phase === 'complete' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h1
                className="anime-text text-6xl mb-4"
                style={{ textShadow: '0 0 30px #8EFFC1' }}
              >
                OUR VISION
              </h1>
              <p className="text-icy-blue text-lg">
                From Stone Age to Digital Future - Shadows Gaming Studio's Ultimate Goal
              </p>
            </div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-lg p-12 border-2 border-crystal-green mb-12"
            >
              <h2 className="text-3xl font-bold text-crystal-green mb-6">
                Rise Above Mortals
              </h2>
              <p className="text-silver-white text-lg leading-relaxed mb-8">
                We envision a future where gaming transcends entertainment and becomes a cultural phenomenon. 
                Like the transformation from stone age to modern civilization in Dr. Stone, we're revolutionizing
                how stories are told through interactive media.  Our goal is to create experiences that resonate
                with millions, inspire innovation, and push the boundaries of what's possible in game development.
              </p>

              {/* Three Pillars */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Innovation',
                    desc: 'Pioneering new technologies and storytelling methods',
                    color: 'crystal-green',
                  },
                  {
                    title: 'Excellence',
                    desc: 'Delivering AAA-grade quality in every aspect',
                    color: 'jin-woo-blue',
                  },
                  {
                    title: 'Community',
                    desc: 'Building passionate fanbases across the globe',
                    color: 'neon-cyan',
                  },
                ].map((pillar, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.2 }}
                    className="border border-opacity-50 p-6 rounded"
                    style={{
                      borderColor: `var(--${pillar.color})`,
                      backgroundColor: `var(--${pillar.color})10`,
                    }}
                  >
                    <h3 className="font-bold text-lg mb-2">{pillar.title}</h3>
                    <p className="text-silver-white text-sm">{pillar.desc}</p>
                  </motion. div>
                ))}
              </div>
            </motion.div>

            {/* Technology Section */}
            <motion. div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0. 6 }}
            >
              <h2 className="anime-text text-4xl mb-8" style={{ textShadow: '0 0 20px #1F6BFF' }}>
                Technology Stack
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {[
                  { name: 'Game Engines', desc: 'Unreal Engine 5, Unity, Custom Engines' },
                  { name: 'AI/ML Integration', desc: 'Advanced NPC behavior, procedural generation' },
                  { name: 'Motion Capture', desc: 'AAA-grade mocap for realistic animations' },
                  { name: '3D Art Pipeline', desc: 'Character design, environment art, VFX' },
                ].map((tech, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                    className="glass rounded-lg p-6 border-2 border-jin-woo-blue"
                  >
                    <h3 className="text-xl font-bold text-jin-woo-blue mb-2">{tech.name}</h3>
                    <p className="text-silver-white text-sm">{tech.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </main>
  );
              }
