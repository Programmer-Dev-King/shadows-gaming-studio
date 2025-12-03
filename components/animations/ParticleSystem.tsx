'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  type: 'float' | 'sparkle' | 'ember';
}

interface ParticleSystemProps {
  count?: number;
  color?: string;
  type?: 'float' | 'sparkle' | 'ember';
  autoStart?: boolean;
}

export const ParticleSystem: React. FC<ParticleSystemProps> = ({
  count = 20,
  color = '#1F6BFF',
  type = 'float',
  autoStart = true,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (! autoStart) return;

    const generateParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 2,
          color,
          duration: Math.random() * 2 + 1,
          type,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [count, color, type, autoStart]);

  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`particle particle-${particle.type} particle-${
            particle.size < 3 ? 'sm' : particle.size < 6 ? 'md' : 'lg'
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            background: `radial-gradient(circle, ${particle.color}, transparent)`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            animation: `floatParticle ${particle.duration}s ease-out forwards`,
          }}
        />
      ))}
    </div>
  );
};
