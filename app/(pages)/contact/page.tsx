'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e. preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-abyss-blue via-shadow-black to-abyss-blue py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="anime-text text-6xl glow-orange text-center mb-12">CHAKRA NEXUS</h1>

          <div className="glass rounded-lg p-8 border-2 border-chakra-orange">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-silver-white mb-2 font-semibold">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ... formData, name: e.target.value })}
                  className="w-full bg-shadow-black/50 border border-jin-woo-blue rounded px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>

              <div>
                <label className="block text-silver-white mb-2 font-semibold">Email</label>
                <input
                  type="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e. target.value })}
                  className="w-full bg-shadow-black/50 border border-jin-woo-blue rounded px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>

              <div>
                <label className="block text-silver-white mb-2 font-semibold">Message</label>
                <textarea
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full bg-shadow-black/50 border border-jin-woo-blue rounded px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-chakra-orange text-white font-bold py-3 rounded hover:shadow-lg transition-all"
              >
                SEND MESSAGE
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
                  }
