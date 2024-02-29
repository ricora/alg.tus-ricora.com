import type { Root } from "mdast"
import { type Plugin } from "unified"
import { visit } from "unist-util-visit"

export const remarkInlineCode: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "inlineCode", (node) => {
      if (!node.data) node.data = {}
      node.data.hName = "inline-code"
    })
  }
}
