'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React. FormEvent) => {
    e.preventDefault();
    // Handle form submission
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1
            className="anime-text text-6xl mb-4"
            style={{ textShadow: '0 0 30px #FF6B18' }}
          >
            CHAKRA NEXUS
          </h1>
          <p className="text-icy-blue text-lg">Connect with the Shadows</p>
        </motion.div>

        {/* Chakra Burst Animation on Submit */}
        {submitted && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-chakra-orange rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * 300,
                  y: Math. sin((i / 8) * Math.PI * 2) * 300,
                  opacity: 0,
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            ))}
          </motion.div>
        )}

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-lg p-8 border-2 border-chakra-orange"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-silver-white mb-2 font-semibold">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={formData. name}
                onChange={(e) => setFormData({ ...formData, name: e. target.value })}
                className="w-full bg-shadow-black/50 border-2 border-chakra-orange rounded px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-lg transition-all"
                required
              />
            </motion.div>

            {/* Email Field */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-silver-white mb-2 font-semibold">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e. target.value })}
                className="w-full bg-shadow-black/50 border-2 border-chakra-orange rounded px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-lg transition-all"
                required
              />
            </motion.div>

            {/* Subject Field */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-silver-white mb-2 font-semibold">Subject</label>
              <input
                type="text"
                placeholder="Message subject"
                value={formData. subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-shadow-black/50 border-2 border-chakra-orange rounded px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-lg transition-all"
                required
              />
            </motion.div>

            {/* Message Field */}
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-silver-white mb-2 font-semibold">Message</label>
              <textarea
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) => setFormData({ ... formData, message: e.target.value })}
                rows={6}
                className="w-full bg-shadow-black/50 border-2 border-chakra-orange rounded px-4 py-3 text-white focus:outline-none focus:border-neon-cyan focus:shadow-lg transition-all resize-none"
                required
              />
            </motion.div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px #FF6B18' }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-chakra-orange text-white font-bold py-4 rounded-lg hover:shadow-lg transition-all text-lg"
            >
              SEND MESSAGE
            </motion.button>

            {submitted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-crystal-green font-bold"
              >
                ✅ Message sent successfully! We'll respond soon.
              </motion.p>
            )}
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { title: 'Email', value: 'contact@shadowsgaming.com', icon: '📧' },
            { title: 'Discord', value: 'Join our server', icon: '💬' },
            { title: 'Twitter', value: '@ShadowsGaming', icon: '𝕏' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="glass rounded-lg p-6 border-2 border-neon-cyan text-center"
            >
              <p className="text-3xl mb-2">{item. icon}</p>
              <h3 className="text-neon-cyan font-bold mb-2">{item.title}</h3>
              <p className="text-silver-white">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
