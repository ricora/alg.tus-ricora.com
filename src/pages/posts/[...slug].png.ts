import { getOgImage } from "@/components/Elements/OpenGraphImage"
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
  const body = await getOgImage({
    title: post?.data.title ?? "",
    category: post?.data.categories.length ? post?.data.categories[0].id : "",
    tags: post?.data.tags ?? [],
  })
  return new Response(body, {
    headers: {
      "content-type": "image/png",
    },
  })
}
