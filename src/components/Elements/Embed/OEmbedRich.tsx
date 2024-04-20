import { fromHtml } from "hast-util-from-html"
import { select } from "hast-util-select"
import { toHtml } from "hast-util-to-html"
import type { Component } from "solid-js"
import type { OEmbedRich as OEmbedRichSchema } from "./oEmbedSchema"
import { sanitize } from "./sanitize"

/**
 * aspect-ratioが指定されているiframeのwidthとheightを100%に変更する
 */
const transform = (html: string) => {
  const hast = fromHtml(html)
  const iframe = select("iframe", hast)
  if (iframe?.properties.style?.toString().includes("aspect-ratio:")) {
    iframe.properties.width = "100%"
    iframe.properties.height = "100%"
  }
  return toHtml(hast)
}

export const OEmbedRich: Component<{ oEmbed: OEmbedRichSchema }> = (props) => {
  return <div class="w-full" innerHTML={transform(sanitize(props.oEmbed.html))} data-oembed />
}
