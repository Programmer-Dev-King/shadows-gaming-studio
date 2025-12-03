'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Redirect to login
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Signup failed:', error);
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
        <div className="glass rounded-lg p-8 border-2 border-cursed-purple">
          <h1 className="anime-text text-4xl glow-purple text-center mb-8">SHADOW BINDING</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-silver-white mb-2 font-semibold">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={formData. name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-shadow-black/50 border border-cursed-purple rounded px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                required
              />
            </div>

            <div>
              <label className="block text-silver-white mb-2 font-semibold">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ... formData, email: e.target.value })}
                className="w-full bg-shadow-black/50 border border-cursed-purple rounded px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                required
              />
            </div>

            <div>
              <label className="block text-silver-white mb-2 font-semibold">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e. target.value })}
                className="w-full bg-shadow-black/50 border border-cursed-purple rounded px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                required
              />
            </div>

            <div>
              <label className="block text-silver-white mb-2 font-semibold">Confirm Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-shadow-black/50 border border-cursed-purple rounded px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-cursed-purple text-white font-bold py-3 rounded hover:shadow-lg disabled:opacity-50 transition-all"
            >
              {isLoading ? 'BINDING...' : 'SIGN UP'}
            </button>
          </form>

          <p className="text-center text-silver-white mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-neon-cyan hover:text-cursed-purple">
              LOGIN
            </Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
                }
