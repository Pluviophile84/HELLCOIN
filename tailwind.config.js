import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hell: {
          black: '#050505', // Void
          dark: '#0a0a0a',  // Obsidian
          red: '#cc0000',   // Blood
          orange: '#ff3300',// Magma
          gold: '#ffae00',  // Ember
          
          // FIX: Changed from '#e5e5e5' (too bright) to '#d4d4d4' (Ash/Stone)
          // This removes the "digital" feel and makes it look like ancient stone.
          white: '#d4d4d4', 
        },
      },
      fontFamily: {
        gothic: ['var(--font-pirata)'],
        terminal: ['var(--font-vt323)'],
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glitch: {
          '2%, 64%': { transform: 'translate(2px,0) skew(0deg)' },
          '4%, 60%': { transform: 'translate(-2px,0) skew(0deg)' },
          '62%': { transform: 'translate(0,0) skew(5deg)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
