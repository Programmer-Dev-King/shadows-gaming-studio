/**
 * @type {import('tailwindcss').Config}
 */
const tailwindConfig = {
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
        heading: ['YourHeadingFont', 'sans-serif'],
        body: ['YourBodyFont', 'sans-serif'],
        hud: ['YourHudFont', 'sans-serif'],
      },
      animation: {
        glow: 'glow 1s infinite',
        'shadow-rise': 'shadowRise 1s forwards',
        'gate-open': 'gateOpen 1s forwards',
        glitch: 'glitch 1s infinite',
        'typewriter': 'typewriter 4s steps(10) forwards',
        'portal-spin': 'portalSpin 2s linear infinite',
      },
      keyframes: {
        glow: {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '1' },
        },
        shadowRise: {
          '0%': { transform: 'translateY(0)', opacity: '0.5' },
          '100%': { transform: 'translateY(-10px)', opacity: '1' },
        },
        gateOpen: {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' },
        },
        glitch: {
          '0%': { clipPath: 'inset(0)' },
          '25%': { clipPath: 'inset(20% 0 80% 0)' },
          '50%': { clipPath: 'inset(10% 0 90% 0)' },
          '75%': { clipPath: 'inset(0)' },
          '100%': { clipPath: 'inset(0)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        portalSpin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  variants: {},
  plugins: [],
};

module.exports = tailwindConfig;