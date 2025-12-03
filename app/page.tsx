'use client';

import React, { useEffect, useState } from 'react';
import { GateOpening } from '@/components/animations/GateOpening';
import { WelcomeOverlay } from '@/components/WelcomeOverlay';
import { ParticleSystem } from '@/components/animations/ParticleSystem';
import { useAnimation } from '@/components/animations/AnimationProvider';
import { PortalTransition } from '@/components/animations/PortalTransition';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [showGate, setShowGate] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPortal, setShowPortal] = useState(false);
  const { setGateOpened } = useAnimation();

  const handleGateComplete = () => {
    setShowGate(false);
    setShowWelcome(true);
    setGateOpened(true);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  const handleNavigate = () => {
    setShowPortal(true);
    setTimeout(() => {
      setShowPortal(false);
    }, 1600);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black relative overflow-hidden">
      {/* Particle System */}
      <ParticleSystem count={30} color="#1F6BFF" type="float" autoStart={true} />

      {/* Gate Opening */}
      {showGate && <GateOpening onComplete={handleGateComplete} />}

      {/* Welcome Overlay */}
      {showWelcome && <WelcomeOverlay onDismiss={handleWelcomeComplete} />}

      {/* Portal Transition */}
      <PortalTransition isActive={showPortal} onComplete={() => setShowPortal(false)} />

      {/* Main Content */}
      {! showGate && !showWelcome && (
        <div className="relative z-20">
          {/* Hero Section */}
          <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <h1 className="anime-text text-6xl md:text-8xl glow-blue mb-4">SHADOWS</h1>
              <p className="text-xl md:text-3xl text-icy-blue mb-8">
                Gaming Studio - Ascension of Shadows
              </p>
              <p className="text-silver-white max-w-2xl mx-auto mb-12">
                Experience the ultimate fusion of anime aesthetics and cutting-edge game development. 
              </p>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-6 justify-center"
            >
              <Link href="/about" onClick={handleNavigate}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-jin-woo-blue text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  ABOUT US
                </motion.button>
              </Link>

              <Link href="/vision" onClick={handleNavigate}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-cursed-purple text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  VISION
                </motion.button>
              </Link>

              <Link href="/team" onClick={handleNavigate}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-chakra-orange text-white font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  TEAM
                </motion.button>
              </Link>

              <Link href="/projects" onClick={handleNavigate}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-crystal-green text-shadow-black font-bold rounded-lg hover:shadow-lg transition-all"
                >
                  PROJECTS
                </motion.button>
              </Link>
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="anime-text text-5xl glow-blue text-center mb-16"
              >
                WHY SHADOWS? 
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: 'Anime Aesthetics',
                    description: 'Solo Leveling, JJK, Dr. Stone, SAO, Naruto fusion',
                    color: 'blue',
                  },
                  {
                    title: 'AAA Quality',
                    description: 'Enterprise-level game development and storytelling',
                    color: 'purple',
                  },
                  {
                    title: 'Innovation',
                    description: 'Cutting-edge technology and creative excellence',
                    color: 'orange',
                  },
                ].map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2 }}
                    className={`glass rounded-lg p-8 border-2 border-${
                      feature.color === 'blue'
                        ? 'jin-woo-blue'
                        : feature.color === 'purple'
                        ? 'cursed-purple'
                        : 'chakra-orange'
                    }`}
                  >
                    <h3 className="text-2xl font-bold mb-4" style={{
                      color: feature.color === 'blue' ? '#1F6BFF' : feature.color === 'purple' ?  '#6F2BFF' : '#FF6B18'
                    }}>
                      {feature.title}
                    </h3>
                    <p className="text-silver-white">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center glass rounded-lg p-12 border-2 border-jin-woo-blue">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <h2 className="anime-text text-4xl glow-blue mb-6">JOIN THE SHADOWS</h2>
                <p className="text-silver-white mb-8 text-lg">
                  Be part of something legendary. Rise with us. 
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Link href="/signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-8 py-4 bg-jin-woo-blue text-white font-bold rounded-lg hover:shadow-lg"
                    >
                      SIGN UP
                    </motion. button>
                  </Link>
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="px-8 py-4 border-2 border-jin-woo-blue text-jin-woo-blue font-bold rounded-lg hover:bg-jin-woo-blue/10"
                    >
                      CONTACT US
                    </motion.button>
                  </Link>
                </div>
              </motion. div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
              }
