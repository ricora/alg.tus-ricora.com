import { type Plugin } from "unified"
import type { Root } from "mdast"
import { visit } from "unist-util-visit"

export const remarkLinkCard: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "link", (link, index, paragraph) => {
      // Check if the paragraph only contains a single url link
      // e.g. OK: `https://hoge.com/fuga`
      //      NG: `according to hoge.com/fuga`
      //      NG: `[hoge](https://hoge.com/fuga)`
      if (
        paragraph?.type !== "paragraph" ||
        paragraph.children.length !== 1 ||
        link.children.length !== 1 ||
        link.children[0].type !== "text" ||
        link.children[0].value !== link.url
      )
        return

      if (!link.data) link.data = {}

      link.data.hName = "link-card"
      link.children = []
    })
  }
}
