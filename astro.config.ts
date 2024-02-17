import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import mdx from "@astrojs/mdx"
import { remarkCallout } from "./src/lib/remark-plugins/remarkCallout"
import { remarkLinkCard } from "./src/lib/remark-plugins/remarkLinkCard"
import {
  rehypeCustomCode,
  type RehypeCustomCodeOptions,
  transformerDiff,
  transformerHighlightLine,
  transformerLineNumbers,
} from "rehype-custom-code"
import { remarkMetaString } from "remark-meta-string"
import {
  googleSlidesTransformer,
  oEmbedTransformer,
  remarkEmbed,
  youTubeTransformer,
  type RemarkEmbedOptions,
} from "./src/lib/remark-plugins/remarkEmbed"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import { pagefind } from "./src/lib/astro-integrations/pagefind"
import sitemap from "@astrojs/sitemap"

// https://astro.build/config
export default defineConfig({
  site: "https://alg.tus-ricora.com/",
  redirects: {
    "/p/[...slug]": "/posts/[...slug]",
    "/[...slug]": "/categories/[...slug]",
  },
  integrations: [tailwind(), solidJs(), mdx(), sitemap(), pagefind()],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkCallout,
      remarkMetaString,
      [
        remarkEmbed,
        {
          transformers: [youTubeTransformer, googleSlidesTransformer, oEmbedTransformer],
        } satisfies RemarkEmbedOptions,
      ],
      remarkLinkCard,
    ],
    rehypePlugins: [
      rehypeKatex,
      [
        rehypeCustomCode,
        {
          propsPrefix: "",
          shouldExportCodeAsProps: true,
          shiki: {
            themes: {
              light: "github-light",
              dark: "one-dark-pro",
            },
            transformers: (meta) => [
              transformerLineNumbers(meta, "data"),
              transformerHighlightLine(meta, "data"),
              transformerDiff(meta, "data"),
            ],
          },
        } satisfies RehypeCustomCodeOptions,
      ],
    ],
    remarkRehype: {
      footnoteLabel: "脚注",
      footnoteLabelTagName: "span",
    },
    syntaxHighlight: false,
  },
})
