'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import useKonamiCode from '@/lib/konami-code';
import { useRouter } from 'next/navigation';

export default function ShadowRealm() {
  const router = useRouter();
  const [isUnlocked, setIsUnlocked] = React.useState(false);

  useKonamiCode(() => {
    setIsUnlocked(true);
  });

  if (! isUnlocked) {
    return (
      <main className="min-h-screen bg-shadow-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="anime-text text-4xl glow-blue mb-4">🔒 ACCESS DENIED</h1>
          <p className="text-silver-white">Press Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-cursed-purple to-shadow-black py-20 px-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="anime-text text-8xl glow-purple mb-8">SHADOW MONARCH</h1>
        
        <div className="glass rounded-lg p-12 border-4 border-cursed-purple mb-12">
          <p className="text-2xl text-silver-white mb-6">
            You have unlocked the Shadow Realm
          </p>
          <p className="text-lg text-icy-blue mb-8">
            Welcome to the inner sanctum of Shadows Gaming Studio.  Here lies the power of the shadow monarch.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              className="glass rounded-lg p-6 border border-jin-woo-blue"
              whileHover={{ scale: 1.1 }}
            >
              <h3 className="text-2xl font-bold text-jin-woo-blue mb-2">∞</h3>
              <p className="text-silver-white">Infinite Power</p>
            </motion. div>

            <motion.div
              className="glass rounded-lg p-6 border border-neon-cyan"
              whileHover={{ scale: 1. 1 }}
            >
              <h3 className="text-2xl font-bold text-neon-cyan mb-2">◆</h3>
              <p className="text-silver-white">Ultimate Awakening</p>
            </motion.div>

            <motion. div
              className="glass rounded-lg p-6 border border-cursed-purple"
              whileHover={{ scale: 1. 1 }}
            >
              <h3 className="text-2xl font-bold text-cursed-purple mb-2">★</h3>
              <p className="text-silver-white">Eternal Darkness</p>
            </motion.div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => router.push('/')}
            className="bg-cursed-purple text-white font-bold px-8 py-4 rounded text-lg hover:shadow-lg transition-all"
          >
            RETURN TO REALITY
          </motion.button>
        </div>
      </motion.div>
    </main>
  );
}
