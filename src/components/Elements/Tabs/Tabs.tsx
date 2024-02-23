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
  return (
    <nav class="border-neutral-300 dark:border-neutral-700 flex gap-3 border-b text-sm md:text-lg">
      {props.tabs.map((tab) => {
        return (
          <span
            class={twMerge("py-2", tab.isActive ? "border-neutral-900 dark:border-neutral-100 -mb-[1px] border-b" : "")}
          >
            <a
              href={tab.href}
              class={twMerge(
                "flex flex-row gap-1 overflow-y-auto rounded-md p-2 transition hover:bg-bg-muted",
                tab.isActive ? "text-fg-default" : "text-fg-muted hover:text-fg-default",
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
