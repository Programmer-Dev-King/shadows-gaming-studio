// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'shadow-black': '#05070A',
        'abyss-blue': '#0A1A3B',
        'jin-woo-blue': '#1F6BFF',
        'cursed-purple': '#6F2BFF',
        'neon-cyan': '#37F8FF',
        'crystal-green': '#8EFFC1',
        'chakra-orange': '#FF6B18',
        'silver-white': '#E5E7EB',
        'icy-blue': '#A5C7FF',
      },
      fontFamily: {
        heading: ['Montserrat', 'Bebas Neue', 'Anton', 'sans-serif'],
        body: ['Poppins', 'Inter', 'sans-serif'],
        hud: ['Oxanium', 'monospace'],
      },
      animation: {
        'gate-open': 'gateOpen 2s ease-out forwards',
        'shadow-rise': 'shadowRise 1.2s ease-out forwards',
        'portal-vortex': 'portalVortex 1.6s ease-in-out forwards',
        'glitch': 'glitch 0.3s ease-in-out',
        'typewriter': 'typewriter 3s steps(40, end) forwards',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};

export default config;
