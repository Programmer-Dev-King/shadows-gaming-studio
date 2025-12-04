// lib/theme. ts

export const COLORS = {
  // Primary - Solo Leveling
  shadowBlack: '#05070A',
  abyssBlue: '#0A1A3B',
  jinWooBlue: '#1F6BFF',

  // Secondary - JJK + SAO
  cursedPurple: '#6F2BFF',
  neonCyan: '#37F8FF',

  // Accent - Dr. Stone + Naruto
  crystalGreen: '#8EFFC1',
  chakraOrange: '#FF6B18',

  // Text
  silverWhite: '#E5E7EB',
  icyBlue: '#A5C7FF',
};

export const GRADIENTS = {
  primary: `linear-gradient(135deg, ${COLORS.shadowBlack} 0%, ${COLORS.abyssBlue} 50%, ${COLORS.shadowBlack} 100%)`,
  portal: `radial-gradient(circle, ${COLORS.jinWooBlue}, transparent)`,
  summoning: `linear-gradient(180deg, ${COLORS.cursedPurple} 0%, transparent 100%)`,
  energy: `conic-gradient(from 0deg, ${COLORS.neonCyan}, ${COLORS.cursedPurple}, ${COLORS.neonCyan})`,
};

export const SHADOWS = {
  glow: `0 0 20px ${COLORS.jinWooBlue}, 0 0 40px ${COLORS.jinWooBlue}`,
  glowPurple: `0 0 20px ${COLORS.cursedPurple}, 0 0 40px ${COLORS.cursedPurple}`,
  glowCyan: `0 0 20px ${COLORS.neonCyan}, 0 0 40px ${COLORS.neonCyan}`,
};

export const ANIMATIONS = {
  gateDuration: 2000,
  portalDuration: 1600,
  summoningDuration: 2200,
  pageFadeIn: 800,
};

export const PAGE_THEMES = {
  home: {
    color: COLORS.jinWooBlue,
    gradient: GRADIENTS.primary,
    animation: 'gateOpening',
  },
  about: {
    color: COLORS.jinWooBlue,
    gradient: GRADIENTS.portal,
    animation: 'portalTransition',
  },
  vision: {
    color: COLORS.crystalGreen,
    gradient: 'linear-gradient(135deg, #05070A, #0A1A3B)',
    animation: 'stoneCrack',
  },
  team: {
    color: COLORS. cursedPurple,
    gradient: GRADIENTS.summoning,
    animation: 'summoningSequence',
  },
  projects: {
    color: COLORS.neonCyan,
    gradient: GRADIENTS.energy,
    animation: 'comingSoon',
  },
  contact: {
    color: COLORS.chakraOrange,
    gradient: 'linear-gradient(135deg, #05070A, #6F2BFF)',
    animation: 'chakraBurst',
  },
};
