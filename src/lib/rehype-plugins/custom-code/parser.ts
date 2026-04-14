import rangeParser from "parse-numeric-range"

type RequiredMeta = {
  range?: number[]
  showLineNumbers?: boolean
  startLine?: number
  diff?: boolean
}

type OptionalMeta = {
  [key: string]: unknown
}

export type Meta = Omit<OptionalMeta, keyof RequiredMeta> & RequiredMeta

export const defaultMeta: Required<Meta> = {
  range: [],
  showLineNumbers: false,
  startLine: 1,
  diff: false,
}

type Group = {
  range?: string
  kv?: string
  kvKey?: string
  kvValue?: string
  kvDoubleQuote?: string
  kvDoubleQuoteKey?: string
  kvDoubleQuoteValue?: string
  kvSingleQuote?: string
  kvSingleQuoteKey?: string
  kvSingleQuoteValue?: string
  boolValue?: string
}

const parseRegex =
  /\{(?<range>.*?)\}|(?<kv>(?<kvKey>[^\s]+?)\s*=\s*(?<kvValue>[^\s"']+?))(?=\s|$)|(?<kvDoubleQuote>(?<kvDoubleQuoteKey>[^\s]+?)\s*=\s*"(?<kvDoubleQuoteValue>.*?)(?<!\\)")|(?<kvSingleQuote>(?<kvSingleQuoteKey>[^\s]+?)\s*=\s*'(?<kvSingleQuoteValue>.*?)(?<!\\)')|(?<=\s|^)(?<boolValue>[^\s=]+?)(?=\s|$)/g

/**
 * Parse meta string to object.
 * @param meta meta string
 * @returns meta object
 */
export const parseMeta = <M extends Meta = Meta>(meta: string): M => {
  const matches = meta.matchAll(parseRegex)

  const metaObj = { ...defaultMeta }
  for (const match of matches) {
    const groups = match.groups as Group
    if (groups.range && Array.isArray(metaObj.range)) {
      const range = rangeParser(groups.range)
      metaObj.range = [...metaObj.range, ...range]
    }
    if (groups.kvKey && groups.kvValue) {
      metaObj[groups.kvKey] = retrieveEscapedString(groups.kvValue)
    }
    if (groups.kvDoubleQuoteKey && groups.kvDoubleQuoteValue) {
      metaObj[groups.kvDoubleQuoteKey] = retrieveEscapedString(groups.kvDoubleQuoteValue)
    }
    if (groups.kvSingleQuoteKey && groups.kvSingleQuoteValue) {
      metaObj[groups.kvSingleQuoteKey] = retrieveEscapedString(groups.kvSingleQuoteValue)
    }
    if (groups.boolValue) {
      metaObj[groups.boolValue] = true
    }
  }
  metaObj.range = removeDuplicateAndSort(metaObj.range)

  return metaObj as M
}

export const retrieveEscapedString = (str: string) => str.replace(/\\(.)/g, "$1")

export const removeDuplicateAndSort = (arr: number[]) => {
  return Array.from(new Set(arr)).sort((a, b) => a - b)
}
