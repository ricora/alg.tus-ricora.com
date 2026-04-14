import { kebabCase } from "scule"

export const getPropsKey = (prefix: string, key: string) =>
  prefix.length === 0 ? kebabCase(key) : `${prefix}-${kebabCase(key)}`
