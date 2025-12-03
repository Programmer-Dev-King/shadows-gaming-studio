// lib/welcome-messages.ts - Random Welcome Messages Database

export const WELCOME_MESSAGES = [
  // Solo Leveling Style
  "Welcome to reality.",
  "Welcome to Shadows.",
  "Feel the fear.",
  "Deal the fear.",
  "Arise, shadow.",
  "Your awakening begins.",
  "The gate has opened.",
  "Ascend beyond mortals.",
  "Embrace the darkness.",
  "Power awaits.",
  
  // JJK Style
  "Cursed energy flows.",
  "Jujutsu begins.",
  "Cursed technique activated.",
  "Domain expansion incoming.",
  "The cursed seal activates.",
  "Curse level: Maximum.",
  
  // Dr. Stone Style
  "Science surges forward.",
  "Senku's vision realized.",
  "Stone age ends here.",
  "Technology awakens.",
  "Progress never stops.",
  
  // SAO Style
  "System initialized.",
  "Welcome to the system.",
  "Loading game parameters.",
  "Virtual world activated.",
  "Ready player one.",
  "Connection established.",
  
  // Naruto Style
  "Chakra alignment complete.",
  "Ninja way activated.",
  "Seal release.",
  "Summoning contract signed.",
  "Ninja legends rise.",
  "Power of bonds unleashed.",
];

export function getRandomWelcomeMessage(): string {
  return WELCOME_MESSAGES[Math.floor(Math.random() * WELCOME_MESSAGES.length)];
}

export function getWelcomeMessageByIndex(index: number): string {
  return WELCOME_MESSAGES[index % WELCOME_MESSAGES.length];
}

export function getAllWelcomeMessages(): string[] {
  return [... WELCOME_MESSAGES];
}

export function addWelcomeMessage(message: string): void {
  if (! WELCOME_MESSAGES.includes(message)) {
    WELCOME_MESSAGES.push(message);
  }
}

export function removeWelcomeMessage(message: string): void {
  const index = WELCOME_MESSAGES.indexOf(message);
  if (index > -1) {
    WELCOME_MESSAGES. splice(index, 1);
  }
}
