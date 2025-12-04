// lib/animation-sequences.ts

import { animationController } from './animation-controller';

export interface AnimationSequence {
  name: string;
  duration: number;
  steps: AnimationStep[];
  canSkip: boolean;
  sounds: string[];
}

export interface AnimationStep {
  phase: string;
  duration: number;
  delay: number;
  action: () => void | Promise<void>;
}

// GATE OPENING SEQUENCE (Stacked: Gate → Aura → Text)
export const gateOpeningSequence: AnimationSequence = {
  name: 'gateOpening',
  duration: 2000,
  canSkip: false,
  sounds: ['gate-opening', 'shadow-aura-rise'],
  steps: [
    {
      phase: 'gateStart',
      duration: 0,
      delay: 0,
      action: () => console.log('Gate opening begins'),
    },
    {
      phase: 'gateMovement',
      duration: 1600,
      delay: 0,
      action: async () => {
        // Left and right doors sliding
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'gateMovement' } }));
      },
    },
    {
      phase: 'auraShadowRise',
      duration: 1200,
      delay: 400,
      action: async () => {
        // Shadow aura rising from bottom
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'auraShadowRise' } }));
      },
    },
    {
      phase: 'textGlow',
      duration: 800,
      delay: 800,
      action: async () => {
        // Text appearing with glow
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'textGlow' } }));
      },
    },
  ],
};

// PORTAL TRANSITION SEQUENCE (Stacked: Rings → Glitch → Fade)
export const portalTransitionSequence: AnimationSequence = {
  name: 'portalTransition',
  duration: 1600,
  canSkip: false,
  sounds: ['portal-open', 'data-slice'],
  steps: [
    {
      phase: 'portalRings',
      duration: 1600,
      delay: 0,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'portalRings' } }));
      },
    },
    {
      phase: 'glitchEffect',
      duration: 400,
      delay: 800,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'glitchEffect' } }));
      },
    },
    {
      phase: 'portalFade',
      duration: 600,
      delay: 1000,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'portalFade' } }));
      },
    },
  ],
};

// TEAM SUMMONING SEQUENCE (Stacked: Circle → Shadow Rise → Text)
export const teamSummoningSequence: AnimationSequence = {
  name: 'teamSummoning',
  duration: 2200,
  canSkip: false,
  sounds: ['summoning-start', 'shadow-emerge', 'summoning-complete'],
  steps: [
    {
      phase: 'summoningCircle',
      duration: 800,
      delay: 0,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'summoningCircle' } }));
      },
    },
    {
      phase: 'shadowRise',
      duration: 800,
      delay: 600,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'shadowRise' } }));
      },
    },
    {
      phase: 'characterReveal',
      duration: 600,
      delay: 1400,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'characterReveal' } }));
      },
    },
  ],
};

// PAGE-SPECIFIC SEQUENCES
export const aboutPageSequence: AnimationSequence = {
  name: 'aboutPageEntry',
  duration: 1600,
  canSkip: false,
  sounds: ['portal-open'],
  steps: [
    {
      phase: 'portalTransition',
      duration: 1600,
      delay: 0,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'aboutEntry' } }));
      },
    },
  ],
};

export const visionPageSequence: AnimationSequence = {
  name: 'visionPageEntry',
  duration: 1800,
  canSkip: false,
  sounds: ['stone-crack', 'crystal-chime'],
  steps: [
    {
      phase: 'stoneCrack',
      duration: 600,
      delay: 0,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'stoneCrack' } }));
      },
    },
    {
      phase: 'stoneToHologram',
      duration: 800,
      delay: 600,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'stoneToHologram' } }));
      },
    },
    {
      phase: 'contentReveal',
      duration: 400,
      delay: 1400,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'contentReveal' } }));
      },
    },
  ],
};

export const teamPageSequence: AnimationSequence = {
  name: 'teamPageEntry',
  duration: 2000,
  canSkip: false,
  sounds: ['chakra-gather'],
  steps: [
    {
      phase: 'chakraGather',
      duration: 800,
      delay: 0,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'chakraGather' } }));
      },
    },
    {
      phase: 'teamReadiness',
      duration: 200,
      delay: 800,
      action: async () => {
        // Summoning ready state
      },
    },
  ],
};

export const contactPageSequence: AnimationSequence = {
  name: 'contactPageEntry',
  duration: 1400,
  canSkip: false,
  sounds: ['chakra-burst'],
  steps: [
    {
      phase: 'chakraBurst',
      duration: 400,
      delay: 0,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'chakraBurst' } }));
      },
    },
    {
      phase: 'formAppear',
      duration: 600,
      delay: 400,
      action: async () => {
        document.dispatchEvent(new CustomEvent('animationPhase', { detail: { phase: 'formAppear' } }));
      },
    },
  ],
};
