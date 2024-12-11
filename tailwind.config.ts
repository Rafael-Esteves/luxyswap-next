import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'purple-gradient': 'linear-gradient(262.22deg, #9900FF -48.18%, #000A4C 170%)',
        general: "url('/bg/general-bg.png')",
        hero: "url('/bg/hero-bg.png')",
      },
      fontFamily: {
        gravesend: 'var(--font-gravesend)',
        scandia: 'var(--font-scandia)',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
