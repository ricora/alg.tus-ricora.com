// @ts-check
import remarkPresetLintConsistent from "remark-preset-lint-consistent"
import remarkPresetLintRecommended from "remark-preset-lint-recommended"
import remarkMdx from "remark-mdx"
import remarkFrontmatter from "remark-frontmatter"
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm"
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide"
import remarkPresetPrettier from "remark-preset-prettier"
import remarkLintNoLiteralUrls from "remark-lint-no-literal-urls"
import { lintRule } from "unified-lint-rule"
import * as fs from "node:fs/promises"
import { build } from "esbuild"

/**
 * Import a TypeScript module
 * @param {string} path Path to the TypeScript file
 * @returns {Promise<any>} The module
 */
const importTs = async (path) => {
  const codeTs = (await fs.readFile(path)).toString()
  const codeJs = (
    await build({
      stdin: {
        contents: codeTs,
        resolveDir: ".",
        loader: "ts",
      },
      bundle: true,
      format: "esm",
      target: "es6",
      write: false,
    })
  ).outputFiles[0].text
  return import(`data:application/javascript;base64,${Buffer.from(codeJs).toString("base64url")}`)
}

const { remarkCallout } = await importTs("./src/lib/remark-plugins/remarkCallout.ts")

/** @type {import("remark-preset-lint-recommended").Preset} */
// @ts-expect-error: remark-preset-prettier types are wrong
export default {
  settings: {
    bullet: "-",
    resourceLink: false,
  },
  plugins: [
    remarkMdx,
    remarkGfm,
    remarkFrontmatter,
    remarkMath,
    lintRule(
      {
        origin: "remark-lint:callout",
      },
      remarkCallout(),
    ),
    remarkPresetLintConsistent,
    remarkPresetLintRecommended,
    remarkPresetLintMarkdownStyleGuide,
    remarkPresetPrettier,
    [remarkLintNoLiteralUrls, false], // disable this rule because mdx only supports literal urls
  ],
}
