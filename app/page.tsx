'use client';

import React, { useEffect, useState } from 'react';
import { GateOpeningAdvanced } from '@/components/animations/GateOpeningAdvanced';
import { WelcomeOverlay } from '@/components/WelcomeOverlay';
import { ParticleSystem } from '@/components/animations/ParticleSystem';
import { Navbar } from '@/components/ui/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { advancedAnimationController } from '@/lib/animation-controller-advanced';
import { portalTransitionSequence } from '@/lib/animation-sequences';

export default function Home() {
  const router = useRouter();
  const [showGate, setShowGate] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  const handleGateComplete = () => {
    setShowGate(false);
    setShowWelcome(true);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  const handleNavigate = async (path: string) => {
    setShowPortal(true);
    await advancedAnimationController. playSequence(portalTransitionSequence);
    router.push(path);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-shadow-black via-abyss-blue to-shadow-black relative overflow-hidden">
      {/* Particle Background */}
      {! showGate && ! showWelcome && <ParticleSystem count={30} color="#1F6BFF" type="float" />}

      {/* Gate Opening Animation */}
      {showGate && <GateOpeningAdvanced onComplete={handleGateComplete} />}

      {/* Welcome Overlay */}
      {showWelcome && <WelcomeOverlay onDismiss={handleWelcomeComplete} />}

      {/* Portal Transition */}
      {showPortal && (
        <motion.div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <div className="w-40 h-40 border-4 border-jin-woo-blue rounded-full" />
          </motion.div>
        </motion.div>
      )}

      {/* Navigation */}
      {!showGate && !showWelcome && <Navbar />}

      {/* Main Content */}
      {!showGate && !showWelcome && (
        <div className="relative z-20 pt-20">
          {/* HERO SECTION */}
          <section className="min-h-screen flex flex-col items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center mb-12"
            >
              <h1
                className="anime-text text-6xl md:text-8xl mb-4"
                style={{
                  color: '#1F6BFF',
                  textShadow: '0 0 30px #1F6BFF, 0 0 60px #1F6BFF',
                }}
              >
                SHADOWS
              </h1>
              <p className="text-xl md:text-3xl text-icy-blue mb-8">
                Gaming Studio - Ascension of Shadows
              </p>
              <div className="w-32 h-1 mx-auto bg-gradient-to-r from-transparent via-jin-woo-blue to-transparent mb-8" />
              <p className="text-silver-white max-w-2xl mx-auto text-lg">
                Experience the ultimate fusion of anime aesthetics and cutting-edge game development. 
              </p>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-wrap gap-6 justify-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1. 05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate('/about')}
                className="px-8 py-4 bg-jin-woo-blue text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                ABOUT US
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0. 95 }}
                onClick={() => handleNavigate('/vision')}
                className="px-8 py-4 bg-cursed-purple text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                VISION
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate('/team')}
                className="px-8 py-4 bg-chakra-orange text-white font-bold rounded-lg hover:shadow-lg transition-all"
              >
                TEAM
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavigate('/projects')}
                className="px-8 py-4 bg-crystal-green text-shadow-black font-bold rounded-lg hover:shadow-lg transition-all"
              >
                PROJECTS
              </motion.button>
            </motion.div>
          </section>

          {/* OUR VISION SECTION */}
          <section className="py-20 px-4 bg-gradient-to-b from-transparent via-shadow-black to-transparent">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="anime-text text-5xl text-center mb-16"
                style={{ textShadow: '0 0 20px #1F6BFF' }}
              >
                RISE ABOVE MORTALS
              </motion.h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Vision Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="glass rounded-lg p-8 border-2 border-jin-woo-blue"
                >
                  <h3 className="text-2xl font-bold text-jin-woo-blue mb-4">Our Vision</h3>
                  <p className="text-silver-white">
                    To revolutionize gaming by blending anime storytelling with AAA game development excellence. 
                  </p>
                </motion.div>

                {/* Mission Card */}
                <motion. div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass rounded-lg p-8 border-2 border-cursed-purple"
                >
                  <h3 className="text-2xl font-bold text-cursed-purple mb-4">Our Mission</h3>
                  <p className="text-silver-white">
                    Create immersive experiences that inspire, challenge, and transform players worldwide.
                  </p>
                </motion.div>
              </div>

              {/* Philosophy - Blueprint Style */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="glass rounded-lg p-8 border-2 border-crystal-green"
              >
                <h3 className="text-2xl font-bold text-crystal-green mb-4">Our Philosophy</h3>
                <p className="text-silver-white mb-6">
                  Innovation through artistry.  Power through teamwork. Excellence through dedication.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="border border-crystal-green p-4 rounded">
                    <p className="text-crystal-green font-bold">Game Design</p>
                    <p className="text-icy-blue">Crafting legendary experiences</p>
                  </div>
                  <div className="border border-crystal-green p-4 rounded">
                    <p className="text-crystal-green font-bold">Technology</p>
                    <p className="text-icy-blue">Pushing technical boundaries</p>
                  </div>
                  <div className="border border-crystal-green p-4 rounded">
                    <p className="text-crystal-green font-bold">Community</p>
                    <p className="text-icy-blue">Building passionate fanbases</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* OUR GAMES SECTION */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="anime-text text-5xl text-center mb-16"
                style={{ textShadow: '0 0 20px #6F2BFF' }}
              >
                OUR GAMES
              </motion. h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.2 }}
                    className="glass rounded-lg p-6 border-2 border-cursed-purple hover:border-neon-cyan transition-all"
                  >
                    <div className="w-full h-40 bg-gradient-to-br from-cursed-purple to-shadow-black rounded mb-4" />
                    <h3 className="text-xl font-bold text-cursed-purple mb-2">Game {i}</h3>
                    <p className="text-silver-white text-sm mb-4">
                      Legendary adventure awaits in this groundbreaking title.
                    </p>
                    <button className="px-4 py-2 bg-cursed-purple text-white rounded text-sm hover:shadow-lg">
                      EXPLORE
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA SECTION */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto glass rounded-lg p-12 border-2 border-jin-woo-blue text-center">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                <h2 className="anime-text text-4xl mb-6" style={{ textShadow: '0 0 20px #1F6BFF' }}>
                  JOIN THE SHADOWS
                </h2>
                <p className="text-silver-white mb-8 text-lg">
                  Be part of something legendary. Rise with us into the darkness.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleNavigate('/signup')}
                    className="px-8 py-4 bg-jin-woo-blue text-white font-bold rounded-lg"
                  >
                    SIGN UP
                  </motion. button>
                  <motion. button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleNavigate('/contact')}
                    className="px-8 py-4 border-2 border-jin-woo-blue text-jin-woo-blue font-bold rounded-lg hover:bg-jin-woo-blue/10"
                  >
                    CONTACT US
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
                }
