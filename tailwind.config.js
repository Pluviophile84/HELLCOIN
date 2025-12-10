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
        // Adds an ultra-wide breakpoint for large monitors (1920px+)
        '3xl': '1920px', 
      },
      colors: {
        hell: {
          black: '#050505', // Void
          dark: '#0a0a0a',  // Obsidian
          red: '#cc0000',   // Blood
          orange: '#ff3300',// Magma
          gold: '#ffae00',  // Ember
          white: '#d4d4d4', // Ash/Stone
        },
      },
      fontFamily: {
        gothic: ['var(--font-pirata)'],
        terminal: ['var(--font-vt323)'], 
      },
      // --- HYBRID FLUID TYPOGRAPHY SYSTEM ---
      fontSize: {
        // Massive Hero Text: Scales smoothly, capped at 7rem so it fits your 23" screen
        'fluid-hero': 'clamp(3rem, 5.5vw + 1rem, 7rem)',      
        
        // Section Headers: Clean scaling for "THE TEN COMMANDMENTS", etc.
        'fluid-h2': 'clamp(2.5rem, 4.5vw + 1rem, 5rem)',     
        
        // Card Headers: For things like "THE TOP BUYER"
        'fluid-h3': 'clamp(1.5rem, 3vw + 0.5rem, 3rem)',      
        
        // Body Text: Starts large (1.25rem/20px) and scales up slightly for readability
        'fluid-body': 'clamp(1.25rem, 1.5vw + 0.5rem, 1.75rem)', 
      },
      spacing: {
        // Unified spacing that shrinks on mobile and expands on desktop
        'fluid-gap': 'clamp(1.5rem, 4vw, 4rem)',              
      },
      height: {
        // Fixes the mobile browser address bar jump issue
        'screen-safe': '100svh', 
      },
      // --------------------------------------
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
    // Custom utility to hide scrollbars while keeping scroll functionality
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
