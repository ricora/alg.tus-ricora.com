import type { Config } from "tailwindcss"
import tailwindcssAnimate from "tailwindcss-animate"
import typography from "@tailwindcss/typography"
import defaultTheme from "tailwindcss/defaultTheme"
import { parkwindPlugin } from "@park-ui/tailwind-plugin"
import { radixColor } from "./src/lib/radix-colors"

export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,yml,yaml}"],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      black: "#000000",
      mauve: radixColor("mauve"),
      accent: radixColor("mauve"),
      tomato: radixColor("tomato"),
      red: radixColor("red"),
      ruby: radixColor("ruby"),
      crimson: radixColor("crimson"),
      pink: radixColor("pink"),
      plum: radixColor("plum"),
      purple: radixColor("purple"),
      violet: radixColor("violet"),
      iris: radixColor("iris"),
      indigo: radixColor("indigo"),
      blue: radixColor("blue"),
      cyan: radixColor("cyan"),
      teal: radixColor("teal"),
      jade: radixColor("jade"),
      green: radixColor("green"),
      grass: radixColor("grass"),
      bronze: radixColor("bronze"),
      gold: radixColor("gold"),
      brown: radixColor("brown"),
      orange: radixColor("orange"),
      amber: radixColor("amber"),
      yellow: radixColor("yellow"),
      lime: radixColor("lime"),
      mint: radixColor("mint"),
      sky: radixColor("sky"),
    },
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
  parkUI: {
    accentColor: "neutral",
    grayColor: "mauve",
    borderRadius: "lg",
  },
} satisfies Config
