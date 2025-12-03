interface AnimationMemory {
  gateOpened: boolean;
  pagesVisited: string[];
  animationsReduced: boolean;
  lastVisit: string;
}

const STORAGE_KEY = 'SHADOWS_ANIMATION_MEMORY';

export const getAnimationMemory = (): AnimationMemory => {
  if (typeof window === 'undefined') {
    return {
      gateOpened: false,
      pagesVisited: [],
      animationsReduced: false,
      lastVisit: new Date().toISOString(),
    };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored
    ? JSON.parse(stored)
    : {
        gateOpened: false,
        pagesVisited: [],
        animationsReduced: false,
        lastVisit: new Date().toISOString(),
      };
};

export const setGateOpened = () => {
  const memory = getAnimationMemory();
  memory.gateOpened = true;
  memory.lastVisit = new Date(). toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
};

export const addPageVisit = (pageName: string) => {
  const memory = getAnimationMemory();
  if (!memory.pagesVisited. includes(pageName)) {
    memory.pagesVisited.push(pageName);
  }
  memory.animationsReduced = memory.pagesVisited.length > 3;
  memory.lastVisit = new Date(). toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memory));
};

export const hasVisitedPage = (pageName: string): boolean => {
  const memory = getAnimationMemory();
  return memory.pagesVisited. includes(pageName);
};

export const shouldReduceAnimations = (): boolean => {
  const memory = getAnimationMemory();
  return memory.animationsReduced;
};

export const clearAnimationMemory = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
};
