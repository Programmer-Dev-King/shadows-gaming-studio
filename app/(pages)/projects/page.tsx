'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="glass rounded-lg p-16 border-4 border-dashed border-jin-woo-blue">
            <h1 className="anime-text text-6xl glow-blue mb-8">COMING SOON</h1>
            
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="inline-block mb-8"
            >
              <div className="w-24 h-24 border-4 border-jin-woo-blue rounded-full flex items-center justify-center">
                <div className="w-20 h-20 border-4 border-cursed-purple rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 border-4 border-neon-cyan rounded-full"></div>
                </div>
              </div>
            </motion.div>

            <p className="text-2xl text-silver-white mb-4">
              Revolutionary projects in development
            </p>
            <p className="text-icy-blue">
              Stay tuned for announcements about our upcoming AAA titles
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
