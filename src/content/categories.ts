import type { IconName } from "@/components/Elements/Icon"

export type Category = {
  title: string
  twClassName: string
  icon: IconName
}

export type Categories = Record<string, Category>

export const categories = {
  activities: {
    title: "活動記録",
    twClassName: "bg-blue-400",
    icon: "tabler:book-2",
  },
  news: {
    title: "お知らせ",
    twClassName: "bg-red-400",
    icon: "tabler:speakerphone",
  },
  works: {
    title: "作品紹介",
    twClassName: "bg-orange-400",
    icon: "tabler:sparkles",
  },
} as const satisfies Categories
