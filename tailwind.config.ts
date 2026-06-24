import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        background: "#0A0F1C",
        foreground: "#FFFFFF",
        primary: "#1E3A5F",
        secondary: "#0D99FF",
        accent: "#00C2FF",
        cardBg: "#111827",
        sidebarBg: "#0E1525",
      },
    },
  },
  plugins: [],
};
export default config;
