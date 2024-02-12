import type { Component } from "solid-js"
import type { OEmbedRich as OEmbedRichSchema } from "./oEmbedSchema"
import { sanitize } from "./sanitize"

export const OEmbedRich: Component<{ oEmbed: OEmbedRichSchema }> = (props) => {
  return <div class="w-full" innerHTML={sanitize(props.oEmbed.html)} data-oembed />
}
