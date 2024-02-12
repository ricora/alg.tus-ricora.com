import type { Component } from "solid-js"
import type { OEmbedPhoto as OEmbedPhotoSchema } from "./oEmbedSchema"

export const OEmbedPhoto: Component<{ oEmbed: OEmbedPhotoSchema }> = (props) => {
  return (
    <img
      class="mx-auto max-h-full max-w-full"
      width={props.oEmbed.width}
      height={props.oEmbed.height}
      src={props.oEmbed.url}
      alt={props.oEmbed.title}
      loading="lazy"
      decoding="async"
      data-oembed
    />
  )
}
