import { beforeAll, describe, expect, test } from "bun:test"
import dedent from "dedent"
import type * as hast from "hast"
import { JSDOM } from "jsdom"
import type * as mdast from "mdast"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import { remarkInlineCode } from "./remarkInlineCode"

const process = async (md: string) => {
  let hast: hast.Node
  let mdast: mdast.Root
  const html = (
    await unified()
      // @ts-expect-error broken types
      .use(remarkParse)
      .use(remarkInlineCode)
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

describe("remarkInlineCode", () => {
  let jsdom: JSDOM
  let parser: DOMParser

  beforeAll(() => {
    jsdom = new JSDOM()
    parser = new jsdom.window.DOMParser()
  })

  test("a inline code should be wrapped with `inline-code` element", async () => {
    const md = dedent`
      This is a paragraph with \`inline code\` in it.
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")

    const inlineCodeElement = doc.querySelector("inline-code")
    expect(inlineCodeElement).not.toBeNull()

    expect(inlineCodeElement?.textContent).toBe("inline code")
  })
})
