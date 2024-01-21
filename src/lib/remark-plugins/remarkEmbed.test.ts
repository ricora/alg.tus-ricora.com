import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { describe, test, expect, beforeAll } from "bun:test"
import dedent from "dedent"
import type * as hast from "hast"
import type * as mdast from "mdast"
import { JSDOM } from "jsdom"
import { googleSlidesTransformer, oEmbedTransformer, remarkEmbed } from "./remarkEmbed"
import { unfurl } from "unfurl.js"

const process = async (md: string) => {
  let hast: hast.Node
  let mdast: mdast.Root
  const html = (
    await unified()
      .use(remarkParse)
      .use(remarkEmbed, {
        transformers: [oEmbedTransformer, googleSlidesTransformer],
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

  test("YouTube video should be embedded with oEmbed", async () => {
    const md = dedent`
      <https://www.youtube.com/watch?v=Gy5vAs_jQSo>
    `
    const expectedOEmbedData = (await unfurl("https://www.youtube.com/watch?v=Gy5vAs_jQSo")).oEmbed

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const oEmbed = doc.querySelector("oembed")
    const actualOEmbedData = JSON.parse(oEmbed?.getAttribute("oEmbed") ?? "")

    expect(oEmbed).not.toBeNull()
    expect(actualOEmbedData).toEqual(expectedOEmbedData)
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
