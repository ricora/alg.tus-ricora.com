import type * as hast from "hast"
import rehypeStringify from "rehype-stringify"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"
import type { Meta } from "../parser"
import { type RehypeCustomCodeOptions, rehypeCustomCode } from "../plugin"
import { bundledLanguages, createHighlighter } from "shiki"

export const highlighter = await createHighlighter({
  langs: Object.keys(bundledLanguages),
  themes: ["one-dark-pro", "github-light"],
})

export const process = async (
  md: string,
  options?: Omit<RehypeCustomCodeOptions, "highlighter"> & Partial<RehypeCustomCodeOptions>,
) => {
  let hast: hast.Node
  const html = (
    await unified()
      .use(
        // @ts-expect-error - remarkParse types are broken
        remarkParse,
      )
      .use(remarkRehype)
      .use(() => (tree: hast.Node) => {
        hast = tree
        return hast
      })
      .use(rehypeCustomCode<Meta>, { highlighter, ...options })
      .use(rehypeStringify)
      .process(md)
  ).toString()

  // @ts-expect-error: hast and mdast is assigned
  return { hast, html }
}
