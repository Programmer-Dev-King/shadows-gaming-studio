'use client';

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { advancedAnimationController } from '@/lib/animation-controller-advanced';
import { getPageAnimation } from '@/lib/animation-registry';
import { portalTransitionSequence } from '@/lib/animation-sequences';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  blockNavigation?: boolean; // Q1: Block until animation completes
  animationId?: string;
}

/**
 * AnimatedLink - Navigation link that plays transition animations
 * Blocks navigation until animation completes when blockNavigation is true (default)
 */
export const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  className = '',
  blockNavigation = true,
  animationId,
}) => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = useCallback(
    async (e: React.MouseEvent) => {
      e.preventDefault();

      if (isTransitioning) return;

      setIsTransitioning(true);

      // Get animation for target page
      const animation = animationId
        ? { duration: 1600, sounds: ['portal-open'] }
        : getPageAnimation(href);

      // Dispatch animation start event
      if (typeof window !== 'undefined') {
        document.dispatchEvent(
          new CustomEvent('routeAnimationStart', {
            detail: { href, animation },
          })
        );
      }

      if (blockNavigation) {
        // Block navigation until animation completes
        try {
          await advancedAnimationController.playSequence(portalTransitionSequence);
        } catch (error) {
          console.error('Animation failed:', error);
        }
      }

      // Navigate after animation
      router.push(href);
      setIsTransitioning(false);
    },
    [href, router, blockNavigation, animationId, isTransitioning]
  );

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      className={`cursor-pointer ${className} ${isTransitioning ? 'pointer-events-none opacity-70' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.a>
  );
};

export default AnimatedLink;
