import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import { remarkCallout } from "./src/lib/remark-plugins/remarkCallout"

// https://astro.build/config
export default defineConfig({
  site: "https://alg.tus-ricora.com/",
  integrations: [tailwind(), solidJs(), mdx()],
  markdown: {
    remarkPlugins: [remarkCallout],
  },
})
