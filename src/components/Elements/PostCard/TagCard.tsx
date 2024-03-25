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
      class="m-1 rounded-lg border bg-bg-default px-4 py-2 text-sm transition hover:bg-bg-muted"
    >
      <span class="pr-1 text-xs text-fg-muted">#</span>
      <span>{tag.title}</span>
    </a>
  )
}
