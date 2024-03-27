import type { APIContext } from "astro"
import { getCollection, getEntryBySlug } from "astro:content"

export const getStaticPaths = async () => {
  const posts = await getCollection("posts")

  return posts.map((post) => ({
    params: { slug: post.slug },
  }))
}

export const GET = async ({ params }: APIContext) => {
  const post = await getEntryBySlug("posts", params.slug as string)
  const body = post?.body
  return new Response(body, {
    headers: {
      "content-type": "text/mdx; charset=utf-8",
    },
  })
}
