// @ts-check
import remarkPresetLintConsistent from "remark-preset-lint-consistent"
import remarkPresetLintRecommended from "remark-preset-lint-recommended"
import remarkFrontmatter from "remark-frontmatter"
import remarkMath from "remark-math"
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide"
import remarkPresetPrettier from "remark-preset-prettier"
import remarkLintNoLiteralUrls from "remark-lint-no-literal-urls"
import remarkLintNoUndefinedReferences from "remark-lint-no-undefined-references"
import remarkLintNoEmphasisAsHeading from "remark-lint-no-emphasis-as-heading"

export default {
  plugins: [
    remarkFrontmatter,
    remarkMath,
    remarkPresetLintConsistent,
    remarkPresetLintRecommended,
    remarkPresetLintMarkdownStyleGuide,
    remarkPresetPrettier,
    [
      remarkLintNoUndefinedReferences,
      {
        allow: [
          "!note",
          "!info",
          "!abstract",
          "!tldr",
          "!todo",
          "!tip",
          "!success",
          "!question",
          "!warning",
          "!caution",
          "!failure",
          "!danger",
          "!error",
          "!bug",
          "!important",
          "!example",
          "!quote",
        ],
      },
    ],
    [remarkLintNoEmphasisAsHeading, false],
    [remarkLintNoLiteralUrls, false], // disable this rule because mdx only supports literal urls
  ],
}
