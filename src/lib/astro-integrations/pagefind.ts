import type { AstroIntegration } from "astro"
import sirv from "sirv"
import { fileURLToPath } from "node:url"
import { existsSync } from "node:fs"
import * as path from "node:path"
import { createIndex } from "pagefind"

export const pagefind = (): AstroIntegration => {
  let outDir: string
  let pagefindDir: string

  return {
    name: "pagefind",
    hooks: {
      "astro:config:setup": ({ config }) => {
        outDir = fileURLToPath(config.outDir)
        pagefindDir = path.join(outDir, "pagefind")
      },
      "astro:server:setup": async ({ server, logger }) => {
        if (!existsSync(pagefindDir)) {
          logger.warn(
            `pagefind output directory "${pagefindDir}" does not exist. Please run "astro build" before running "astro dev". Otherwise, Pagefind will not work.`,
          )
        }

        const pagefindMiddleware = sirv(pagefindDir, { dev: true, etag: true })

        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith("/pagefind")) {
            return pagefindMiddleware(req, res, next)
          }
          return next()
        })
      },
      "astro:build:done": async ({ logger }) => {
        // Create a Pagefind search index to work with
        const { index } = await createIndex({})
        if (!index) {
          throw new Error("Failed to create Pagefind index")
        }

        // Index all HTML files in a directory
        await index.addDirectory({
          path: outDir,
        })

        // Write the index to disk
        await index.writeFiles({
          outputPath: pagefindDir,
        })

        logger.info(`Pagefind index written to ${pagefindDir}`)
      },
    },
  }
}
