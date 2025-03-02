import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#006FAC",
        secondary: "#38ADA0",
        accent: "#F6BE31",
        tagline: "#F7A015",
        "light-primary": "#DDF3FF",
      },
      screens: {
        md: "1024px",
        lg: "1440px",
        xl: "1500px",
        "3xl": "3000px",
      },
      animation: {
        fadeDots: "fadeDots .8s infinite",
      },
      keyframes: {
        fadeDots: {
          "0%": { opacity: "0.2", transform: "scale(0.1)" },
          "60%": { opacity: "1", transform: "scale(1.2)" },
          "100%": { opacity: "0.2", transform: "scale(0.1)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
