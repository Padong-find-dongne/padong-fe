// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
      },
      fontSize: {
        responsive: ["clamp(14px, 3vw, 18px)", "line-height: 1.5"],
        title: ["clamp(24px, 6vw, 48px)", "line-height: 1.2"],
      },
    },
  },
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  plugins: [],
};

export default config;
