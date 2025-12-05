'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { getPageAnimation, AnimationMetadata } from '@/lib/animation-registry';

interface RouteAnimationHandlerProps {
  children: React.ReactNode;
}

/**
 * RouteAnimationHandler - Manages page entry/exit animations
 * Listens for route changes and triggers appropriate animations
 */
export const RouteAnimationHandler: React.FC<RouteAnimationHandlerProps> = ({ children }) => {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<AnimationMetadata | null>(null);

  useEffect(() => {
    // Listen for route animation start events from AnimatedLink
    const handleAnimationStart = (e: CustomEvent) => {
      const { animation } = e.detail;
      setCurrentAnimation(animation);
      setIsAnimating(true);
    };

    document.addEventListener('routeAnimationStart', handleAnimationStart as EventListener);

    return () => {
      document.removeEventListener('routeAnimationStart', handleAnimationStart as EventListener);
    };
  }, []);

  useEffect(() => {
    // Reset animation state when route changes
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setCurrentAnimation(null);
      }, currentAnimation?.duration || 1600);

      return () => clearTimeout(timer);
    }
  }, [pathname, isAnimating, currentAnimation]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default RouteAnimationHandler;
