import DOMPurify from "isomorphic-dompurify"

export const sanitize = (html: string) =>
  DOMPurify.sanitize(html, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
    FORBID_ATTR: ["height", "width"],
  })
