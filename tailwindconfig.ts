import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
     fontFamily: {
  sans: ["var(--font-dm-sans)"],
  display: ["var(--font-syne)"],
},
      colors: {
        bg: {
          primary: "#0f1117",
          secondary: "#161b27",
          card: "#1c2333",
          hover: "#222840",
        },
        accent: {
          blue: "#4f8ef7",
          green: "#34d399",
          red: "#f87171",
          purple: "#a78bfa",
          yellow: "#fbbf24",
        },
        border: "#2a3350",
        muted: "#6b7a99",
      },
    },
  },
  plugins: [],
}

export default config