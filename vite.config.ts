import { defineConfig } from "vite"
import tsconfigPath from "vite-tsconfig-paths"

export default defineConfig({
  ssr: {
    noExternal: ["rehype-custom-code", "remark-meta-string"],
  },
  plugins: [tsconfigPath({ root: "./" })],
})
