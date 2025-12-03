// components/WelcomeOverlay.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomWelcomeMessage } from '@/lib/welcome-messages';

interface WelcomeOverlayProps {
  onDismiss?: () => void;
  duration?: number;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({
  onDismiss,
  duration = 3000,
}) => {
  const [message, setMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setMessage(getRandomWelcomeMessage());

    const timer = setTimeout(() => {
      setIsVisible(false);
      onDismiss?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0. 5 }}
        >
          <motion.div
            className="text-center"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ duration: 0. 6 }}
          >
            <h2 className="anime-text glow-blue text-4xl md:text-6xl">
              {message}
            </h2>
            <motion.div
              className="mt-8 h-1 bg-gradient-to-r from-transparent via-jin-woo-blue to-transparent"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: duration / 1000 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
