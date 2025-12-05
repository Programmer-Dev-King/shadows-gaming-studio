'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useKonamiCode from '@/lib/konami-code';
import { useRouter } from 'next/navigation';

export default function ShadowRealmPage() {
  const router = useRouter();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // Konami code: ↑ ↑ ↓ ↓ ← → ← → B A
  useKonamiCode(() => {
    setIsUnlocked(true);
  });

  if (!isUnlocked) {
    return (
      <main className="min-h-screen bg-shadow-black flex items-center justify-center px-4 relative overflow-hidden">
        {/* Locked Animation */}
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at center, #1F6BFF, transparent)',
              'radial-gradient(circle at center, #6F2BFF, transparent)',
              'radial-gradient(circle at center, #1F6BFF, transparent)',
            ],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center z-10"
        >
          <motion.h1
            className="anime-text text-6xl mb-8"
            animate={{ textShadow: ['0 0 20px #1F6BFF', '0 0 40px #1F6BFF'] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🔒 ACCESS DENIED
          </motion.h1>

          <motion.p
            className="text-icy-blue text-xl mb-8"
            animate={{ opacity: [0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            Shadow Realm Detected
          </motion.p>

          <div className="glass rounded-lg p-8 border-2 border-jin-woo-blue max-w-md">
            <p className="text-silver-white text-lg mb-6">
              Enter the Konami Code to access the Shadow Realm:
            </p>
            <p className="text-neon-cyan font-mono text-xl mb-6 font-bold">
              ↑ ↑ ↓ ↓ ← → ← → B A
            </p>

            <div className="w-full h-1 bg-gradient-to-r from-transparent via-jin-woo-blue to-transparent mb-6" />

            <p className="text-icy-blue text-sm">
              {attempts === 0
                ? 'Use arrow keys and B + A buttons'
                : `Attempts: ${attempts}.  Keep trying... `}
            </p>
          </div>

          <motion.p
            className="text-icy-blue mt-8 text-sm"
            animate={{ opacity: [0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            "Only the chosen ones can enter..."
          </motion.p>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-cursed-purple to-shadow-black py-20 px-4 relative overflow-hidden">
      {/* Background Effect */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, #6F2BFF, transparent)',
            'radial-gradient(circle at 80% 50%, #1F6BFF, transparent)',
            'radial-gradient(circle at 20% 50%, #6F2BFF, transparent)',
          ],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <motion.h1
            className="anime-text text-8xl mb-4"
            animate={{
              textShadow: [
                '0 0 30px #6F2BFF, 0 0 60px #6F2BFF',
                '0 0 50px #1F6BFF, 0 0 80px #1F6BFF',
                '0 0 30px #6F2BFF, 0 0 60px #6F2BFF',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ color: '#6F2BFF' }}
          >
            SHADOW MONARCH
          </motion.h1>
          <p className="text-neon-cyan text-2xl mb-2">The Inner Sanctum</p>
          <p className="text-icy-blue">Your true power awakens here</p>
        </motion.div>

        {/* Welcome Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-lg p-12 border-4 border-cursed-purple mb-12 text-center"
        >
          <p className="text-silver-white text-xl leading-relaxed">
            You have unlocked the <span className="text-cursed-purple font-bold">Shadow Realm</span>.   
            Only those worthy of the shadow monarch's power can access this forbidden domain.  
            You stand at the threshold of infinite power...
          </p>
        </motion.div>

        {/* Power Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: '∞ Infinite Power', desc: 'Unlimited potential unleashed', color: 'cursed-purple' },
            { title: '◆ Ultimate Awakening', desc: 'Complete shadow transformation', color: 'jin-woo-blue' },
            { title: '★ Eternal Darkness', desc: 'Master of the abyss', color: 'neon-cyan' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.2 }}
              className="glass rounded-lg p-8 border-2 text-center"
              style={{
                borderColor: `var(--${stat.color})`,
                boxShadow: `0 0 20px var(--${stat.color})`,
              }}
            >
              <h3
                className="anime-text text-3xl mb-4"
                style={{
                  textShadow: `0 0 20px var(--${stat.color})`,
                }}
              >
                {stat.title}
              </h3>
              <p className="text-silver-white">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="glass rounded-lg p-12 border-2 border-crystal-green mb-12"
        >
          <h2 className="anime-text text-4xl mb-8 text-crystal-green">SHADOW ACHIEVEMENTS</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: 'Code Breaker', desc: 'Found the Konami code', emoji: '🔓' },
              { title: 'Shadow Monarch', desc: 'Reached ultimate power', emoji: '👑' },
              { title: 'Inner Sanctum', desc: 'Accessed the forbidden domain', emoji: '🌑' },
              { title: 'Eternal Guardian', desc: 'Protect the shadow realm forever', emoji: '⚔️' },
            ].map((achievement, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                className="border-l-4 border-crystal-green pl-6 py-4"
              >
                <p className="text-4xl mb-2">{achievement. emoji}</p>
                <h4 className="text-crystal-green font-bold text-lg">{achievement.title}</h4>
                <p className="text-silver-white text-sm">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Easter Eggs / Secrets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="glass rounded-lg p-12 border-2 border-chakra-orange"
        >
          <h2 className="anime-text text-4xl mb-8 text-chakra-orange">HIDDEN SECRETS</h2>

          <div className="space-y-6">
            <div>
              <p className="text-neon-cyan font-bold mb-2">🔮 Secret 1: The Origin</p>
              <p className="text-silver-white">
                Shadows Gaming Studio was born from the vision of legendary creators who sought to merge anime storytelling with next-generation gaming... 
              </p>
            </div>
            <div>
              <p className="text-neon-cyan font-bold mb-2">⚡ Secret 2: The Power</p>
              <p className="text-silver-white">
                Within every shadow lies infinite potential. The power you've unlocked is just the beginning of your journey...
              </p>
            </div>
            <div>
              <p className="text-neon-cyan font-bold mb-2">🌌 Secret 3: The Future</p>
              <p className="text-silver-white">
                What will you do with this power?   The fate of the shadow realm rests in your hands now, chosen one...
              </p>
            </div>
          </div>
        </motion.div>

        {/* Exit Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/')}
            className="px-8 py-4 bg-cursed-purple text-white font-bold rounded-lg hover:shadow-lg"
          >
            RETURN TO REALITY
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
            }
