import type { Component } from "solid-js"
import type { OEmbedRich as OEmbedRichSchema } from "./oEmbedSchema"
import { sanitize } from "./sanitize"
import { LinkCard } from "../LinkCard"

export const OEmbedRich: Component<{ oEmbed: OEmbedRichSchema; href: string }> = (props) => {
  if (!props.oEmbed.html) return <LinkCard href={props.href} />
  return <div class="w-full" innerHTML={sanitize(props.oEmbed.html)} data-oembed />
}
