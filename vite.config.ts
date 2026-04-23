import { defineConfig } from "vite"
import tsconfigPath from "vite-tsconfig-paths"

export default defineConfig({
  ssr: {
    noExternal: ["remark-meta-string"],
  },
  plugins: [tsconfigPath({ root: "./" })],
})
