import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "2rem",
        lg: "3rem",
        xl: "4rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1320px",
      },
    },
    extend: {
      colors: {
        background: "#0A0B0D",
        surface: "#121419",
        "surface-2": "#1A1D24",
        border: "#262A33",
        foreground: "#F5F5F3",
        muted: "#9CA3AF",
        "muted-2": "#6B7280",
        navy: {
          DEFAULT: "#1E3A8A",
          light: "#3B5BDB",
          dim: "#152B66",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      boxShadow: {
        premium: "0 20px 40px -12px rgba(0,0,0,0.55)",
        "navy-glow": "0 8px 30px -8px rgba(59,91,219,0.45)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "route-draw": {
          "0%": { strokeDashoffset: "1" },
          "100%": { strokeDashoffset: "0" },
        },
        "ken-burns": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(37,211,102,0.45)" },
          "100%": { boxShadow: "0 0 0 14px rgba(37,211,102,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "ken-burns": "ken-burns 20s ease-out forwards",
        "pulse-ring": "pulse-ring 2.2s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
