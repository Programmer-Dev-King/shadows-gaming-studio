'use client';

import { useEffect } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
];

export default function useKonamiCode(callback: () => void) {
  useEffect(() => {
    let konamiIndex = 0;

    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.code;

      if (key === KONAMI_CODE[konamiIndex]) {
        konamiIndex++;

        if (konamiIndex === KONAMI_CODE.length) {
          callback();
          konamiIndex = 0;
          
          // Visual feedback
          console.log('🔓 KONAMI CODE ACTIVATED - Shadow Realm Unlocked!');
          
          // Create celebration effect
          if (typeof window !== 'undefined') {
            document.dispatchEvent(new CustomEvent('konamiUnlocked'));
          }
        }
      } else {
        konamiIndex = 0;
        if (key === KONAMI_CODE[0]) {
          konamiIndex = 1;
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [callback]);
}
