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

export const youTubeTransformer: Readonly<Transformer> = {
  hName: "iframe",
  hProperties: async (url): Promise<HProperties> => {
    const convertToEmbedUrl = (url: string): string => {
      const regExp = /^.*(watch\?v=|embed\/)([^#&?]*).*/
      const match = url.match(regExp)

      if (match && match[2]) {
        return "https://www.youtube.com/embed/" + match[2]
      } else {
        throw new Error("Invalid YouTube URL")
      }
    }

    return {
      src: convertToEmbedUrl(url.href),
      width: "100%",
      height: "360",
    }
  },
  match: async (url) => {
    return url.hostname === "www.youtube.com"
  },
}

export const googleSlidesTransformer: Readonly<Transformer> = {
  hName: "iframe",
  hProperties: async (url): Promise<HProperties> => {
    const getEmbedUrl = (isWeb: boolean) => {
      const path = url.pathname.split("/")

      if (isWeb) {
        // [ファイル] > [共有] > [ウェブに公開] で生成されたリンクである場合は、そのまま埋め込み用のURLを返す
        // e.g. https://docs.google.com/presentation/d/e/XXXXXXXX/pub -> https://docs.google.com/presentation/d/e/XXXXXXXX/embed
        path[path.length - 1] = "embed"
        return new URL(path.join("/"), url.origin)
      }

      if (path.length <= 3) {
        // URLの末尾がpresentation IDで終わっている場合は、末尾にembedを追加する
        // e.g. https://docs.google.com/presentation/d/XXXXXXXX/ -> https://docs.google.com/presentation/d/XXXXXXXX/embed
        path.push("embed")
      } else {
        // URLの末尾が`/edit`など、presentation ID以外で終わっている場合は、末尾をembedに置き換える
        // e.g. https://docs.google.com/presentation/d/XXXXXXXX/edit -> https://docs.google.com/presentation/d/XXXXXXXX/embed
        path[path.length - 1] = "embed"
      }
      return new URL(path.join("/"), url.origin)
    }

    // [ファイル] > [共有] > [ウェブに公開] で生成されたリンクであるかどうか
    const isWeb = url.pathname.startsWith("/presentation/d/e/")

    return {
      src: getEmbedUrl(isWeb).href,
      width: "100%",
      frameBorder: "0",
      allowFullScreen: "true",
      mozAllowFullScreen: "true",
      msAllowFullScreen: "true",
      style: "aspect-ratio: 960/569;",
    }
  },
  match: async (url) => {
    const isGoogleDocs = url.hostname === "docs.google.com"
    const isGoogleSlides = url.pathname.startsWith("/presentation/d/")
    return isGoogleDocs && isGoogleSlides
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
          const msg = `[ERROR] Failed to embed ${link.url} in ${file.path} at line ${link.position?.start?.line}`
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
