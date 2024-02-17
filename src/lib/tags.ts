import { getCollection } from "astro:content"
import { getPosts } from "./posts"

export type Tag = {
  id: string
  title: string
}

export const getTags = async (): Promise<Tag[]> => {
  const posts = await getPosts()
  const tagCollection = await getCollection("tags")

  const tagIdToTitle = tagCollection.reduce<{ [key: string]: string }>((acc, { id, data }) => {
    acc[id] = data.title
    return acc
  }, {})
  const tagIdList = posts.reduce<string[]>((acc, { data }) => {
    if (data.tags) {
      data.tags.forEach((tag) => {
        if (!acc.includes(tag)) {
          acc.push(tag)
        }
      })
    }
    return acc
  }, [])

  return tagIdList.map((tagId) => ({
    id: tagId,
    title: tagId in tagIdToTitle ? tagIdToTitle[tagId] : tagId,
  }))
}
