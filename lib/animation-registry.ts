// lib/animation-registry.ts
// Manages animation selection based on page tags with weighted random selection
// Primary theme: 'solo' with secondary hierarchy: jjk > drstone > sao > naruto

export type AnimationTheme = 'solo' | 'jjk' | 'drstone' | 'sao' | 'naruto';
export type AnimationType = 'gate' | 'portal' | 'summoning' | 'transition' | 'particle';

export interface AnimationEntry {
  id: string;
  name: string;
  theme: AnimationTheme;
  type: AnimationType;
  weight: number;
  tags: string[];
  duration: number;
  component?: string;
}

// Theme weights (higher = more likely to be selected)
const THEME_WEIGHTS: Record<AnimationTheme, number> = {
  solo: 40,
  jjk: 25,
  drstone: 15,
  sao: 12,
  naruto: 8,
};

// Animation registry
const ANIMATIONS: AnimationEntry[] = [
  // Solo Leveling Animations
  {
    id: 'gate-opening-solo',
    name: 'Gate Opening',
    theme: 'solo',
    type: 'gate',
    weight: 50,
    tags: ['home', 'entrance', 'hero'],
    duration: 2000,
    component: 'GateOpeningAdvanced',
  },
  {
    id: 'shadow-rise-solo',
    name: 'Shadow Rise',
    theme: 'solo',
    type: 'transition',
    weight: 40,
    tags: ['team', 'about', 'dark'],
    duration: 1200,
  },
  {
    id: 'portal-solo',
    name: 'Shadow Portal',
    theme: 'solo',
    type: 'portal',
    weight: 45,
    tags: ['navigation', 'transition', 'page'],
    duration: 1600,
    component: 'PortalTimeline',
  },

  // JJK Animations
  {
    id: 'cursed-energy-jjk',
    name: 'Cursed Energy',
    theme: 'jjk',
    type: 'particle',
    weight: 35,
    tags: ['team', 'power', 'dark'],
    duration: 1800,
  },
  {
    id: 'domain-expansion-jjk',
    name: 'Domain Expansion',
    theme: 'jjk',
    type: 'transition',
    weight: 30,
    tags: ['special', 'reveal', 'team'],
    duration: 2200,
  },
  {
    id: 'glitch-jjk',
    name: 'Cursed Glitch',
    theme: 'jjk',
    type: 'transition',
    weight: 25,
    tags: ['error', 'secret', 'hidden'],
    duration: 800,
  },

  // Dr. Stone Animations
  {
    id: 'stone-crack-drstone',
    name: 'Stone Crack',
    theme: 'drstone',
    type: 'transition',
    weight: 28,
    tags: ['vision', 'reveal', 'awakening'],
    duration: 1400,
  },
  {
    id: 'blueprint-drstone',
    name: 'Blueprint Grid',
    theme: 'drstone',
    type: 'particle',
    weight: 22,
    tags: ['projects', 'tech', 'science'],
    duration: 1600,
  },

  // SAO Animations
  {
    id: 'system-init-sao',
    name: 'System Initialize',
    theme: 'sao',
    type: 'transition',
    weight: 20,
    tags: ['dashboard', 'login', 'system'],
    duration: 1200,
  },
  {
    id: 'hud-scan-sao',
    name: 'HUD Scan',
    theme: 'sao',
    type: 'particle',
    weight: 18,
    tags: ['stats', 'profile', 'data'],
    duration: 1000,
  },

  // Naruto Animations
  {
    id: 'summoning-naruto',
    name: 'Summoning Jutsu',
    theme: 'naruto',
    type: 'summoning',
    weight: 22,
    tags: ['team', 'reveal', 'character'],
    duration: 2200,
    component: 'SummoningTimeline',
  },
  {
    id: 'chakra-burst-naruto',
    name: 'Chakra Burst',
    theme: 'naruto',
    type: 'particle',
    weight: 15,
    tags: ['contact', 'action', 'energy'],
    duration: 1000,
  },
];

class AnimationRegistry {
  private animations: AnimationEntry[] = ANIMATIONS;
  private themeWeights: Record<AnimationTheme, number> = THEME_WEIGHTS;

  /**
   * Get all animations
   */
  getAll(): AnimationEntry[] {
    return [...this.animations];
  }

  /**
   * Get animation by ID
   */
  getById(id: string): AnimationEntry | undefined {
    return this.animations.find((a) => a.id === id);
  }

  /**
   * Get animations by theme
   */
  getByTheme(theme: AnimationTheme): AnimationEntry[] {
    return this.animations.filter((a) => a.theme === theme);
  }

  /**
   * Get animations by type
   */
  getByType(type: AnimationType): AnimationEntry[] {
    return this.animations.filter((a) => a.type === type);
  }

  /**
   * Get animations matching any of the provided tags
   */
  getByTags(tags: string[]): AnimationEntry[] {
    return this.animations.filter((a) => a.tags.some((t) => tags.includes(t)));
  }

  /**
   * Select animation using weighted random selection
   * Prioritizes by theme weight first, then by individual animation weight
   */
  selectWeightedRandom(tags: string[], preferredType?: AnimationType): AnimationEntry | null {
    // Filter animations by tags and optionally type
    let candidates = this.getByTags(tags);
    if (preferredType) {
      candidates = candidates.filter((a) => a.type === preferredType);
    }

    if (candidates.length === 0) {
      return null;
    }

    // Calculate combined weights (theme weight * animation weight)
    const weightedCandidates = candidates.map((a) => ({
      animation: a,
      combinedWeight: this.themeWeights[a.theme] * a.weight,
    }));

    // Calculate total weight
    const totalWeight = weightedCandidates.reduce((sum, c) => sum + c.combinedWeight, 0);

    // Random selection
    let random = Math.random() * totalWeight;
    for (const candidate of weightedCandidates) {
      random -= candidate.combinedWeight;
      if (random <= 0) {
        return candidate.animation;
      }
    }

    // Fallback to first candidate
    return candidates[0];
  }

  /**
   * Get the primary animation for a page based on tags
   * Falls back to theme hierarchy if no matching animation found
   */
  getPageAnimation(pageTags: string[]): AnimationEntry {
    // Try to find matching animation
    const selected = this.selectWeightedRandom(pageTags);
    if (selected) {
      return selected;
    }

    // Fallback: Get a random Solo Leveling animation (primary theme)
    const soloAnimations = this.getByTheme('solo');
    return soloAnimations[Math.floor(Math.random() * soloAnimations.length)];
  }

  /**
   * Register a custom animation
   */
  register(animation: AnimationEntry): void {
    // Check for duplicate ID
    const existing = this.getById(animation.id);
    if (existing) {
      console.warn(`Animation with ID "${animation.id}" already exists. Skipping.`);
      return;
    }
    this.animations.push(animation);
  }

  /**
   * Update theme weights
   */
  setThemeWeight(theme: AnimationTheme, weight: number): void {
    this.themeWeights[theme] = weight;
  }
}

// Singleton instance
export const animationRegistry = new AnimationRegistry();

// Export default for convenience
export default animationRegistry;
