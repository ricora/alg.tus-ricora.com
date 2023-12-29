import { z, defineCollection } from "astro:content"
import { categories } from "./categories"
import { zodEnumFromObj } from "@/lib/zod"

export const postSchema = z
  .object({
    title: z.string(),
    draft: z.boolean(),
    date: z.date(),
    lastmod: z.date().optional(),
    categories: z.array(zodEnumFromObj(categories)),
    tags: z.array(z.string()).optional(),
    icon: z.string(),
  })
  .strict()
export type PostSchema = z.infer<typeof postSchema>

const postColection = defineCollection({
  type: "content",
  schema: postSchema,
})

export const collections = {
  post: postColection,
}
