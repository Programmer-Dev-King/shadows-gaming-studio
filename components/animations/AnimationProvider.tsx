// components/animations/AnimationProvider. tsx

'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimationController, AnimationPhase } from '@/lib/animation-controller';

interface AnimationContextType {
  controller: AnimationController;
  playAnimation: (phase: AnimationPhase) => Promise<void>;
  currentPhase: AnimationPhase;
  gateOpened: boolean;
  setGateOpened: (value: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const [controller] = useState(() => new AnimationController());
  const [currentPhase, setCurrentPhase] = useState<AnimationPhase>('idle');
  const [gateOpened, setGateOpened] = useState(false);

  const playAnimation = useCallback(
    (phase: AnimationPhase): Promise<void> => {
      return new Promise((resolve) => {
        setCurrentPhase(phase);
        controller.playSequence(phase, () => {
          setCurrentPhase('idle');
          resolve();
        });
      });
    },
    [controller]
  );

  const value: AnimationContextType = {
    controller,
    playAnimation,
    currentPhase,
    gateOpened,
    setGateOpened,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimation() {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimation must be used within AnimationProvider');
  }
  return context;
      }
