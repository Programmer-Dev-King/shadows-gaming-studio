'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="anime-text text-6xl mb-4" style={{ textShadow: '0 0 30px #1F6BFF' }}>
            PROJECTS
          </h1>
          <p className="text-icy-blue text-lg">Legendary games in development</p>
        </motion.div>

        {/* Coming Soon Scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
          animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
          transition={{ duration: 0.8 }}
          className="glass rounded-lg p-16 border-4 border-dashed border-jin-woo-blue text-center relative overflow-hidden"
        >
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              backgroundImage: 'linear-gradient(45deg, #1F6BFF, transparent)',
              backgroundSize: '200% 200%',
            }}
          />

          {/* Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative z-10"
          >
            {/* Rotating Circles */}
            <motion.div
              className="inline-block mb-8"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <div className="w-32 h-32 border-4 border-jin-woo-blue rounded-full flex items-center justify-center">
                <div className="w-24 h-24 border-3 border-cursed-purple rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border-2 border-neon-cyan rounded-full" />
                </div>
              </div>
            </motion.div>

            <motion.h2
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="anime-text text-6xl mb-8"
              style={{ textShadow: '0 0 30px #1F6BFF' }}
            >
              COMING SOON
            </motion.h2>

            <p className="text-xl text-silver-white mb-4">
              Revolutionary games in development
            </p>

            <p className="text-icy-blue mb-8">
              The most ambitious projects from Shadows Gaming Studio are being crafted. 
              Something legendary is being awakened... 
            </p>

            {/* Floating Text */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <p className="text-neon-cyan font-mono text-sm">[STATUS: IN DEVELOPMENT]</p>
              <p className="text-crystal-green font-mono text-sm">[POWER LEVEL: RISING]</p>
              <p className="text-chakra-orange font-mono text-sm">[AWAKENING: IMMINENT]</p>
            </motion.div>

            {/* Call to Action */}
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-silver-white mb-6">
                Follow us to be notified when projects launch
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-jin-woo-blue text-white font-bold rounded-lg"
              >
                NOTIFY ME
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Project Preview Cards (Locked) */}
        <div className="mt-16">
          <h3 className="anime-text text-4xl mb-8 text-center" style={{ textShadow: '0 0 20px #6F2BFF' }}>
            Upcoming Legends
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4]. map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="glass rounded-lg p-6 border-2 border-cursed-purple/50 opacity-60"
              >
                <div className="w-full h-40 bg-gradient-to-br from-cursed-purple/20 to-shadow-black rounded mb-4 flex items-center justify-center">
                  <p className="text-cursed-purple text-lg font-bold">🔒 PROJECT {i}</p>
                </div>
                <h4 className="text-xl font-bold text-cursed-purple/50 mb-2">Secret Project {i}</h4>
                <p className="text-silver-white/50 text-sm">Details locked until release announcement</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
