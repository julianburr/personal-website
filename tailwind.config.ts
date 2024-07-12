import type { Config } from "tailwindcss";

import { COLORS } from "./src/styles/theme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
    },
  },
  plugins: [],
};

export default config;
