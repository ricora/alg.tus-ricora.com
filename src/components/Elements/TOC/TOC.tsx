import type { MarkdownHeading } from "astro"
import { onMount, type Component } from "solid-js"
import { twMerge } from "tailwind-merge"

export type TOCProps = {
  headings: MarkdownHeading[]
}

export const TOC: Component<TOCProps> = (props) => {
  let observer: IntersectionObserver
  let activeHeadingCount: number = 0
  let pendingDeactivateHeadingElements: HTMLElement[] = []

  const headings = props.headings
  const headingElements = headings
    .filter((heading) => heading.depth === 2 || heading.depth === 3)
    .map((heading) => (
      <li class="mb-2 ms-4">
        <div
          class={twMerge(
            "absolute rounded-full border border-border-muted bg-border-muted",
            heading.depth === 2 ? "-start-[6px] mt-1.5 size-3" : "-start-[3px] mt-2 size-1.5",
          )}
        />
        <a href={`#${heading.slug}`} class="block max-w-[200px] truncate">
          <span
            class={twMerge("text-mauve-11", heading.depth === 2 ? "font-bold" : "font-normal")}
            id={`toc-${heading.text.toLowerCase().replace(/ /g, "-")}`}
          >
            {heading.text}
          </span>
        </a>
      </li>
    ))

  onMount(() => {
    observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const toc = document.getElementById(`toc-${entry.target.id.toLowerCase().replace(/ /g, "-")}`)
        if (!toc) return
        if (entry.isIntersecting) {
          if (pendingDeactivateHeadingElements.length > 0) {
            pendingDeactivateHeadingElements.forEach((element) => {
              element.setAttribute("class", element.getAttribute("class")!.replace("text-mauve-12", "text-mauve-11"))
            })
            pendingDeactivateHeadingElements = []
            activeHeadingCount = 0
          }
          toc.setAttribute("class", toc.getAttribute("class")!.replace("text-mauve-11", "text-mauve-12"))
          activeHeadingCount++
        } else {
          if (activeHeadingCount > 1) {
            toc.setAttribute("class", toc.getAttribute("class")!.replace("text-mauve-12", "text-mauve-11"))
            activeHeadingCount--
          } else {
            pendingDeactivateHeadingElements.push(toc)
          }
        }
      })
    })
    props.headings.forEach((heading) => {
      if (heading.depth === 2 || heading.depth === 3) {
        observer.observe(document.getElementById(heading.text.toLowerCase().replace(/ /g, "-"))!)
      }
    })
  })

  return (
    <div>
      <div class="mb-4 text-xl font-bold">目次</div>
      <div class="h-[480px] overflow-auto p-3">
        <ul class="relative border-s border-border-muted">{headingElements}</ul>
      </div>
    </div>
  )
}
