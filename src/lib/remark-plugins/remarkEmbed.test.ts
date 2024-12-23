import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { describe, test, expect, beforeAll } from "bun:test"
import dedent from "dedent"
import type * as hast from "hast"
import type * as mdast from "mdast"
import { JSDOM } from "jsdom"
import { googleSlidesTransformer, oEmbedTransformer, remarkEmbed, youTubeTransformer } from "./remarkEmbed"

const process = async (md: string) => {
  let hast: hast.Node
  let mdast: mdast.Root
  const html = (
    await unified()
      // @ts-expect-error broken types
      .use(remarkParse)
      .use(remarkEmbed, {
        transformers: [youTubeTransformer, googleSlidesTransformer, oEmbedTransformer],
      })
      .use(() => (tree: mdast.Root) => {
        mdast = tree
        return mdast
      })
      .use(remarkRehype)
      .use(() => (tree: hast.Node) => {
        hast = tree
        return hast
      })
      // @ts-expect-error broken types
      .use(rehypeStringify)
      .process(md)
  ).toString()

  // @ts-expect-error: hast and mdast is assigned
  return { hast, mdast, html }
}

describe("remarkEmbed", () => {
  let jsdom: JSDOM
  let parser: DOMParser

  beforeAll(() => {
    jsdom = new JSDOM()
    parser = new jsdom.window.DOMParser()
  })

  test("YouTube video (www.youtube.com/watch?v=) should be embedded with iframe", async () => {
    const md = dedent`
      <https://www.youtube.com/watch?v=Gy5vAs_jQSo>
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const iframe = doc.querySelector("iframe")

    expect(iframe).not.toBeNull()
    expect(iframe?.getAttribute("src")).toBe("https://www.youtube.com/embed/Gy5vAs_jQSo")
  })

  test("YouTube video (www.youtube.com/embed/) should be embedded with iframe", async () => {
    const md = dedent`
      <https://www.youtube.com/embed/Gy5vAs_jQSo>
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const iframe = doc.querySelector("iframe")

    expect(iframe).not.toBeNull()
    expect(iframe?.getAttribute("src")).toBe("https://www.youtube.com/embed/Gy5vAs_jQSo")
  })

  test("Google Slides should be embedded with iframe", async () => {
    const md = dedent`
      <https://docs.google.com/presentation/d/1t-XdfXzd3l8CdfriQWOljuOleKHIdnomCHcIffSEZA4/edit>
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const iframe = doc.querySelector("iframe")

    expect(iframe).not.toBeNull()
    expect(iframe?.getAttribute("src")).toBe(
      "https://docs.google.com/presentation/d/1t-XdfXzd3l8CdfriQWOljuOleKHIdnomCHcIffSEZA4/embed",
    )
  })

  test("Google Slides without edit should be embedded with iframe", async () => {
    const md = dedent`
      <https://docs.google.com/presentation/d/1t-XdfXzd3l8CdfriQWOljuOleKHIdnomCHcIffSEZA4/>
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const iframe = doc.querySelector("iframe")

    expect(iframe).not.toBeNull()
    expect(iframe?.getAttribute("src")).toBe(
      "https://docs.google.com/presentation/d/1t-XdfXzd3l8CdfriQWOljuOleKHIdnomCHcIffSEZA4/embed",
    )
  })

  test("Google Slides (web) should be embedded with iframe", async () => {
    const md = dedent`
      <https://docs.google.com/presentation/d/e/2PACX-1vSa6GugRVCqWJX4Gb-O_CZ27Ex2LCTHjU5zDCmsBUAvBMK5iIFdEYAea99v4LUFEU6NkGvMg5EAF4vf/pub>
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const iframe = doc.querySelector("iframe")

    expect(iframe).not.toBeNull()
    expect(iframe?.getAttribute("src")).toBe(
      "https://docs.google.com/presentation/d/e/2PACX-1vSa6GugRVCqWJX4Gb-O_CZ27Ex2LCTHjU5zDCmsBUAvBMK5iIFdEYAea99v4LUFEU6NkGvMg5EAF4vf/embed",
    )
  })
})
