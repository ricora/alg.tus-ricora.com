import type { Component } from "solid-js"
import type { OEmbedVideo as OEmbedVideoSchema } from "./oEmbedSchema"
import { sanitize } from "./sanitize"
import { LinkCard } from "../LinkCard"

export const OEmbedVideo: Component<{ oEmbed: OEmbedVideoSchema; href: string }> = (props) => {
  if (!props.oEmbed.html) return <LinkCard href={props.href} />
  return <div class="w-full" innerHTML={sanitize(props.oEmbed.html)} data-oembed />
}
