import type { ShikiTransformer } from "shiki"
import type { Meta } from "../parser"
import { getPropsKey } from "../utils"

export const transformerLineNumbers = (meta: Meta, propsPrefix: string): ShikiTransformer => ({
  code: (hast) => {
    if (meta.showLineNumbers) {
      hast.properties[getPropsKey(propsPrefix, "line-numbers")] = true
    }
  },
  line: (hast, line) => {
    if (meta.showLineNumbers) {
      const startLine = Number(meta.startLine)
      hast.properties[getPropsKey(propsPrefix, "line")] = Math.max(startLine - 1, 0) + line
    }
  },
})
