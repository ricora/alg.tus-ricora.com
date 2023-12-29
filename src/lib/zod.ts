import { z } from "astro:content"

/**
 * 与えられたオブジェクトのキーを列挙したZodEnumを返す
 * @see https://github.com/colinhacks/zod/discussions/839
 * @argument obj オブジェクト
 * @returns `z.enum(Object.keys(obj))`
 */
export const zodEnumFromObj = <K extends string>(obj: Record<K, unknown>): z.ZodEnum<[K, ...K[]]> => {
  const [firstKey, ...otherKeys] = Object.keys(obj) as K[]
  return z.enum([firstKey, ...otherKeys])
}
