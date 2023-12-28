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
import { oEmbedTransformer, remarkEmbed, type RemarkEmbedOptions } from "./src/lib/remark-plugins/remarkEmbed"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

// https://astro.build/config
export default defineConfig({
  site: "https://alg.tus-ricora.com/",
  redirects: {
    "/p/[...slug]": "/posts/[...slug]",
  },
  integrations: [tailwind(), solidJs(), mdx()],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkCallout,
      remarkMetaString,
      [remarkEmbed, { transformers: [oEmbedTransformer] } satisfies RemarkEmbedOptions],
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
    syntaxHighlight: false,
  },
})
