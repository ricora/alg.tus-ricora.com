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
import remarkCallout from "@r4ai/remark-callout"

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
    remarkCallout,
    remarkPresetLintConsistent,
    remarkPresetLintRecommended,
    remarkPresetLintMarkdownStyleGuide,
    remarkPresetPrettier,
    [remarkLintNoLiteralUrls, false], // disable this rule because mdx only supports literal urls
  ],
}
