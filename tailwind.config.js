/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        hell: {
          black: "#050505", // Void
          dark: "#0a0a0a", // Obsidian
          red: "#cc0000", // Blood
          orange: "#ff3300", // Magma
          gold: "#ffae00", // Ember
          // Slightly ashy white, not digital white
          white: "#d4d4d4",
        },

        // Sacred section-title flame color (no gradients)
        flame: "#FF3C00",
      },

      fontFamily: {
        gothic: ["var(--font-pirata)"],
        terminal: ["var(--font-vt323)"],
      },

      // Named clamped sizes for Hero typography (use these instead of inline clamp values in components)
      fontSize: {
        "hero-h1": "clamp(2.6rem, 5vw, 4.8rem)",
        "hero-sub": "clamp(1.1rem, 2.2vw, 1.7rem)",
        "hero-sub-em": "clamp(1.3rem, 2.5vw, 2rem)",
        "hero-phrase": "clamp(1rem, 1.8vw, 1.6rem)",
        "hero-cta": "clamp(1rem, 1.3vw, 1.25rem)",
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
