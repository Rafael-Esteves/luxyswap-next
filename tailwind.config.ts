import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "purple-gradient":
          "linear-gradient(262.22deg, #9900FF -48.18%, #000A4C 170%)",
        "swap-gradient":
          "linear-gradient(0deg, #000A4C, #000A4C),linear-gradient(139.16deg, rgba(73, 34, 135, 0) 23.18%, rgba(73, 34, 135, 0.8) 90.85%)",
        general: 'url("/bg/general-bg.png")',
        second: 'url("/bg/second-section.svg")',
        hero: 'url("/bg/hero-bg.png")',
        swap: 'url("/bg/swap.png")',
      },
      fontFamily: {
        gravesend: "var(--font-gravesend)",
        scandia: "var(--font-scandia)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
} satisfies Config;

export default config;
