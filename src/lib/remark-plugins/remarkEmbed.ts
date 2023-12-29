import { type Plugin } from "unified"
import type { Root } from "mdast"
import { visit } from "unist-util-visit"
import { unfurl } from "unfurl.js"

export type HProperties = Record<string, string>

export type Transformer = {
  hName: string | ((url: URL) => Promise<string>)
  hProperties?: HProperties | ((url: URL) => Promise<HProperties>)
  match: (url: URL) => Promise<boolean>
}

export type RemarkEmbedOptions = {
  transformers: Transformer[]
}

const defaultRemarkEmbedOptions: Readonly<RemarkEmbedOptions> = {
  transformers: [],
}

export const oEmbedTransformer: Readonly<Transformer> = {
  hName: "oembed",
  hProperties: async (url) => {
    const metadata = await unfurl(url.href)

    if (metadata.oEmbed != null) return { oEmbed: JSON.stringify(metadata.oEmbed) }
    return {} as HProperties
  },
  match: async (url) => {
    const metadata = await unfurl(url.href)
    return metadata.oEmbed != null
  },
}

export const remarkEmbed: Plugin<[RemarkEmbedOptions?], Root> = (options = defaultRemarkEmbedOptions) => {
  return async (tree, file) => {
    const transforms: Promise<void>[] = []

    visit(tree, "link", (link, index, paragraph) => {
      // Check if the paragraph only contains a single url link
      // e.g. OK: `https://example.com/hoge`
      //      NG: `according to example.com/hoge`
      //      NG: `[example](https://example.com/hoge)`
      if (
        paragraph?.type !== "paragraph" ||
        paragraph.children.length !== 1 ||
        (link.data?.hName != null && link.data?.hName !== "a") ||
        link.children.length !== 1 ||
        link.children[0].type !== "text" ||
        link.children[0].value !== link.url
      )
        return

      const url = new URL(link.url)

      const transform = async () => {
        for (const transformer of options.transformers) {
          if (!(await transformer.match(url))) continue

          if (!link.data) link.data = {}

          link.data.hName = await getHName(transformer, url)
          link.data.hProperties = {
            ...(link.data?.hProperties ?? {}),
            ...(await getHProperties(transformer, url)),
            url: link.url,
          }
          return
        }
      }
      transforms.push(
        transform().catch((e) => {
          const msg = `[ERROR] Failed to embed ${link.url} in ${file.path} at ${link.position?.start?.line}`
          console.error(msg)
          console.error(e)
          file.message(msg + "; " + JSON.stringify(e), link.position, "remarkEmbed")
        }),
      )
    })

    await Promise.all(transforms)
  }
}

const getHName = async (transformer: Transformer, url: URL) => {
  if (typeof transformer.hName === "function") return transformer.hName(url)
  return transformer.hName
}

const getHProperties = async (transformer: Transformer, url: URL) => {
  if (typeof transformer.hProperties === "function") return transformer.hProperties(url)
  return transformer.hProperties
}
