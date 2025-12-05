'use client';

import React from 'react';
import { TeamSummoner } from '@/components/animations/TeamSummoner';
import { motion } from 'framer-motion';

const DEMO_TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Dev Kingson',
    role: 'Founder',
    title: 'B.Sc. (Hons.) Mathematics',
    description: 'Visionary leader guiding Shadows to legendary heights. The shadow monarch who awakened.',
    summoningColor: '#1F6BFF',
  },
  {
    id: 2,
    name: 'Utsav Chaurasiya',
    role: 'Co-Founder & Creative Director',
    title: 'Visionary Designer',
    description: 'Master of visual storytelling. Brings anime aesthetics to life through cutting-edge design.',
    summoningColor: '#6F2BFF',
  },
  {
    id: 3,
    name: 'Jitendra Soni',
    role: 'Co-Founder & Technical Lead',
    title: 'Architecture Engineer',
    description: 'Engineering excellence personified. Builds the systems that power our dreams.',
    summoningColor: '#FF6B18',
  },
];

export default function TeamDemoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl font-black mb-4"
            style={{ color: '#6F2BFF', textShadow: '0 0 30px #6F2BFF' }}
          >
            TEAM SUMMONER DEMO
          </h1>
          <p className="text-icy-blue text-lg mb-4">
            Interactive demonstration of the team summoning system
          </p>
          <p className="text-silver-white text-sm max-w-2xl mx-auto">
            Click &quot;Begin Summoning&quot; to start. After the first member is summoned, scroll down or
            press ↓ / Space / Enter to summon subsequent members.
          </p>
        </motion.div>

        {/* Team Summoner Component */}
        <TeamSummoner members={DEMO_TEAM_MEMBERS} autoSummonFirst={false} />

        {/* Info Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass rounded-lg p-8 border-2 border-cursed-purple mt-12"
        >
          <h2 className="text-2xl font-bold text-cursed-purple mb-4">About Team Summoner</h2>
          <ul className="space-y-3 text-silver-white">
            <li className="flex items-start gap-3">
              <span className="text-jin-woo-blue">◆</span>
              <span>
                <strong>Manual First Summon:</strong> Click button to trigger first summoning
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-neon-cyan">◆</span>
              <span>
                <strong>Scroll/Keyboard Navigation:</strong> Subsequent members summoned via scroll
                or keyboard
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-cursed-purple">◆</span>
              <span>
                <strong>Naruto-style Summoning:</strong> Circle appears → Shadow rises → Character
                revealed
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-crystal-green">◆</span>
              <span>
                <strong>Unique Colors:</strong> Each team member has their own summoning aura color
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </main>
  );
}
