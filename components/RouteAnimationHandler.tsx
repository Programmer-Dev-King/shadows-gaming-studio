'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import animationRegistry, { AnimationEntry } from '@/lib/animation-registry';

// Page tags mapping
const PAGE_TAGS: Record<string, string[]> = {
  '/': ['home', 'entrance', 'hero'],
  '/about': ['about', 'navigation', 'page'],
  '/vision': ['vision', 'reveal', 'awakening'],
  '/team': ['team', 'character', 'reveal'],
  '/projects': ['projects', 'tech', 'science'],
  '/contact': ['contact', 'action', 'energy'],
  '/login': ['login', 'system', 'dashboard'],
  '/signup': ['signup', 'system'],
  '/dashboard': ['dashboard', 'stats', 'profile'],
  '/shadow-realm': ['secret', 'hidden', 'special'],
  '/portal-demo': ['demo', 'navigation', 'transition'],
  '/team-demo': ['demo', 'team', 'character'],
};

/**
 * RouteAnimationHandler - Handles page entrance animations
 * Selects animations based on page tags using AnimationRegistry
 */
export const RouteAnimationHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<AnimationEntry | null>(null);

  useEffect(() => {
    // Get tags for current page
    const tags = PAGE_TAGS[pathname] || ['navigation', 'page'];

    // Select animation from registry
    const animation = animationRegistry.selectWeightedRandom(tags, 'transition');
    setCurrentAnimation(animation);

    // Trigger entrance animation
    setIsTransitioning(true);
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, animation?.duration || 800);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Page Content with fade-in */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: isTransitioning ? 0.3 : 0 }}
      >
        {children}
      </motion.div>

      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && currentAnimation && (
          <motion.div
            className="fixed inset-0 z-40 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Theme-specific transition effect */}
            {currentAnimation.theme === 'solo' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-jin-woo-blue/20 to-transparent"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: [0, 0.5, 0], y: 0 }}
                transition={{ duration: currentAnimation.duration / 1000 }}
              />
            )}

            {currentAnimation.theme === 'jjk' && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cursed-purple/20 via-transparent to-cursed-purple/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: currentAnimation.duration / 1000 }}
              />
            )}

            {currentAnimation.theme === 'drstone' && (
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(45deg, transparent 48%, #8EFFC1 49%, #8EFFC1 51%, transparent 52%)',
                  backgroundSize: '20px 20px',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: currentAnimation.duration / 1000 }}
              />
            )}

            {currentAnimation.theme === 'sao' && (
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: [0, 1, 0] }}
                transition={{ duration: currentAnimation.duration / 1000 }}
              />
            )}

            {currentAnimation.theme === 'naruto' && (
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-chakra-orange/10 to-transparent"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2], opacity: [0, 0.3, 0] }}
                transition={{ duration: currentAnimation.duration / 1000 }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RouteAnimationHandler;
