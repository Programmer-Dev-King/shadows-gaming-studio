'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phase, setPhase] = useState<'initial' | 'sealing' | 'complete'>('initial');

  const handleSubmit = async (e: React.FormEvent) => {
    e. preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setPhase('sealing');

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData. email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        setPhase('complete');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        const data = await response.json();
        setError(data.error || 'Signup failed');
        setPhase('initial');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setPhase('initial');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Binding Seal Animation */}
      {phase === 'sealing' && (
        <motion.div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <motion.svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 1, 0.5], scale: 1, rotate: 360 }}
            transition={{ duration: 2 }}
          >
            {/* Outer circle */}
            <circle cx="200" cy="200" r="180" fill="none" stroke="#6F2BFF" strokeWidth="3" opacity="0.6" />
            {/* Inner circle */}
            <circle cx="200" cy="200" r="120" fill="none" stroke="#6F2BFF" strokeWidth="2" opacity="0.4" />
            {/* Seal runes */}
            <text x="200" y="210" textAnchor="middle" fill="#6F2BFF" fontSize="40" fontWeight="bold" opacity="0.7">
              ★
            </text>
          </motion.svg>
        </motion.div>
      )}

      {/* Signup Form */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          className="glass rounded-lg p-8 border-2 border-cursed-purple"
          animate={{
            borderColor: phase === 'sealing' ? '#8EFFC1' : phase === 'complete' ? '#8EFFC1' : '#6F2BFF',
            boxShadow:
              phase === 'sealing'
                ?  '0 0 30px rgba(111, 43, 255, 0.8)'
                : phase === 'complete'
                ? '0 0 30px rgba(142, 255, 193, 0.8)'
                : '0 0 15px rgba(111, 43, 255, 0.5)',
          }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              className="anime-text text-4xl mb-2"
              animate={{
                textShadow:
                  phase === 'sealing'
                    ? '0 0 30px #6F2BFF, 0 0 60px #6F2BFF'
                    : '0 0 20px #6F2BFF',
              }}
              style={{ color: '#6F2BFF' }}
            >
              SHADOW BINDING
            </motion.h1>
            <p className="text-icy-blue text-sm">Sign the contract</p>
          </div>

          {/* Form */}
          {phase !== 'complete' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <label className="block text-silver-white mb-2 font-semibold text-sm">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ... formData, name: e.target.value })}
                  className="w-full bg-shadow-black/50 border-2 border-cursed-purple rounded px-4 py-3 text-white placeholder-icy-blue/50 focus:outline-none focus:border-neon-cyan focus:shadow-lg transition-all"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              {/* Email Input */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-silver-white mb-2 font-semibold text-sm">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-shadow-black/50 border-2 border-cursed-purple rounded px-4 py-3 text-white placeholder-icy-blue/50 focus:outline-none focus:border-neon-cyan focus:shadow-lg transition-all"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              {/* Password Input */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-silver-white mb-2 font-semibold text-sm">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-shadow-black/50 border-2 border-cursed-purple rounded px-4 py-3 text-white placeholder-icy-blue/50 focus:outline-none focus:border-neon-cyan focus:shadow-lg transition-all"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              {/* Confirm Password Input */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <label className="block text-silver-white mb-2 font-semibold text-sm">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full bg-shadow-black/50 border-2 border-cursed-purple rounded px-4 py-3 text-white placeholder-icy-blue/50 focus:outline-none focus:border-neon-cyan focus:shadow-lg transition-all"
                  required
                  disabled={isLoading}
                />
              </motion.div>

              {/* Error Message */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-chakra-orange text-sm text-center font-semibold"
                >
                  ⚠️ {error}
                </motion.p>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-cursed-purple text-white font-bold py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ?  (
                  <motion.span animate={{ opacity: [0.5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
                    BINDING...
                  </motion.span>
                ) : (
                  'SIGN UP'
                )}
              </motion.button>
            </form>
          )}

          {/* Success State */}
          {phase === 'complete' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <motion.div
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🔗
              </motion.div>
              <p className="text-crystal-green font-bold text-lg">BINDING COMPLETE</p>
              <p className="text-silver-white text-sm mt-2">Welcome, shadow.  Redirecting to login...</p>
            </motion.div>
          )}

          {/* Links */}
          {phase !== 'complete' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center space-y-3"
            >
              <p className="text-silver-white text-sm">
                Already have an account?{' '}
                <Link href="/login" className="text-neon-cyan hover:text-cursed-purple font-bold transition-colors">
                  LOGIN
                </Link>
              </p>
              <p className="text-silver-white text-sm">
                <Link href="/" className="text-icy-blue hover:text-cursed-purple transition-colors">
                  Back to Home
                </Link>
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </main>
  );
}
