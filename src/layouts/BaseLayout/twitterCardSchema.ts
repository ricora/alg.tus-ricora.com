/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary
 */
export type TwitterSummaryCard = {
  card: "summary"
  site?: string
  title: string
  description?: string
  image?: URL
  imageAlt?: string
}

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/summary-card-with-large-image
 */
export type TwitterSummaryLargeImageCard = {
  card: "summary_large_image"
  site?: string
  title: string
  description?: string
  image: URL
  imageAlt?: string
}

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/player-card
 */
export type TwitterPlayerCard = {
  card: "player"
  title: string
  site: string
  description?: string
  player: URL
  playerWidth: number
  playerHeight: number
  image: URL
  imageAlt?: string
}

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/app-card
 */
export type TwitterAppCard = {
  card: "app"
  site: string
  description?: string
  appIdIphone: string
  appIdIpad: string
  appIdGoogleplay: string
  appUrlIphone?: URL
  appUrlIpad?: URL
  appUrlGoogleplay?: URL
  appNameIphone?: string
  appNameIpad?: string
  appNameGoogleplay?: string
  appCountry?: string
}

export type TwitterCard = TwitterSummaryCard | TwitterSummaryLargeImageCard | TwitterPlayerCard | TwitterAppCard
