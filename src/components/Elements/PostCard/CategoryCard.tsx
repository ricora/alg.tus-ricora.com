import { Icon, type IconName } from "@/components/Elements/Icon"
import { getCategories, type CategoryType } from "@/lib/categories"
import { type Component } from "solid-js"
import { twMerge } from "tailwind-merge"

const categories = await getCategories()

export type CategoryCardProps = {
  id: CategoryType["id"]
}

export const CategoryCard: Component<CategoryCardProps> = (props) => {
  const category = categories.find((category) => category.id === props.id)!
  return (
    <a
      href={`/categories/${props.id}`}
      class={twMerge(
        "m-1 flex flex-row items-center gap-1 rounded-md bg-blue-400 px-2.5 py-1 text-sm font-bold text-white transition hover:brightness-110 sm:px-4 sm:text-base",
        category.data.twClassName,
      )}
    >
      <Icon name={category.data.icon as IconName} class="h-5 w-5" />
      <div>{category.data.title}</div>
    </a>
  )
}
