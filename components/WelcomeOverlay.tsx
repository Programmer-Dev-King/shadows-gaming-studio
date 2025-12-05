'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getRandomWelcomeMessage } from '@/lib/welcome-messages-extended';

interface WelcomeOverlayProps {
  onDismiss?: () => void;
  duration?: number;
}

export const WelcomeOverlay: React.FC<WelcomeOverlayProps> = ({
  onDismiss,
  duration = 4000,
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
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="text-center max-w-2xl px-4"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: -50 }}
            transition={{ duration: 0.8, type: 'spring' }}
          >
            {/* Message Text */}
            <motion.h2
              className="anime-text text-5xl md:text-7xl mb-8 leading-tight"
              animate={{
                textShadow: [
                  '0 0 20px #1F6BFF',
                  '0 0 40px #1F6BFF, 0 0 60px #1F6BFF',
                  '0 0 20px #1F6BFF',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{ color: '#1F6BFF' }}
            >
              {message}
            </motion.h2>

            {/* Progress Bar */}
            <motion.div
              className="w-64 h-1 mx-auto bg-gradient-to-r from-transparent via-jin-woo-blue to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
              style={{ originX: 0 }}
            />

            {/* Subtitle */}
            <motion.p
              className="text-icy-blue text-lg mt-8 animate-pulse"
              animate={{ opacity: [0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              Press any key to continue...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
