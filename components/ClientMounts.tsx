'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useKonamiCode from '@/lib/konami-code';

/**
 * ClientMounts - Client-side only mounting handlers
 * - Konami code listener for shadow-realm access
 * - User gesture detection for audio
 * - Other client-side effects
 */
export const ClientMounts: React.FC = () => {
  const router = useRouter();
  const [hasUserGesture, setHasUserGesture] = useState(false);

  // Konami code handler - redirects to shadow-realm
  useKonamiCode(() => {
    console.log('🔓 Konami Code Activated! Entering Shadow Realm...');
    router.push('/shadow-realm');
  });

  // Track user gesture for audio autoplay
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserGesture(true);
      // Store in session for sounds.ts to use
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('userGesture', 'true');
      }
      // Remove listeners after first interaction
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);
    window.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Listen for konami unlock event
  useEffect(() => {
    const handleKonamiUnlock = () => {
      // Visual celebration effect
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        inset: 0;
        background: radial-gradient(circle, rgba(111,43,255,0.3), transparent);
        z-index: 9999;
        pointer-events: none;
        animation: konami-flash 0.5s ease-out;
      `;
      document.body.appendChild(overlay);

      setTimeout(() => {
        overlay.remove();
      }, 500);
    };

    document.addEventListener('konamiUnlocked', handleKonamiUnlock);
    return () => document.removeEventListener('konamiUnlocked', handleKonamiUnlock);
  }, []);

  // This component renders nothing visible
  return null;
};

export default ClientMounts;
