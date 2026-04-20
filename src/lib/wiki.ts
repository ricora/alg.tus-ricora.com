import { getCollection } from "astro:content"
import type { CollectionEntry } from "astro:content"
import path from "node:path"
import { isDev } from "@/lib/runtime"

export type WikiEntry = CollectionEntry<"wiki"> & {
  fileId: string
}

export type WikiNavPage = {
  title: string
  id: string
}

export type WikiSection = {
  title: string
  id?: string
  pages: WikiNavPage[]
}

export type WikiBreadcrumb = {
  title: string
  href?: string
}

const stripExtension = (id: string) => id.replace(/\.(md|mdx)$/u, "")

const comparePath = (a: string, b: string) => {
  const aParts = stripExtension(a).split("/")
  const bParts = stripExtension(b).split("/")

  const len = Math.min(aParts.length, bParts.length)
  for (let i = 0; i < len; i++) {
    const aIsIndex = aParts[i] === "index"
    const bIsIndex = bParts[i] === "index"
    if (aIsIndex && !bIsIndex) return -1
    if (!aIsIndex && bIsIndex) return 1

    const cmp = aParts[i].localeCompare(bParts[i], "ja")
    if (cmp !== 0) return cmp
  }
  return aParts.length - bParts.length
}

const humanizeSegment = (segment: string) =>
  segment
    .split(/[-_]/u)
    .filter(Boolean)
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(" ")

const toPage = (entry: WikiEntry): WikiNavPage => ({
  title: entry.data.title,
  id: entry.id,
})

const toPosixPath = (filePath: string) => filePath.replace(/\\/g, "/")
const wikiContentPath = path.join("src", "content", "wiki")
const absoluteWikiContentPath = path.resolve(process.cwd(), wikiContentPath)

const toWikiFileId = (entry: CollectionEntry<"wiki">) => {
  if (!entry.filePath) return entry.id

  const absoluteFilePath = path.resolve(process.cwd(), entry.filePath)
  const relativePath = path.relative(absoluteWikiContentPath, absoluteFilePath)
  const normalizedRelativePath = toPosixPath(relativePath)

  if (normalizedRelativePath === ".." || normalizedRelativePath.startsWith("../") || path.isAbsolute(relativePath)) {
    throw new Error(`Wiki entry must include filePath under src/content/wiki: ${entry.id}`)
  }

  return normalizedRelativePath
}

const toWikiEntry = (entry: CollectionEntry<"wiki">): WikiEntry => {
  return {
    ...entry,
    fileId: toWikiFileId(entry),
  }
}

const assertSectionIndexPages = (pages: WikiEntry[]) => {
  const pagePaths = new Set(pages.map((page) => stripExtension(page.fileId)))
  const sectionKeys = new Set(
    pages
      .map((page) => stripExtension(page.fileId).split("/"))
      .filter((parts) => parts.length >= 2)
      .map((parts) => parts[0]),
  )

  const missingSections = [...sectionKeys]
    .filter((sectionKey) => !pagePaths.has(`${sectionKey}/index`))
    .sort((a, b) => a.localeCompare(b, "ja"))

  if (missingSections.length > 0) {
    throw new Error(`Wiki section must include index.md or index.mdx: ${missingSections.join(", ")}`)
  }
}

export const toWikiHref = (id: string) => `/wiki/${id}/`

export const getWikiPages = async () => {
  const pages = (await getCollection("wiki", ({ data }) => (isDev ? true : !data.draft))).map(toWikiEntry)
  const sortedPages = pages.sort((a, b) => comparePath(a.fileId, b.fileId))
  assertSectionIndexPages(sortedPages)
  return sortedPages
}

export const getWikiSections = (pages: WikiEntry[]) => {
  const grouped = new Map<string, WikiEntry[]>()

  for (const page of pages) {
    const parts = stripExtension(page.fileId).split("/")
    const sectionKey = parts.length >= 2 ? parts[0] : "__root"
    let sectionPages = grouped.get(sectionKey)
    if (!sectionPages) {
      sectionPages = []
      grouped.set(sectionKey, sectionPages)
    }
    sectionPages.push(page)
  }

  const keys = [...grouped.keys()].sort((a, b) => {
    if (a === "__root") return -1
    if (b === "__root") return 1
    return a.localeCompare(b, "ja")
  })

  return keys.map((key) => {
    const sectionPages = (grouped.get(key) ?? []).sort((a, b) => comparePath(a.fileId, b.fileId))
    const sectionIndexPage = sectionPages.find((page) => stripExtension(page.fileId).endsWith("/index"))
    const sectionChildPages = sectionPages.filter((page) => page !== sectionIndexPage)

    return {
      title: key === "__root" ? "General" : (sectionIndexPage?.data.title ?? humanizeSegment(key)),
      id: sectionIndexPage?.id,
      pages: sectionChildPages.map(toPage),
    } satisfies WikiSection
  })
}

export const getWikiBreadcrumbs = (current: WikiEntry, pages: WikiEntry[]) => {
  const breadcrumbs: WikiBreadcrumb[] = [{ title: "Wiki", href: "/wiki/" }]

  const currentPath = stripExtension(current.fileId)
  const parts = currentPath.split("/")

  if (parts.length >= 2) {
    const sectionKey = parts[0]
    const sectionIndex = pages.find((page) => stripExtension(page.fileId) === `${sectionKey}/index`)
    const isSectionIndexPage = current.fileId === sectionIndex?.fileId

    breadcrumbs.push({
      title: sectionIndex?.data.title ?? humanizeSegment(sectionKey),
      href: isSectionIndexPage ? undefined : sectionIndex ? toWikiHref(sectionIndex.id) : undefined,
    })

    if (isSectionIndexPage) return breadcrumbs
  }

  breadcrumbs.push({ title: current.data.title })
  return breadcrumbs
}

export const getWikiPrevNext = (pages: WikiEntry[], currentId: string) => {
  const index = pages.findIndex((page) => page.id === currentId)
  if (index === -1) return { previous: undefined, next: undefined }

  return {
    previous: pages[index - 1],
    next: pages[index + 1],
  }
}
