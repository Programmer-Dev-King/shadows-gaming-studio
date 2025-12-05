// lib/animation-controller.ts - Master Animation Orchestrator

import SoundManager from './sounds';

export type AnimationPhase = 'gate' | 'portal' | 'summoning' | 'transition' | 'idle';

export interface AnimationSequence {
  phase: AnimationPhase;
  duration: number;
  delay: number;
  particles: boolean;
  sound: boolean;
  skipable: boolean;
}

export const ANIMATION_SEQUENCES: Record<AnimationPhase, AnimationSequence> = {
  gate: {
    phase: 'gate',
    duration: 2000,
    delay: 0,
    particles: true,
    sound: true,
    skipable: false,
  },
  portal: {
    phase: 'portal',
    duration: 1600,
    delay: 0,
    particles: true,
    sound: true,
    skipable: false,
  },
  summoning: {
    phase: 'summoning',
    duration: 2200,
    delay: 0,
    particles: true,
    sound: true,
    skipable: false,
  },
  transition: {
    phase: 'transition',
    duration: 1200,
    delay: 0,
    particles: true,
    sound: true,
    skipable: true,
  },
  idle: {
    phase: 'idle',
    duration: 0,
    delay: 0,
    particles: false,
    sound: false,
    skipable: false,
  },
};

export class AnimationController {
  private currentPhase: AnimationPhase = 'idle';
  private isPlaying = false;

  playSequence(phase: AnimationPhase, onComplete?: () => void): void {
    const sequence = ANIMATION_SEQUENCES[phase];
    
    if (!sequence) return;

    this.currentPhase = phase;
    this.isPlaying = true;

    if (sequence.sound) {
      this.playSoundForPhase(phase);
    }

    setTimeout(() => {
      this.isPlaying = false;
      onComplete?.();
    }, sequence.duration + sequence.delay);
  }

  private playSoundForPhase(phase: AnimationPhase): void {
    switch (phase) {
      case 'gate':
        SoundManager.playSound('gate-opening');
        break;
      case 'portal':
        SoundManager.playSound('portal-enter');
        break;
      case 'summoning':
        SoundManager.playSound('summoning-jutsu');
        break;
      case 'transition':
        SoundManager.playSound('page-transition');
        break;
    }
  }

  getCurrentPhase(): AnimationPhase {
    return this.currentPhase;
  }

  isAnimationPlaying(): boolean {
    return this.isPlaying;
  }

  skipAnimation(): void {
    this.isPlaying = false;
  }
}

export const animationController = new AnimationController();
