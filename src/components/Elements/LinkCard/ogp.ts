import { fromHtml } from "hast-util-from-html"
import { select } from "hast-util-select"
import type { Element } from "hast"

type OGP = {
  title?: string
  description?: string
  image?: URL
}

export const getOGP = async (url: URL): Promise<OGP> => {
  try {
    const res = await fetch(url.href)
    const data = await res.text()

    const root = fromHtml(data)
    const head = select("head", root)
    const body = select("body", root)

    const image = getImage(url, head)
    return {
      title: getTitle(url, head, body),
      description: getDescription(url, head),
      image: image != null ? new URL(image, url) : undefined,
    }
  } catch (e) {
    console.error("Failed to get OGP: ", url.href)
    return {
      title: undefined,
      description: undefined,
      image: undefined,
    }
  }
}

const getTitle = (url: URL, head?: Element, body?: Element) => {
  const title = select("title", head)?.children[0]
  if (title?.type === "text") return title.value

  const ogTitle = select("meta[property='og:title']", head)?.properties?.content
  if (ogTitle != null) return String(ogTitle)

  const h1 = select("h1", body)?.children[0]
  if (h1?.type === "text") return h1.value

  return undefined
}

const getDescription = (url: URL, head?: Element) => {
  const defaultDescription = () => {
    const description = select("meta[name='description']", head)?.properties?.content
    if (description != null) return String(description)

    const ogDescription = select("meta[property='og:description']", head)?.properties?.content
    if (ogDescription != null) return String(ogDescription)

    return undefined
  }

  switch (url.hostname) {
    case "zenn.dev": {
      const zennDescription = select("meta[name='zenn:description']", head)?.properties?.content
      if (zennDescription != null) return String(zennDescription)
      return defaultDescription()
    }
    default:
      return defaultDescription()
  }
}

const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

const getImage = (url: URL, head?: Element) => {
  const defaultImage = () => {
    const ogImage = select("meta[property='og:image']", head)?.properties?.content
    if (ogImage != null && isValidUrl(String(ogImage))) return String(ogImage)
    return undefined
  }

  switch (url.hostname) {
    case "zenn.dev": {
      const zennImage = select("meta[name='zenn:image']", head)?.properties?.content
      if (zennImage != null) return String(zennImage)
      return defaultImage()
    }
    default:
      return defaultImage()
  }
}

export const getFavicon = async (url: URL) => {
  const domain = url.hostname
  const response = await fetch(`https://icons.duckduckgo.com/ip3/${domain}.ico`)
  const arrayBuffer = await response.arrayBuffer()
  const base64 = Buffer.from(arrayBuffer).toString("base64")
  return `data:${response.headers.get("content-type")};base64,${base64}`
}
