// lib/welcome-messages-extended.ts

export const INITIAL_WELCOME_MESSAGES = [
  // Solo Leveling
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
  "You are not alone.",
  "The shadows accept you.",
  "Rise, hunter.",
  "Break your limits.",
  
  // JJK
  "Cursed energy flows.",
  "Jujutsu begins.",
  "Cursed technique activated.",
  "Domain expansion incoming.",
  "The cursed seal activates.",
  "Curse level: Maximum.",
  "Jujutsu Sorcerer, welcome.",
  
  // Dr. Stone
  "Science surges forward.",
  "Senku's vision realized.",
  "Stone age ends here.",
  "Technology awakens.",
  "Progress never stops.",
  "Build your future.",
  
  // SAO
  "System initialized.",
  "Welcome to the system.",
  "Loading game parameters.",
  "Virtual world activated.",
  "Ready player one.",
  "Connection established.",
  "Full immersion engage.",
  
  // Naruto
  "Chakra alignment complete.",
  "Ninja way activated.",
  "Seal release.",
  "Summoning contract signed.",
  "Ninja legends rise.",
  "Power of bonds unleashed.",
];

// Dynamic message storage (can be extended with admin panel)
let dynamicMessages: string[] = [... INITIAL_WELCOME_MESSAGES];

export function getRandomWelcomeMessage(): string {
  return dynamicMessages[Math.floor(Math.random() * dynamicMessages.length)];
}

export function getAllWelcomeMessages(): string[] {
  return [... dynamicMessages];
}

export function addWelcomeMessage(message: string): void {
  if (! dynamicMessages.includes(message)) {
    dynamicMessages.push(message);
  }
}

export function removeWelcomeMessage(message: string): void {
  const index = dynamicMessages.indexOf(message);
  if (index > -1) {
    dynamicMessages.splice(index, 1);
  }
}

export function resetWelcomeMessages(): void {
  dynamicMessages = [... INITIAL_WELCOME_MESSAGES];
}
