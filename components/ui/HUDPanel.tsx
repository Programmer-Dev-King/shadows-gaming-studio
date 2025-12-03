'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HUDPanelProps {
  title: string;
  value: string | number;
  icon?: string;
  color?: 'blue' | 'purple' | 'cyan' | 'green' | 'orange';
}

const colorStyles = {
  blue: {
    text: 'text-jin-woo-blue',
    glow: 'shadow-[0_0_20px_rgba(31,107,255,0.5)]',
    border: 'border-jin-woo-blue',
  },
  purple: {
    text: 'text-cursed-purple',
    glow: 'shadow-[0_0_20px_rgba(111,43,255,0.5)]',
    border: 'border-cursed-purple',
  },
  cyan: {
    text: 'text-neon-cyan',
    glow: 'shadow-[0_0_20px_rgba(55,248,255,0.5)]',
    border: 'border-neon-cyan',
  },
  green: {
    text: 'text-crystal-green',
    glow: 'shadow-[0_0_20px_rgba(142,255,193,0.5)]',
    border: 'border-crystal-green',
  },
  orange: {
    text: 'text-chakra-orange',
    glow: 'shadow-[0_0_20px_rgba(255,107,24,0.5)]',
    border: 'border-chakra-orange',
  },
};

export const HUDPanel: React.FC<HUDPanelProps> = ({
  title,
  value,
  icon,
  color = 'blue',
}) => {
  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      className={`hud-panel border-2 ${styles.border} ${styles.glow} p-6 rounded`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`${styles.text} font-semibold uppercase text-sm mb-2`}>
            {title}
          </h3>
          <p className={`${styles.text} text-4xl font-bold`}>{value}</p>
        </div>
        {icon && <div className="text-4xl">{icon}</div>}
      </div>
    </motion.div>
  );
};
