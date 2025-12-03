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
        }
      } else {
        konamiIndex = 0;
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [callback]);
}
