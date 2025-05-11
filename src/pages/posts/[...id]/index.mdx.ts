import type { APIContext } from "astro"
import { getCollection, getEntry } from "astro:content"

export const getStaticPaths = async () => {
  const posts = await getCollection("posts")

  return posts.map((post) => ({
    params: { id: post.id },
  }))
}

export const GET = async ({ params }: APIContext) => {
  const post = await getEntry("posts", params.id as string)
  const body = post?.body?.trimStart()
  return new Response(body, {
    headers: {
      "content-type": "text/mdx; charset=utf-8",
    },
  })
}
