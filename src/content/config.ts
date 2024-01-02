import { z, defineCollection, reference } from "astro:content"

export const postsSchema = z
  .object({
    title: z.string(),
    draft: z.boolean().optional(),
    date: z.date(),
    lastmod: z.date().optional(),
    categories: z.array(reference("categories")),
    tags: z.array(z.string()).optional(),
    icon: z.string(),
  })
  .strict()
export type PostsSchema = z.infer<typeof postsSchema>

export const membersSchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string().url(),
  social: z.array(
    z.object({
      label: z.string().optional(),
      icon: z.string().optional(),
      link: z.string().url(),
    }),
  ),
  joined_year: z.number().min(1976).max(new Date().getFullYear()),
})
export type MembersSchema = z.infer<typeof membersSchema>

export const pagesSchema = z.object({
  title: z.string(),
  draft: z.boolean().optional(),
  date: z.date().optional(),
  lastmod: z.date().optional(),
  links: z
    .array(
      z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        website: z.string().url(),
        image: z.string().url().optional(),
      }),
    )
    .optional(),
})
export type PagesSchema = z.infer<typeof pagesSchema>

export const categoriesSchema = z.object({
  title: z.string(),
  twClassName: z.string(),
  icon: z.string(),
})
export type CategoriesSchema = z.infer<typeof categoriesSchema>

export const tagsSchema = z.object({
  title: z.string(),
})

const postsCollection = defineCollection({
  type: "content",
  schema: postsSchema,
})

const pagesCollection = defineCollection({
  type: "content",
  schema: pagesSchema,
})

const membersCollection = defineCollection({
  type: "data",
  schema: membersSchema,
})

const categoriesCollection = defineCollection({
  type: "data",
  schema: categoriesSchema,
})

const tagsCollection = defineCollection({
  type: "data",
  schema: tagsSchema,
})

export const collections = {
  posts: postsCollection,
  pages: pagesCollection,
  members: membersCollection,
  categories: categoriesCollection,
  tags: tagsCollection,
}
