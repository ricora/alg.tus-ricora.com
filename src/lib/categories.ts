import { getCollection } from "astro:content"

const categoryCollection = await getCollection("categories")

export type CategoryType = (typeof categoryCollection)[number]

export const getCategories = async (): Promise<CategoryType[]> => {
  return categoryCollection
}
