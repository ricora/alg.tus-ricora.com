import { Icon, type IconName } from "@/components/Elements/Icon"
import { type Component } from "solid-js"
import { twMerge } from "tailwind-merge"

export type TabsProps = {
  tabs: {
    value: string
    icon: IconName
    href: string
    isActive?: boolean
  }[]
}

export const Tabs: Component<TabsProps> = (props) => {
  console.log(props)

  return (
    <nav class="flex gap-3 border-b border-gray-300 text-sm md:text-lg dark:border-gray-700">
      {props.tabs.map((tab) => {
        return (
          <span class={twMerge("py-2", tab.isActive ? "-mb-[1px] border-b border-gray-900 dark:border-gray-100" : "")}>
            <a
              href={tab.href}
              class={twMerge(
                "flex flex-row gap-1 overflow-y-auto rounded-md p-2 transition hover:bg-muted",
                tab.isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon name={tab.icon} class="h-5 w-5 flex-none md:h-7 md:w-7" />
              <span>{tab.value}</span>
            </a>
          </span>
        )
      })}
    </nav>
  )
}
