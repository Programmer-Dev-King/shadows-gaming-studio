'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (!  session) {
    redirect('/login');
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="anime-text text-6xl glow-blue text-center mb-12">DASHBOARD</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="glass rounded-lg p-8 border-2 border-jin-woo-blue hud-panel">
              <h2 className="text-2xl font-bold text-jin-woo-blue mb-4">Power Level</h2>
              <p className="text-5xl font-bold text-neon-cyan">999</p>
            </div>

            <div className="glass rounded-lg p-8 border-2 border-cursed-purple hud-panel">
              <h2 className="text-2xl font-bold text-cursed-purple mb-4">Games Played</h2>
              <p className="text-5xl font-bold text-crystal-green">42</p>
            </div>

            <div className="glass rounded-lg p-8 border-2 border-chakra-orange hud-panel">
              <h2 className="text-2xl font-bold text-chakra-orange mb-4">Achievements</h2>
              <p className="text-5xl font-bold text-silver-white">87</p>
            </div>
          </div>

          <div className="glass rounded-lg p-8 border-2 border-jin-woo-blue">
            <h2 className="text-3xl font-bold text-jin-woo-blue mb-6">Welcome, {session.user?. name || 'Shadow'}</h2>
            <p className="text-silver-white text-lg">
              You have successfully entered the Shadow Realm.  Explore your profile, view your achievements, and continue your journey.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
