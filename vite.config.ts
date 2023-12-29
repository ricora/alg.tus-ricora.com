import { defineConfig } from "vite"

export default defineConfig({
  ssr: {
    noExternal: ["rehype-custom-code", "remark-meta-string"],
  },
})
