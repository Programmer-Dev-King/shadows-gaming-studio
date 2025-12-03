'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/dashboard',
      });
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black flex items-center justify-center py-20 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="glass rounded-lg p-8 border-2 border-jin-woo-blue">
          <h1 className="anime-text text-4xl glow-blue text-center mb-8">SHADOW AWAKENING</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-silver-white mb-2 font-semibold">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target. value)}
                className="w-full bg-shadow-black/50 border border-jin-woo-blue rounded px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                required
              />
            </div>

            <div>
              <label className="block text-silver-white mb-2 font-semibold">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target. value)}
                className="w-full bg-shadow-black/50 border border-jin-woo-blue rounded px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-jin-woo-blue text-white font-bold py-3 rounded hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {isLoading ? 'AWAKENING...' : 'LOGIN'}
            </button>
          </form>

          <p className="text-center text-silver-white mt-6">
            Don't have an account? {' '}
            <Link href="/signup" className="text-neon-cyan hover:text-jin-woo-blue">
              SIGN UP
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
      }
