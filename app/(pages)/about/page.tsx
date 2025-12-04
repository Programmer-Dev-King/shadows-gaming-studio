'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const [phase, setPhase] = useState<'portal' | 'content'>('portal');

  useEffect(() => {
    const timer = setTimeout(() => setPhase('content'), 1600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      {/* Portal Transition Animation */}
      {phase === 'portal' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Outer Ring */}
          <motion.div
            className="absolute w-96 h-96 border-4 border-jin-woo-blue rounded-full"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1.6 }}
            style={{
              boxShadow: '0 0 30px #1F6BFF',
            }}
          />

          {/* Middle Ring */}
          <motion.div
            className="absolute w-72 h-72 border-2 border-neon-cyan rounded-full"
            initial={{ scale: 0, rotate: 360 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1.6 }}
            style={{
              boxShadow: '0 0 20px #37F8FF',
            }}
          />

          {/* Inner Ring */}
          <motion.div
            className="absolute w-48 h-48 border-2 border-cursed-purple rounded-full"
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            exit={{ scale: 0 }}
            transition={{ duration: 1.6 }}
            style={{
              boxShadow: '0 0 20px #6F2BFF',
            }}
          />

          {/* Center Glow */}
          <motion. div
            className="absolute w-32 h-32 bg-gradient-radial from-jin-woo-blue to-transparent rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0. 5] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6 }}
          />

          {/* Background Fade */}
          <motion.div
            className="absolute inset-0 bg-shadow-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1. 6 }}
          />
        </div>
      )}

      {/* Content */}
      {phase === 'content' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-6xl mx-auto"
        >
          {/* Page Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="anime-text text-6xl mb-4"
              style={{ textShadow: '0 0 30px #1F6BFF' }}
            >
              ABOUT US
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-icy-blue text-lg"
            >
              The Story of Shadows Gaming Studio
            </motion. p>
          </div>

          {/* Who We Are */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass rounded-lg p-12 border-2 border-jin-woo-blue mb-12"
          >
            <h2 className="text-3xl font-bold text-jin-woo-blue mb-6">Who We Are</h2>
            <p className="text-silver-white text-lg leading-relaxed">
              Shadows Gaming Studio is a collective of visionary game developers, designers, and storytellers united by a singular dream: 
              to create legendary gaming experiences that transcend boundaries between anime, gaming, and interactive entertainment.   
              Founded with a passion for excellence and a commitment to innovation, we're not just building games – we're crafting worlds. 
            </p>
          </motion.div>

          {/* Our Journey */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-cursed-purple mb-8 text-center">Our Journey</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { year: '2024', title: 'Genesis', desc: 'Shadows Gaming Studio is founded' },
                { year: '2025', title: 'Innovation', desc: 'First game in development' },
                { year: '2026', title: 'Revolution', desc: 'Launch of legendary titles' },
                { year: '2027+', title: 'Domination', desc: 'Become industry leader' },
              ].map((milestone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="glass rounded-lg p-6 border-2 border-crystal-green text-center"
                >
                  <p className="text-crystal-green font-bold text-2xl mb-2">{milestone. year}</p>
                  <h3 className="text-lg font-bold text-neon-cyan mb-2">{milestone.title}</h3>
                  <p className="text-silver-white text-sm">{milestone.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Core Values */}
          <motion. div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0. 8 }}
            className="glass rounded-lg p-12 border-2 border-chakra-orange mb-12"
          >
            <h2 className="text-3xl font-bold text-chakra-orange mb-8">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎨',
                  title: 'Creativity',
                  desc: 'Every project is a masterpiece born from boundless imagination',
                },
                {
                  icon: '⚡',
                  title: 'Excellence',
                  desc: 'We never settle for mediocrity; AAA quality is our standard',
                },
                {
                  icon: '❤️',
                  title: 'Passion',
                  desc: 'We pour our hearts and souls into every line of code and pixel',
                },
              ]. map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 + i * 0.15 }}
                  className="text-center"
                >
                  <p className="text-5xl mb-4">{value.icon}</p>
                  <h3 className="text-xl font-bold text-silver-white mb-2">{value.title}</h3>
                  <p className="text-icy-blue">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="glass rounded-lg p-12 border-2 border-neon-cyan"
          >
            <h2 className="text-3xl font-bold text-neon-cyan mb-8">Why Choose Shadows? </h2>
            <div className="space-y-4">
              {[
                '🎬 Anime-Inspired Game Design that resonates with global audiences',
                '🚀 Cutting-Edge Technology utilizing the latest game engines and tools',
                '👥 Passionate Team of industry veterans and rising stars',
                '🌍 Global Vision with local understanding of player communities',
                '💎 Quality Assurance that ensures every game is a masterpiece',
              ]. map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3 + i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded bg-shadow-black/50 border border-neon-cyan/20"
                >
                  <p className="text-silver-white text-lg">{item}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
            }
