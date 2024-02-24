import { Icon, type IconName } from "@/components/Elements/Icon"
import { formatDate } from "@/lib/date"
import { calculateReadingTime } from "@/lib/posts"
import { getCollection } from "astro:content"
import { type Component } from "solid-js"
import { twMerge } from "tailwind-merge"
import { CategoryCard } from "./CategoryCard"

const categories = await getCollection("categories")

type CategoryType = (typeof categories)[number]
type CategorySlugType = CategoryType["id"]

export type PostCardProps = {
  title: string
  icon: IconName
  body: string
  tags: string[]
  categories: CategorySlugType[]
  slug: string
  date: Date
  lastmod?: Date
  animationDelay?: number
  class?: string
}

export const PostCard: Component<PostCardProps> = (props) => {
  return (
    <div
      class={twMerge(
        "flex flex-row items-center gap-2 rounded-xl bg-bg-default p-4 duration-1000 ease-out animate-in fade-in-0 slide-in-from-bottom-6 hover:bg-bg-muted",
        props.class,
      )}
      style={{
        "animation-delay": `${props.animationDelay}ms`,
        "animation-fill-mode": "backwards",
      }}
    >
      <Icon name={props.icon} class="w-20 flex-none rounded-2xl p-4 sm:w-28 sm:p-6" />
      <div class="my-2 flex flex-col gap-2.5 sm:gap-4">
        <header>
          <div class="flex flex-row flex-wrap gap-2">
            {props.categories.map((category) => (
              <CategoryCard id={category} />
            ))}
          </div>
        </header>
        <a href={`/posts/${props.slug}`}>
          <h2 class="text-lg font-black sm:text-xl md:text-2xl">{props.title}</h2>
        </a>
        <footer class="flex flex-row flex-wrap gap-2 text-xs font-semibold text-fg-subtle sm:gap-4 sm:text-sm">
          <div class="flex flex-row items-center gap-2">
            <Icon name="tabler:calendar-time" class="h-4 w-4 sm:h-5 sm:w-5" />
            <span>投稿: {formatDate(props.date)}</span>
          </div>
          {props.lastmod && props.lastmod.getTime() !== props.date.getTime() && (
            <div class="flex flex-row items-center gap-2">
              <Icon name="tabler:refresh" class="h-5 w-5" />
              <span>最終更新: {formatDate(props.lastmod)}</span>
            </div>
          )}
          <div class="flex flex-row items-center gap-2">
            <Icon name="tabler:clock" class="h-5 w-5" />
            <span>読了時間: 約{calculateReadingTime(props.body)}分</span>
          </div>
        </footer>
      </div>
    </div>
  )
}
