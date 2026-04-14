import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { describe, test, expect, beforeAll } from "bun:test"
import dedent from "dedent"
import type * as hast from "hast"
import type * as mdast from "mdast"
import { JSDOM } from "jsdom"
import { remarkLinkCard } from "./remarkLinkCard"

const process = async (md: string) => {
  let hast: hast.Node
  let mdast: mdast.Root
  const html = (
    await unified()
      .use(remarkParse)
      .use(remarkLinkCard)
      .use(() => (tree: mdast.Root) => {
        mdast = tree
        return mdast
      })
      .use(remarkRehype)
      .use(() => (tree: hast.Node) => {
        hast = tree
        return hast
      })
      .use(rehypeStringify)
      .process(md)
  ).toString()

  // @ts-expect-error: hast and mdast is assigned
  return { hast, mdast, html }
}

describe("remarkCallout", () => {
  let jsdom: JSDOM
  let parser: DOMParser

  beforeAll(() => {
    jsdom = new JSDOM()
    parser = new jsdom.window.DOMParser()
  })

  test("a paragraph which only contains a url link should be link-card", async () => {
    const md = dedent`
      <https://example.com>

      <https://github.com>
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")

    const linkCards = doc.querySelectorAll("link-card")
    expect(linkCards.length).toBe(2)
    expect(linkCards[0].getAttribute("href")).toBe("https://example.com")
    expect(linkCards[1].getAttribute("href")).toBe("https://github.com")
  })

  test("a paragraph which contains a url link and other text should not be link-card", async () => {
    const md = dedent`
      <https://example.com> Hello, world!
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")

    const linkCards = doc.querySelectorAll("link-card")
    expect(linkCards.length).toBe(0)
  })

  test("a named link should not be link-card", async () => {
    const md = dedent`
      [example](https://example.com)

      [](https://github.com)
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")

    const linkCards = doc.querySelectorAll("link-card")
    expect(linkCards.length).toBe(0)
  })
})
