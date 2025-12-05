// lib/animation-registry.ts
// Animation Registry - Metadata and weighted random selection for page transitions

export type AnimationTheme = 'solo' | 'jjk' | 'drstone' | 'sao' | 'naruto';

export interface AnimationMetadata {
  id: string;
  name: string;
  theme: AnimationTheme;
  weight: number;
  duration: number;
  description: string;
  sounds: string[];
  canSkip: boolean;
}

// Animation definitions with weights for random selection
// Weights: solo (primary) > jjk > drstone > sao > naruto
export const ANIMATION_REGISTRY: AnimationMetadata[] = [
  // Solo Leveling (Primary - highest weight)
  {
    id: 'gate-opening',
    name: 'Gate Opening',
    theme: 'solo',
    weight: 10,
    duration: 2000,
    description: 'Massive dungeon gates slide open revealing shadow realm',
    sounds: ['gate-opening', 'shadow-aura-rise'],
    canSkip: false,
  },
  {
    id: 'shadow-arise',
    name: 'Shadow Arise',
    theme: 'solo',
    weight: 8,
    duration: 1800,
    description: 'Shadows emerge from the ground like summoned soldiers',
    sounds: ['shadow-emerge', 'power-surge'],
    canSkip: false,
  },
  {
    id: 'monarch-summon',
    name: 'Monarch Summon',
    theme: 'solo',
    weight: 6,
    duration: 2200,
    description: 'Ultimate shadow monarch summoning animation',
    sounds: ['summoning-start', 'summoning-complete'],
    canSkip: false,
  },

  // JJK (Secondary - high weight)
  {
    id: 'domain-expansion',
    name: 'Domain Expansion',
    theme: 'jjk',
    weight: 7,
    duration: 2000,
    description: 'Cursed energy domain manifests around the screen',
    sounds: ['cursed-energy', 'domain-activate'],
    canSkip: false,
  },
  {
    id: 'cursed-portal',
    name: 'Cursed Portal',
    theme: 'jjk',
    weight: 5,
    duration: 1600,
    description: 'Purple-hued portal with cursed energy particles',
    sounds: ['portal-open', 'curse-hum'],
    canSkip: true,
  },

  // Dr. Stone (Secondary - medium weight)
  {
    id: 'stone-crack',
    name: 'Stone Crack',
    theme: 'drstone',
    weight: 4,
    duration: 1400,
    description: 'Petrification cracks and reveals content like awakening',
    sounds: ['stone-crack', 'crystal-chime'],
    canSkip: true,
  },
  {
    id: 'hologram-materialize',
    name: 'Hologram Materialize',
    theme: 'drstone',
    weight: 3,
    duration: 1200,
    description: 'Scientific holographic interface materializes',
    sounds: ['data-stream', 'hologram-on'],
    canSkip: true,
  },

  // SAO (Secondary - medium weight)
  {
    id: 'portal-transition',
    name: 'Portal Transition',
    theme: 'sao',
    weight: 4,
    duration: 1600,
    description: 'Circular portal with rotating rings and scan lines',
    sounds: ['portal-open', 'data-slice'],
    canSkip: true,
  },
  {
    id: 'hud-boot',
    name: 'HUD Boot',
    theme: 'sao',
    weight: 3,
    duration: 1000,
    description: 'System interface boots up with scan elements',
    sounds: ['system-boot', 'hud-activate'],
    canSkip: true,
  },

  // Naruto (Secondary - lower weight)
  {
    id: 'chakra-burst',
    name: 'Chakra Burst',
    theme: 'naruto',
    weight: 3,
    duration: 1400,
    description: 'Orange chakra burst explosion effect',
    sounds: ['chakra-burst', 'energy-release'],
    canSkip: true,
  },
  {
    id: 'summoning-jutsu',
    name: 'Summoning Jutsu',
    theme: 'naruto',
    weight: 2,
    duration: 2000,
    description: 'Summoning circle with smoke and character reveal',
    sounds: ['summoning-jutsu', 'smoke-poof'],
    canSkip: false,
  },
];

/**
 * Get a weighted random animation from the registry
 * Weights determine probability: higher weight = more likely to be selected
 */
export function getWeightedRandomAnimation(
  filterTheme?: AnimationTheme | AnimationTheme[]
): AnimationMetadata {
  let animations = ANIMATION_REGISTRY;

  // Filter by theme if specified
  if (filterTheme) {
    const themes = Array.isArray(filterTheme) ? filterTheme : [filterTheme];
    animations = animations.filter((a) => themes.includes(a.theme));
  }

  if (animations.length === 0) {
    return ANIMATION_REGISTRY[0]; // Fallback to first animation
  }

  // Calculate total weight
  const totalWeight = animations.reduce((sum, a) => sum + a.weight, 0);

  // Generate random number in range [0, totalWeight)
  let random = Math.random() * totalWeight;

  // Select animation based on weight
  for (const animation of animations) {
    random -= animation.weight;
    if (random <= 0) {
      return animation;
    }
  }

  return animations[animations.length - 1];
}

/**
 * Get animation by ID
 */
export function getAnimationById(id: string): AnimationMetadata | undefined {
  return ANIMATION_REGISTRY.find((a) => a.id === id);
}

/**
 * Get all animations for a specific theme
 */
export function getAnimationsByTheme(theme: AnimationTheme): AnimationMetadata[] {
  return ANIMATION_REGISTRY.filter((a) => a.theme === theme);
}

/**
 * Get the default page entry animation based on route
 */
export function getPageAnimation(route: string): AnimationMetadata {
  const routeAnimationMap: Record<string, string> = {
    '/': 'gate-opening',
    '/about': 'portal-transition',
    '/vision': 'stone-crack',
    '/team': 'summoning-jutsu',
    '/projects': 'hologram-materialize',
    '/contact': 'chakra-burst',
    '/login': 'shadow-arise',
    '/signup': 'cursed-portal',
    '/dashboard': 'hud-boot',
    '/shadow-realm': 'domain-expansion',
  };

  const animationId = routeAnimationMap[route];
  if (animationId) {
    const animation = getAnimationById(animationId);
    if (animation) return animation;
  }

  // Return weighted random if no specific mapping
  return getWeightedRandomAnimation();
}

export default {
  ANIMATION_REGISTRY,
  getWeightedRandomAnimation,
  getAnimationById,
  getAnimationsByTheme,
  getPageAnimation,
};
