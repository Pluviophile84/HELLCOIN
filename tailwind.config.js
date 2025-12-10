/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        // Standard points are fine, but we ensure '3xl' exists for ultrawide
        '3xl': '1920px', 
      },
      colors: {
        hell: {
          black: '#050505',
          dark: '#0a0a0a',
          red: '#cc0000',
          orange: '#ff3300',
          gold: '#ffae00',
          white: '#d4d4d4', 
        },
      },
      fontFamily: {
        gothic: ['var(--font-pirata)'],
        terminal: ['var(--font-vt323)'], 
      },
      // --- THE HYBRID FLUID SYSTEM ---
      fontSize: {
        // Syntax: clamp(MIN, VAL + SCALER, MAX)
        // This ensures text never gets too small on mobile, or too huge on ultrawide
        'fluid-hero': 'clamp(3.5rem, 8vw + 1rem, 10rem)',      // Massive Hero Text
        'fluid-h2': 'clamp(2.5rem, 5vw + 1rem, 6rem)',        // Section Headers
        'fluid-h3': 'clamp(1.5rem, 3vw + 0.5rem, 3rem)',      // Card Headers
        'fluid-body': 'clamp(1rem, 1vw + 0.5rem, 1.25rem)',   // Readable Body Text
      },
      spacing: {
        'fluid-gap': 'clamp(1.5rem, 4vw, 4rem)',              // Fluid padding/margins
      },
      height: {
        'screen-safe': '100svh', // Fixes mobile address bar scroll jump
      },
      // -------------------------------
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
  plugins: [
    // Simple plugin to hide scrollbars
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* IE and Edge */
          '-ms-overflow-style': 'none',
          /* Firefox */
          'scrollbar-width': 'none',
          /* Safari and Chrome */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      });
    },
  ],
};
