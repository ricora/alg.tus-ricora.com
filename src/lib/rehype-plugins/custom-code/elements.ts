import type { Element } from "hast"
import { isElement } from "hast-util-is-element"
import { type Meta, parseMeta } from "./parser"
import type { RehypeCustomCodeOptions } from "./plugin"

interface PreElement extends Element {
  tagName: "pre"
}

interface CodeElement extends Element {
  tagName: "code"
}

export const isPreElement = (node?: unknown): node is PreElement => isElement(node) && node.tagName === "pre"

export const isCodeElement = (node?: unknown): node is CodeElement => isElement(node) && node.tagName === "code"

interface ElementWithMetaData extends Element {
  data: {
    meta: string
  } & Element["data"]
}

export const hasMetaData = (node: Element): node is ElementWithMetaData =>
  node.data && "meta" in node.data && typeof node.data.meta === "string" ? true : false

export const getMeta = <M extends Meta = Meta>(
  node: Element,
  preprocess: Required<RehypeCustomCodeOptions<M>>["metaStringPreprocess"],
): M => {
  const metaString = hasMetaData(node) ? node.data.meta : ((node.properties?.metaString as string) ?? "")
  return parseMeta(preprocess(metaString))
}
