'use client';

import React, { useEffect, useState } from 'react';
import SoundManager from '@/lib/sounds';

/**
 * ClientMounts - Client-side initialization component
 * Handles:
 * - Sound manager initialization (audio after user gesture)
 * - Konami code listener
 * - Animation registry preload
 */
export const ClientMounts: React.FC = () => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    // Enable audio after first user interaction (Q3: Audio only after gesture)
    const enableAudio = () => {
      if (!audioEnabled) {
        setAudioEnabled(true);
        SoundManager.setEnabled(true);

        // Preload common sounds
        const soundsToLoad = [
          { name: 'portal-open', url: '/audio/portal-open.wav' },
          { name: 'summon', url: '/audio/summon.wav' },
        ];

        soundsToLoad.forEach(({ name, url }) => {
          SoundManager.loadSound(name, url).catch(() => {
            // Silently fail if audio files don't exist
          });
        });
      }
    };

    // Listen for various user gestures
    const events = ['click', 'touchstart', 'keydown'];
    events.forEach((event) => {
      document.addEventListener(event, enableAudio, { once: true });
    });

    // Listen for Konami code unlock
    const handleKonamiUnlock = () => {
      console.log('🔓 Konami Code Activated!');
      // Visual celebration could be added here
    };

    document.addEventListener('konamiUnlocked', handleKonamiUnlock);

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, enableAudio);
      });
      document.removeEventListener('konamiUnlocked', handleKonamiUnlock);
    };
  }, [audioEnabled]);

  // This component renders nothing visible
  return null;
};

export default ClientMounts;
