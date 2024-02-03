import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,yml,yaml}"],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        "switch-to-right": "switch-to-right 0.3s ease-out",
        "switch-to-left": "switch-to-left 0.3s ease-out",
      },
      keyframes: {
        "switch-to-right": {
          from: {
            left: "0",
          },
          to: {
            left: "calc(100% - 1.5rem)",
          },
        },
        "switch-to-left": {
          from: {
            left: "calc(100% - 1.5rem)",
          },
          to: {
            left: "0",
          },
        },
      },
      fontFamily: {
        sans: ["LINESeedJP OTF Rg", "sans-serif"],
        bold: ["LINESeedJP OTF Bd", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config
