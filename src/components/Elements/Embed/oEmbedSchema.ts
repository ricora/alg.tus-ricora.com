/**
 * oEmbed Schema
 * @see https://oembed.com/#section2
 */
export type OEmbed = OEmbedPhoto | OEmbedVideo | OEmbedLink | OEmbedRich

type OEmbedBase = {
  type: "photo" | "video" | "link" | "rich"
  version: string
  title?: string
  author_name?: string
  author_url?: string
  provider_name?: string
  provider_url?: string
  cache_age?: string
  thumbnail_url?: string
  thumbnail_width?: number
  thumbnail_height?: number
}

export type OEmbedPhoto = OEmbedBase & {
  type: "photo"
  url: string
  width: number
  height: number
}

export type OEmbedVideo = OEmbedBase & {
  type: "video"
  html: string
  width: number
  height: number
}

export type OEmbedLink = OEmbedBase & {
  type: "link"
}

export type OEmbedRich = OEmbedBase & {
  type: "rich"
  html: string
  width: number
  height: number
}
