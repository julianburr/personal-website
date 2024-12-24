import type { Config } from "tailwindcss";

import { COLORS } from "./src/styles/theme";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: COLORS,
      fontFamily: {
        default: ["var(--font--default)", "Open Sans", "sans-serif"],
        heading: ["var(--font--heading)", "sans-serif"],
        mono: ["var(--font--mono)", "monospace"],
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
      screens: {
        sm: "600px",
        md: "1024px",
        lg: "1280px",
        xl: "1440px",
      },
      boxShadow: {
        lg: "0 .3rem 1.2rem rgba(0, 0, 0, .1)",
      },
      dropShadow: {
        lg: "0 .3rem .8rem rgba(0, 0, 0, .1)",
      },
      keyframes: {
        float: {
          "0%": { transform: "translate3d(0, -100%, 0)" },
          "10%": { transform: "translate3d(7%, -96%, 0)" },
          "30%": { transform: "translate3d(10%, -98%, 0)" },
          "50%": { transform: "translate3d(11%, -94%, 0)" },
          "70%": { transform: "translate3d(7%, -99%, 0)" },
          "80%": { transform: "translate3d(3%, -97%, 0)" },
          "100%": { transform: "translate3d(0, -100%, 0)" },
        },
      },
      animation: {
        float: "float 12s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};

export default config;
