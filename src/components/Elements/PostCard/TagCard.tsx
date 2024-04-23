import { getTags } from "@/lib/tags"
import { type Component } from "solid-js"

const tags = await getTags()

export type TagCardProps = {
  id: string
}

export const TagCard: Component<TagCardProps> = (props) => {
  const tag = tags.find((tag) => tag.id === props.id)!
  return (
    <a
      href={`/tags/${tag.id}`}
      class="m-1 flex flex-row items-center gap-1 rounded-md border bg-bg-default px-2.5 py-1 text-sm transition hover:bg-bg-muted sm:px-4 sm:text-base"
    >
      <span class="pr-0.5 text-xs text-fg-muted sm:text-sm">#</span>
      <span>{tag.title}</span>
    </a>
  )
}
