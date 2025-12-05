'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import animationRegistry from '@/lib/animation-registry';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  tags?: string[];
  animationDuration?: number;
}

/**
 * AnimatedLink - Blocks navigation until animation completes
 * Uses AnimationRegistry to select appropriate transition animation
 */
export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  className = '',
  tags = ['navigation', 'transition'],
  animationDuration,
}) => {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      if (isAnimating) return;

      setIsAnimating(true);

      // Get animation from registry based on tags
      const animation = animationRegistry.selectWeightedRandom(tags, 'portal');
      const duration = animationDuration || animation?.duration || 1600;

      // Wait for animation to complete before navigating
      await new Promise((resolve) => setTimeout(resolve, duration));

      // Navigate after animation
      router.push(href);
      setIsAnimating(false);
    },
    [href, router, isAnimating, tags, animationDuration]
  );

  return (
    <>
      <a href={href} onClick={handleClick} className={className}>
        {children}
      </a>

      {/* Portal Transition Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-shadow-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Outer Ring */}
            <motion.div
              className="absolute w-96 h-96 border-4 border-jin-woo-blue rounded-full"
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ scale: 1, rotate: 360, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              transition={{ duration: 1.6 }}
              style={{ boxShadow: '0 0 40px #1F6BFF' }}
            />

            {/* Middle Ring */}
            <motion.div
              className="absolute w-72 h-72 border-2 border-neon-cyan rounded-full"
              initial={{ scale: 0, rotate: 360, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.4, delay: 0.1 }}
              style={{ boxShadow: '0 0 30px #37F8FF' }}
            />

            {/* Inner Ring */}
            <motion.div
              className="absolute w-48 h-48 border-2 border-cursed-purple rounded-full"
              initial={{ scale: 0, rotate: 0, opacity: 0 }}
              animate={{ scale: 1, rotate: 360, opacity: 1 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              style={{ boxShadow: '0 0 25px #6F2BFF' }}
            />

            {/* Center Glow */}
            <motion.div
              className="absolute w-32 h-32 rounded-full bg-gradient-radial from-jin-woo-blue to-transparent"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0.5], scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 1.6 }}
            />

            {/* Loading Text */}
            <motion.p
              className="absolute mt-60 text-icy-blue font-mono text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              [ENTERING PORTAL...]
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedLink;
