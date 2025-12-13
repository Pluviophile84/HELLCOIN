/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hell: {
          black: "#050505",  // Void
          dark: "#0a0a0a",   // Obsidian
          red: "#cc0000",    // Blood
          orange: "#ff3300", // Magma
          gold: "#ffae00",   // Ember
          white: "#d4d4d4",  // Ash/Stone
        },
      },

      fontFamily: {
        gothic: ["var(--font-pirata)"],
        terminal: ["var(--font-vt323)"],
      },

      // --- HERO TYPOGRAPHY: ALL TEXT CLAMPED HERE ---
      fontSize: {
        // Main hero headline
        fluid-hero: "clamp(2.8rem, 5.8vw, 4.8rem)",

        // Standard body copy in hero
        fluid-body: "clamp(1.05rem, 2.6vw, 1.35rem)",

        // Highlight phrase: "Proof-of-Suffering"
        fluid-highlight: "clamp(1.4rem, 3vw, 2rem)",

        // Tagline: "WHEN THE MARKET BURNS, WE TREND"
        fluid-tagline: "clamp(1.2rem, 2.8vw, 1.8rem)",
      },

      // Horizontal padding that scales with viewport width
      padding: {
        "fluid-gap": "clamp(1.5rem, 5vw, 4.5rem)",
      },

      animation: {
        "spin-slow": "spin 60s linear infinite",
        "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 25s linear infinite",
        glitch: "glitch 1s linear infinite",
      },

      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glitch: {
          "2%, 64%": { transform: "translate(2px,0) skew(0deg)" },
          "4%, 60%": { transform: "translate(-2px,0) skew(0deg)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
      },
    },
  },
  plugins: [],
};
