// types/index.ts

export type UserRole = 'ADMIN' | 'FOUNDER' | 'COFOUNDER' | 'CA' | 'CEO' | 'MD' | 'USER';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  profile?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  image?: string;
  engineType?: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  title: string;
  description?: string;
  photo?: string;
  linkedin?: string;
  twitter?: string;
  summoningColor: string;
  joinDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface WelcomeMessage {
  id: string;
  message: string;
  type: 'STATIC' | 'AI';
  createdAt: Date;
  updatedAt: Date;
}

export interface Log {
  id: string;
  userId?: string;
  action: string;
  details?: string;
  timestamp: Date;
}

export interface AnimationConfig {
  duration: number;
  delay: number;
  fps: number;
  particleCount: number;
  soundEnabled: boolean;
  skipEnabled: boolean;
}

export interface ParticleConfig {
  count: number;
  speed: number;
  size: number;
  color: string;
  lifespan: number;
  type: 'float' | 'sparkle' | 'ember';
}

export interface PageTheme {
  color: string;
  gradient: string;
  animation: string;
}
