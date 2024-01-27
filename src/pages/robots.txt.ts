import dedent from "dedent"

export const GET = () => {
  const sitemap = new URL("/sitemap-index.xml", import.meta.env.SITE)
  const robotsTxt = dedent`
    User-agent: *
    Allow: /

    Sitemap: ${sitemap.href}
  `

  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  })
}
