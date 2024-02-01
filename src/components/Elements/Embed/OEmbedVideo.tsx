import type { Component } from "solid-js"
import type { OEmbedVideo as OEmbedVideoSchema } from "./oEmbedSchema"
import { sanitize } from "./sanitize"

export const OEmbedVideo: Component<{ oEmbed: OEmbedVideoSchema }> = (props) => {
  return <div class="w-full" innerHTML={sanitize(props.oEmbed.html)} data-oembed />
}
