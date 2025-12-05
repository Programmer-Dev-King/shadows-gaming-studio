'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';

interface UserStats {
  powerLevel: number;
  gamesPlayed: number;
  achievements: number;
  playtime: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<UserStats>({
    powerLevel: 999,
    gamesPlayed: 42,
    achievements: 87,
    playtime: '125 hours',
  });

  useEffect(() => {
    if (status === 'loading') return;
    if (! session) {
      redirect('/login');
    }
  }, [session, status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity }}>
          <div className="w-20 h-20 border-4 border-jin-woo-blue rounded-full border-t-neon-cyan" />
        </motion.div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="anime-text text-6xl mb-2" style={{ textShadow: '0 0 30px #1F6BFF' }}>
            SHADOW DASHBOARD
          </h1>
          <p className="text-icy-blue text-lg">
            Welcome back, {session?.user?.name || 'Shadow'} 
          </p>
        </motion.div>

        {/* Power Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Power Level', value: stats.powerLevel, color: 'jin-woo-blue', unit: '' },
            { label: 'Games Played', value: stats. gamesPlayed, color: 'cursed-purple', unit: '' },
            { label: 'Achievements', value: stats.achievements, color: 'crystal-green', unit: '' },
            { label: 'Playtime', value: stats.playtime, color: 'chakra-orange', unit: '' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`hud-panel border-2 p-6 rounded-lg bg-gradient-to-br from-abyss-blue/50 to-shadow-black`}
              style={{
                borderColor: `var(--${stat.color})`,
                boxShadow: `0 0 20px var(--${stat.color})`,
              }}
            >
              <p className="text-icy-blue text-sm font-mono mb-2">[{stat.label. toUpperCase()}]</p>
              <motion.p
                className="text-4xl font-bold"
                style={{ color: `var(--${stat.color})` }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {stat.value}{stat.unit}
              </motion.p>
              <div className="mt-3 h-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-50" />
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass rounded-lg p-8 border-2 border-jin-woo-blue"
          >
            <h2 className="text-2xl font-bold text-jin-woo-blue mb-6">Shadow Profile</h2>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-silver-white">Name:</span>
                <span className="text-icy-blue font-bold">{session?.user?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-silver-white">Email:</span>
                <span className="text-icy-blue font-bold">{session?.user?.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-silver-white">Role:</span>
                <span className="text-crystal-green font-bold uppercase">{session?.user?.role || 'User'}</span>
              </div>
              <div className="border-t border-jin-woo-blue/20 pt-4 mt-4">
                <p className="text-silver-white text-sm">
                  Status: <span className="text-crystal-green font-bold">🟢 ACTIVE</span>
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="w-full mt-6 px-4 py-3 bg-jin-woo-blue text-white rounded-lg font-bold hover:shadow-lg"
            >
              EDIT PROFILE
            </motion.button>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-lg p-8 border-2 border-cursed-purple"
          >
            <h2 className="text-2xl font-bold text-cursed-purple mb-6">Quick Actions</h2>

            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.05, x: 10 }}
                className="w-full px-4 py-3 bg-cursed-purple/30 border border-cursed-purple text-cursed-purple rounded-lg font-bold hover:bg-cursed-purple/50"
              >
                View Games
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, x: 10 }}
                className="w-full px-4 py-3 bg-neon-cyan/30 border border-neon-cyan text-neon-cyan rounded-lg font-bold hover:bg-neon-cyan/50"
              >
                View Achievements
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, x: 10 }}
                className="w-full px-4 py-3 bg-crystal-green/30 border border-crystal-green text-crystal-green rounded-lg font-bold hover:bg-crystal-green/50"
              >
                Game Settings
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, x: 10 }}
                className="w-full px-4 py-3 bg-chakra-orange/30 border border-chakra-orange text-chakra-orange rounded-lg font-bold hover:bg-chakra-orange/50"
              >
                Support
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass rounded-lg p-8 border-2 border-neon-cyan"
        >
          <h2 className="text-2xl font-bold text-neon-cyan mb-6">Recent Activity</h2>

          <div className="space-y-4">
            {[
              { action: 'Logged in', time: '5 minutes ago', icon: '🔓' },
              { action: 'Completed achievement', time: '2 hours ago', icon: '⭐' },
              { action: 'Played game', time: '1 day ago', icon: '🎮' },
              { action: 'Profile updated', time: '3 days ago', icon: '✏️' },
            ].map((activity, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
                className="flex items-center justify-between p-4 rounded bg-shadow-black/50 border border-neon-cyan/20"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{activity.icon}</span>
                  <div>
                    <p className="text-silver-white font-bold">{activity.action}</p>
                    <p className="text-icy-blue text-sm">{activity.time}</p>
                  </div>
                </div>
                <motion.div
                  className="w-2 h-2 rounded-full bg-crystal-green"
                  animate={{ opacity: [0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
                }
