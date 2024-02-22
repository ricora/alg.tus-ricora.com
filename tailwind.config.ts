import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"
import defaultTheme from "tailwindcss/defaultTheme"
import { parkwindPlugin } from "@park-ui/tailwind-plugin"

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,yml,yaml}"],
  theme: {
    extend: {
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
        sans: ["LINE Seed JP", ...defaultTheme.fontFamily.sans],
        mono: ["Juisee", ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [parkwindPlugin, tailwindcssAnimate, typography],
} satisfies Config
