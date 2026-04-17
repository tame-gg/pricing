import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0A",
        ink: "#F0EDE6",
        muted: "#999590",
        gold: "#C9A84C",
        goldlight: "#E8C36D",
        glass: "rgba(255,255,255,0.04)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "ui-serif", "Georgia"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
      },
      backdropBlur: {
        xs: "2px",
      },
      boxShadow: {
        gold: "0 0 40px -8px rgba(201,168,76,0.45)",
        goldsoft: "0 0 60px -10px rgba(201,168,76,0.25)",
      },
      animation: {
        "pulse-gold": "pulseGold 4s ease-in-out infinite",
        drift: "drift 22s ease-in-out infinite alternate",
      },
      keyframes: {
        pulseGold: {
          "0%,100%": { boxShadow: "0 0 32px -8px rgba(201,168,76,0.30)" },
          "50%": { boxShadow: "0 0 64px -8px rgba(201,168,76,0.55)" },
        },
        drift: {
          "0%": { transform: "translate3d(0,0,0)" },
          "100%": { transform: "translate3d(20px,-30px,0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
