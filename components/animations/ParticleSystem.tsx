'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ParticleConfig } from '@/types/index';

interface ParticleSystemProps {
  count?: number;
  color?: string;
  type?: 'float' | 'sparkle' | 'ember';
  autoStart?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 20,
  color = '#1F6BFF',
  type = 'float',
  autoStart = true,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768);

    if (! autoStart) return;

    // Reduce particles on mobile
    const particleCount = isMobile ? Math.floor(count / 2) : count;

    const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 1,
    }));

    setParticles(newParticles);
  }, [count, autoStart, isMobile]);

  return (
    <div className="particle-container fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <motion.div
          key={particle. id}
          className={`particle particle-${type}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${color}, transparent)`,
            boxShadow: `0 0 ${particle.size * 2}px ${color}`,
            borderRadius: '50%',
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
            y: type === 'ember' ? -400 : -300,
            x: type === 'sparkle' ? 0 : Math.random() * 100 - 50,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
};
