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
import { remarkInlineCode } from "./src/lib/remark-plugins/remarkInlineCode"

// https://astro.build/config
export default defineConfig({
  site: "https://alg.tus-ricora.com/",
  redirects: {
    // NOTE: Astroのバグで誤ったリダイレクト用のページが生成されるので、解決されるまでこの設定は無効化し、手動でリダイレクト用のページを生成する
    // "/p/[...id]": "/posts/[...id]",
    "/link": "/links",
    "/about-us": "/about",
    "/posts": "/archives",
  },
  integrations: [tailwind(), solidJs(), mdx(), sitemap(), pagefind()],
  markdown: {
    remarkPlugins: [
      remarkMath,
      remarkInlineCode,
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
