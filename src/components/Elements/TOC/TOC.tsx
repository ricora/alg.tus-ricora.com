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
      <li class="mb-2 ms-4" id={`toc-${heading.text.toLowerCase().replaceAll(" ", "-")}`}>
        <div
          class={twMerge(
            "absolute rounded-full border border-mauve-6 bg-mauve-6 data-[active=true]:border-mauve-8 data-[active=true]:bg-mauve-8",
            heading.depth === 2 ? "-start-[6px] mt-1.5 size-3" : "-start-[3px] mt-2 size-1.5",
          )}
        />
        <a href={`#${heading.slug}`} class="block max-w-[200px] truncate">
          <span
            class={twMerge(
              "text-mauve-11 data-[active=true]:text-mauve-12",
              heading.depth === 2 ? "font-bold" : "font-normal",
            )}
          >
            {heading.text}
          </span>
        </a>
      </li>
    ))

  const setDataActive = (element: HTMLElement, active: boolean) => {
    element
      .getElementsByTagName("a")[0]
      .getElementsByTagName("span")[0]
      .setAttribute("data-active", active ? "true" : "false")
    element.getElementsByTagName("div")[0].setAttribute("data-active", active ? "true" : "false")
  }

  onMount(() => {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const tocLiElement = document.getElementById(`toc-${entry.target.id.toLowerCase().replaceAll(" ", "-")}`)
        if (!tocLiElement) return
        if (entry.isIntersecting) {
          if (pendingDeactivateHeadingElements.length > 0) {
            pendingDeactivateHeadingElements.forEach((element) => {
              setDataActive(element, false)
            })
            pendingDeactivateHeadingElements = []
            activeHeadingCount = 0
          }
          setDataActive(tocLiElement, true)
          activeHeadingCount++
        } else {
          if (activeHeadingCount > 1) {
            setDataActive(tocLiElement, false)
            activeHeadingCount--
          } else {
            pendingDeactivateHeadingElements.push(tocLiElement)
          }
        }
      })
    })
    props.headings.forEach((heading) => {
      if (heading.depth === 2 || heading.depth === 3) {
        observer.observe(document.getElementById(heading.text.toLowerCase().replaceAll(" ", "-"))!)
      }
    })
  })

  return (
    <div class="flex max-h-[calc(100dvh-5rem)] flex-col">
      <div class="mb-4 text-xl font-bold">目次</div>
      <div class="overflow-auto p-3">
        <ul class="relative border-s border-border-muted">{headingElements}</ul>
      </div>
    </div>
  )
}
