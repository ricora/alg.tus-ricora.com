// @ts-check
import remarkPresetLintConsistent from "remark-preset-lint-consistent"
import remarkPresetLintRecommended from "remark-preset-lint-recommended"
import remarkFrontmatter from "remark-frontmatter"
import remarkMath from "remark-math"
import remarkGfm from "remark-gfm"
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide"
import remarkPresetPrettier from "remark-preset-prettier"
import remarkLintNoLiteralUrls from "remark-lint-no-literal-urls"
import remarkCallout from "@r4ai/remark-callout"

export default {
  plugins: [
    remarkFrontmatter,
    remarkMath,
    remarkGfm,
    remarkCallout,
    remarkPresetLintConsistent,
    remarkPresetLintRecommended,
    remarkPresetLintMarkdownStyleGuide,
    remarkPresetPrettier,
    [remarkLintNoLiteralUrls, false], // disable this rule because mdx only supports literal urls
  ],
}
