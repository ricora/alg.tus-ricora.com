import { transformerDiff } from "./diff"
import { transformerHighlightLine } from "./highlight-line"
import { transformerLineNumbers } from "./line-numbers"

export const defaultTransformers = [transformerDiff, transformerHighlightLine, transformerLineNumbers] as const

export { transformerDiff, transformerHighlightLine, transformerLineNumbers }
