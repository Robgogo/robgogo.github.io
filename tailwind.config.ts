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
        term: {
          bg: "var(--bg)",
          bgAlt: "var(--bg-alt)",
          panel: "var(--panel)",
          fg: "var(--fg)",
          muted: "var(--muted)",
          accent: "var(--accent)",
          green: "var(--green)",
          yellow: "var(--yellow)",
          red: "var(--red)",
          cyan: "var(--cyan)",
          pink: "var(--pink)",
          orange: "var(--orange)",
          border: "var(--border)",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px var(--glow)",
        window: "0 20px 60px rgba(0, 0, 0, 0.35)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
