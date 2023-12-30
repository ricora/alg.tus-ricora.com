import type { IconifyIcon } from "@iconify/iconify"
import { fromHtml } from "hast-util-from-html"
import { toHtml } from "hast-util-to-html"
import { select } from "hast-util-select"

/**
 * SVG文字列をIconifyIconに変換する
 * @param svg SVG文字列
 * @returns IconifyIcon
 */
export const getIconifyIcon = (svg: string): IconifyIcon => {
  const hast = fromHtml(svg)
  const svgHast = select("svg", hast)
  if (svgHast?.tagName !== "svg") throw new Error("Invalid SVG")
  if (!("viewBox" in svgHast.properties)) throw new Error("SVG must have viewBox property")

  const viewBox = svgHast.properties.viewBox as string
  const [left, top, width, height] = viewBox.split(" ").map((str) => parseFloat(str))

  const svgBody = toHtml(svgHast.children)

  return { left, top, width, height, body: svgBody }
}
