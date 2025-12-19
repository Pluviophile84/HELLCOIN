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
          white: "#d4d4d4", // Ashy white
          bone: "#f6efe5", // Burnt parchment
          ash: "#b8b3ad", // Cold ash
          violet: "#221125", // Abyssal violet tint
        },
        // Sacred section-title flame color (no gradients)
        flame: "#FF3C00",
      },
      fontFamily: {
        // Tailwind API stays the same across the whole site:
        gothic: ["var(--font-gothic)"],
        terminal: ["var(--font-terminal)"],
      },
      // Named clamped sizes for Hero typography (use these instead of inline clamp values in components)
      fontSize: {
        "hero-h1": "clamp(2.6rem, 5vw, 5.2rem)",
        "hero-sub": "clamp(1.1rem, 2.2vw, 1.8rem)",
        "hero-sub-em": "clamp(1.3rem, 2.5vw, 2.1rem)",
        "hero-phrase": "clamp(1rem, 1.8vw, 1.7rem)",
        "hero-cta": "clamp(1rem, 1.3vw, 1.25rem)",
      },
      boxShadow: {
        ember: "0 0 40px rgba(255, 60, 0, 0.22)",
        "ember-strong": "0 0 60px rgba(255, 60, 0, 0.35)",
        deep: "0 40px 120px rgba(0,0,0,0.75)",
        "inset-ember": "inset 0 0 0 1px rgba(255, 60, 0, 0.18)",
      },
      animation: {
        "spin-slow": "spin 60s linear infinite",
        "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 25s linear infinite",
        glitch: "glitch 1s linear infinite",
        "ember-flicker": "emberFlicker 3.5s ease-in-out infinite",
        "heat-shimmer": "heatShimmer 8s ease-in-out infinite",
        "float-up": "floatUp 7s linear infinite",
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
        emberFlicker: {
          "0%, 100%": { opacity: "0.55" },
          "20%": { opacity: "0.75" },
          "40%": { opacity: "0.45" },
          "60%": { opacity: "0.82" },
          "80%": { opacity: "0.6" },
        },
        heatShimmer: {
          "0%, 100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        floatUp: {
          "0%": { transform: "translate3d(0, 18px, 0)", opacity: "0" },
          "10%": { opacity: "0.35" },
          "100%": { transform: "translate3d(0, -120px, 0)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
