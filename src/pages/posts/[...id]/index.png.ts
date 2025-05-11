import { getOgImage } from "@/components/Elements/OpenGraphImage"
import { getTags } from "@/lib/tags"
import type { APIContext } from "astro"
import { getCollection, getEntry } from "astro:content"

export const getStaticPaths = async () => {
  const posts = await getCollection("posts")

  return posts.map((post) => ({
    params: { id: post.id },
  }))
}

const tags = await getTags()

export const GET = async ({ params }: APIContext) => {
  const post = await getEntry("posts", params.id as string)
  const body = await getOgImage({
    title: post?.data.title ?? "",
    category: post?.data.categories.length ? post?.data.categories[0].id : "",
    tags: (post?.data.tags ?? []).map((id) => tags.find((tag) => tag.id === id)?.title ?? id),
  })
  return new Response(body, {
    headers: {
      "content-type": "image/png",
    },
  })
}
