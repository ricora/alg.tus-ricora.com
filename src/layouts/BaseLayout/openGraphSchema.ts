/**
 * `language_TERRITORY`
 * @example en_US
 */
type Locale = `${Lowercase<string>}_${Uppercase<string>}`

/**
 * MIME type
 * `type/subtype`
 * @see https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/MIME_types
 * @see https://datatracker.ietf.org/doc/html/rfc6838
 * @see https://www.iana.org/assignments/media-types/media-types.xhtm
 */
type MIMEType = `${string}/${string}`

/**
 * @see https://ogp.me/#types
 **/
type OpenGraphType =
  | `music.${"song" | "album" | "playlist" | "radio_station"}`
  | `video.${"movie" | "episode" | "tv_show" | "other"}`
  | "article"
  | "book"
  | "profile"
  | "website"
  | `${string}:${string}`

/**
 * Open Graph protocol schema
 * @see https://ogp.me/
 */
export type OpenGraph = {
  /**
   * An array of prefix to namespace mappings.
   * @see https://www.w3.org/TR/rdfa-lite/#prefix
   * @example
   * ```ts
   * const og: OpenGraph = {
   *   // ...
   *   prefixies: {
   *     video: "http://ogp.me/ns/video#",
   *   }
   * }
   * ```
   * Yield:
   * ```html
   * <head prefix="og: http://ogp.me/ns# video: http://ogp.me/ns/video#">
   * <!-- ... -->
   * </head>
   * ```
   */
  prefixies?: Record<string, string>

  /**
   * The title of your object as it should appear within the graph, e.g., "The Rock".
   */
  title: string

  /**
   * The type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.
   */
  type: OpenGraphType

  /**
   * An image url or info which should represent your object within the graph.
   */
  image:
    | URL
    | {
        /** Identical to og:image. */
        url: URL
        /** An alternate url to use if the webpage requires HTTPS. */
        secureUrl?: URL
        /** A MIME type for this image. */
        type?: MIMEType
        /** The number of pixels wide. */
        width?: number
        /** The number of pixels high. */
        height?: number
        /** A description of what is in the image (not a caption). If the page specifies an og:image it should specify og:image:alt. */
        alt?: string
      }

  /**
   * The canonical URL of your object that will be used as its permanent ID in the graph, e.g., "https://www.imdb.com/title/tt0117500/".
   */
  url: URL

  /**
   * A URL to an audio file to accompany this object.
   */
  audio?:
    | URL
    | {
        /** Identical to og:audio. */
        url: URL
        /** An alternate url to use if the webpage requires HTTPS. */
        secureUrl?: URL
        /** A MIME type for this audio. */
        type?: MIMEType
      }

  /**
   * A one to two sentence description of your object.
   */
  description?: string

  /**
   * The word that appears before this object's title in a sentence. An enum of (a, an, the, "", auto). If auto is chosen, the consumer of your data should chose between "a" or "an". Default is "" (blank).
   */
  determiner?: string

  /**
   * The locale these tags are marked up in. Of the format language_TERRITORY. Default is en_US.
   */
  locale?: Locale

  /**
   * An array of other locales this page is available in.
   */
  localeAlternate?: Locale[]

  /**
   * If your object is part of a larger web site, the name which should be displayed for the overall site. e.g., "IMDb".
   */
  siteName?: string

  /**
   * A URL to a video file that complements this object.
   */
  video?:
    | URL
    | {
        /** Identical to og:video. */
        url: URL
        /** An alternate url to use if the webpage requires HTTPS. */
        secureUrl?: URL
        /** A MIME type for this video. */
        type?: MIMEType
        /** The number of pixels wide. */
        width?: number
        /** The number of pixels high. */
        height?: number
        /** A description of what is in the video (not a caption). If the page specifies an og:video it should specify og:video:alt. */
        alt?: string
      }
}
