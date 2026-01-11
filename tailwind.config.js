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
        lava: {
          50: "#FFF4E6",
          100: "#FFE4C4",
          200: "#FFD54F",
          300: "#FFA32E",
          400: "#FF6B1A",
          500: "#FF4D1A",
          600: "#CC3D15",
          700: "#991F0A",
        },
        obsidian: {
          800: "#2D2420",
          900: "#1C1612",
          950: "#0D0A08",
        },
        gold: {
          DEFAULT: "#E8A020",
          light: "#F4C430",
          dark: "#B8860B",
        },
        hellfire: {
          red: "#DC2626",
          orange: "#FF6B1A",
        },
      },
      fontFamily: {
        hero: ["var(--font-hero)", "cursive"],
        heading: ["var(--font-heading)", "cursive"],
        body: ["var(--font-body)", "sans-serif"],
      },
      fontSize: {
        "hero-h1": "clamp(2.6rem, 5vw, 4.8rem)",
        "hero-sub": "clamp(1.1rem, 2.2vw, 1.7rem)",
        "hero-sub-em": "clamp(1.17rem, 2.25vw, 1.8rem)",
        "hero-phrase": "clamp(1rem, 1.8vw, 1.6rem)",
        "hero-cta": "clamp(1rem, 1.3vw, 1.25rem)",
      },
      boxShadow: {
        brutal: "0.25rem 0.25rem 0 0 #000000",
        "brutal-sm": "0.125rem 0.125rem 0 0 #000000",
        "brutal-lg": "0.375rem 0.375rem 0 0 #000000",
        "lava-glow": "0 0 1.25rem rgba(255, 77, 26, 0.5)",
        "gold-glow": "0 0 0.9375rem rgba(232, 160, 32, 0.4)",
      },
      borderWidth: {
        3: "0.1875rem",
      },
      transitionDuration: {
        180: "180ms",
        400: "400ms",
      },
      animation: {
        "spin-slow": "spin 60s linear infinite",
        "pulse-fast": "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        marquee: "marquee 25s linear infinite",
        glitch: "glitch 1s linear infinite",
        "ember-float": "emberFloat 3s ease-in-out infinite",
        "lava-pulse": "lavaPulse 2s ease-in-out infinite",
        flicker: "flicker 0.15s infinite",
        // Loader animations (CSS-only for performance)
        "loader-pulse": "loaderPulse 1.2s ease-in-out infinite",
        "loader-slide": "loaderSlide 1s linear infinite",
        "fade-in": "fadeIn 0.3s ease-out forwards",
        "fade-in-delayed": "fadeIn 0.3s ease-out 0.2s forwards",
        // Hero animations (CSS-only for mobile performance)
        "hero-fade-in": "heroFadeIn 0.6s ease-out forwards",
        "hero-slide-up": "heroSlideUp 0.6s ease-out forwards",
        "hero-slide-up-delayed": "heroSlideUp 0.6s ease-out 0.15s forwards",
        "hero-slide-up-delayed-2": "heroSlideUp 0.6s ease-out 0.3s forwards",
        "hero-slide-up-delayed-3": "heroSlideUp 0.6s ease-out 0.45s forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glitch: {
          "2%, 64%": { transform: "translate(0.125rem,0) skew(0deg)" },
          "4%, 60%": { transform: "translate(-0.125rem,0) skew(0deg)" },
          "62%": { transform: "translate(0,0) skew(5deg)" },
        },
        emberFloat: {
          "0%, 100%": { transform: "translateY(0) scale(1)", opacity: "0.6" },
          "50%": { transform: "translateY(-0.625rem) scale(1.1)", opacity: "1" },
        },
        lavaPulse: {
          "0%, 100%": { boxShadow: "0 0 1.25rem rgba(255, 77, 26, 0.3)" },
          "50%": { boxShadow: "0 0 2.5rem rgba(255, 77, 26, 0.6)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        // Loader keyframes
        loaderPulse: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.1) rotate(3deg)" },
        },
        loaderSlide: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(0.625rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        // Hero keyframes
        heroFadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        heroSlideUp: {
          "0%": { opacity: "0", transform: "translateY(1.875rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
        screens: {
          "short-landscape": { raw: "(orientation: landscape) and (max-height: 600px)" },
          "3xl": "2560px",
          "4xl": "3840px",
        },
      backgroundImage: {
        "hellfire-gradient": "linear-gradient(to top, #FF6B1A, #DC2626)",
        "hellfire-gradient-b": "linear-gradient(to bottom, #FF6B1A, #DC2626)",
        "lava-river": "linear-gradient(90deg, #FF4D1A, #FFA32E, #FF4D1A)",
      },
    },
  },
  plugins: [],
};
