'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [phase, setPhase] = useState<'initial' | 'awakening' | 'complete'>('initial');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setPhase('awakening');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        setPhase('complete');
        setTimeout(() => {
          router.push('/dashboard');
        }, 1200);
      } else {
        setError('Invalid email or password');
        setPhase('initial');
      }
    } catch (error) {
      setError('Login failed.  Please try again.');
      setPhase('initial');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black flex items-center justify-center py-20 px-4 relative overflow-hidden">
      {/* Background Shadow Aura */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{
          background: phase === 'awakening' 
            ? 'radial-gradient(circle at center, #1F6BFF, transparent)'
            : 'transparent',
        }}
        transition={{ duration: 1. 2 }}
      />

      {/* Shadow Rising Effect */}
      {phase === 'awakening' && (
        <motion.div
          className="absolute bottom-0 left-1/2 w-96 h-96 -translate-x-1/2"
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: [0, 0.5, 0] }}
          transition={{ duration: 1.2 }}
          style={{
            background: 'linear-gradient(to top, rgba(31, 107, 255, 0.4), transparent)',
            filter: 'blur(40px)',
          }}
        />
      )}

      {/* Login Form Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md relative z-10"
      >
        <motion.div
          className="glass rounded-lg p-8 border-2 border-jin-woo-blue"
          animate={{
            borderColor: phase === 'awakening' ? '#6F2BFF' : phase === 'complete' ? '#8EFFC1' : '#1F6BFF',
            boxShadow:
              phase === 'awakening'
                ? '0 0 30px rgba(31, 107, 255, 0. 8)'
                : phase === 'complete'
                ? '0 0 30px rgba(142, 255, 193, 0.8)'
                : '0 0 15px rgba(31, 107, 255, 0.5)',
          }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h1
              className="anime-text text-4xl mb-2"
              animate={{
                textShadow:
                  phase === 'awakening'
                    ? '0 0 30px #1F6BFF, 0 0 60px #1F6BFF'
                    : '0 0 20px #1F6BFF',
              }}
              style={{ color: '#1F6BFF' }}
            >
              SHADOW AWAKENING
            </motion.h1>
            <p className="text-icy-blue text-sm">Unlock your power</p>
          </div>

          {/* Form */}
          {phase !== 'complete' && (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                  value={email}
                  onChange={(e) => setEmail(e. target.value)}
                  className="w-full bg-shadow-black/50 border-2 border-jin-woo-blue rounded px-4 py-3 text-white placeholder-icy-blue/50 focus:outline-none focus:border-neon-cyan focus:shadow-lg transition-all"
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
                  value={password}
                  onChange={(e) => setPassword(e. target.value)}
                  className="w-full bg-shadow-black/50 border-2 border-jin-woo-blue rounded px-4 py-3 text-white placeholder-icy-blue/50 focus:outline-none focus:border-neon-cyan focus:shadow-lg transition-all"
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
              <motion. button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
                className="w-full bg-jin-woo-blue text-white font-bold py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <motion.span animate={{ opacity: [0. 5, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
                    AWAKENING...
                  </motion. span>
                ) : (
                  'LOGIN'
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
                animate={{ scale: [0.8, 1. 2, 0.8] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                ✨
              </motion.div>
              <p className="text-crystal-green font-bold text-lg">AWAKENING COMPLETE</p>
              <p className="text-silver-white text-sm mt-2">Redirecting to dashboard...</p>
            </motion.div>
          )}

          {/* Links */}
          {phase !== 'complete' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center space-y-3"
            >
              <p className="text-silver-white text-sm">
                Don't have an account? {' '}
                <Link href="/signup" className="text-neon-cyan hover:text-jin-woo-blue font-bold transition-colors">
                  SIGN UP
                </Link>
              </p>
              <p className="text-silver-white text-sm">
                <Link href="/" className="text-icy-blue hover:text-jin-woo-blue transition-colors">
                  Back to Home
                </Link>
              </p>
            </motion.div>
          )}
        </motion.div>
      </motion. div>
    </main>
  );
          }
