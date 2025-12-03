'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function Vision() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="anime-text text-6xl glow-green text-center mb-12">VISION</h1>
          
          <div className="glass rounded-lg p-12 border-2 border-crystal-green mb-8">
            <h2 className="text-3xl font-bold text-crystal-green mb-6">Stone Age to Digital Future</h2>
            <p className="text-lg text-silver-white leading-relaxed mb-6">
              Our vision is to revolutionize the gaming industry by blending cutting-edge technology with compelling storytelling. We believe in creating experiences that transcend the digital realm. 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="glass rounded-lg p-6 border border-jin-woo-blue"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-jin-woo-blue mb-4">Game Engines</h3>
              <p className="text-silver-white">Unreal Engine 5, Unity, Custom Engines</p>
            </motion.div>

            <motion.div
              className="glass rounded-lg p-6 border border-cursed-purple"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-cursed-purple mb-4">AI/ML Integration</h3>
              <p className="text-silver-white">Advanced AI systems, Machine Learning optimization</p>
            </motion. div>

            <motion.div
              className="glass rounded-lg p-6 border border-neon-cyan"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-neon-cyan mb-4">Motion Capture</h3>
              <p className="text-silver-white">AAA-grade mocap technology and pipelines</p>
            </motion.div>

            <motion. div
              className="glass rounded-lg p-6 border border-chakra-orange"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-2xl font-bold text-chakra-orange mb-4">3D Art Pipeline</h3>
              <p className="text-silver-white">Character design, Environment art, Visual effects</p>
            </motion. div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
