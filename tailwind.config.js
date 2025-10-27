/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.svg",
  ],
  theme: {
    extend: {
      colors: {
        ember: {
          light: "#FF5A1F",
          DEFAULT: "#FF3B00",
          dark: "#D63200",
        },
        basalt: {
          900: "#0A0A0A",
          950: "#050505",
        },
      },
      boxShadow: {
        ember: "inset 0 0 14px rgba(255,90,31,0.45)",
      },
      keyframes: {
        heat: {
          "0%,100%": { transform: "scale(1)", filter: "blur(0px)" },
          "50%": { transform: "scale(1.005)", filter: "blur(1px)" },
        },
        ember: {
          "0%": { opacity: "0.28" },
          "100%": { opacity: "0.42" },
        },
      },
      animation: {
        heat: "heat 3s ease-in-out infinite",
        ember: "ember 22s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
};
