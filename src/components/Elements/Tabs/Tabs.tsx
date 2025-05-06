import { Icon, type IconName } from "@/components/Elements/Icon"
import { type Component, For } from "solid-js"
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
    <nav class="flex gap-3 border-b border-border-default text-sm md:text-lg">
      <For each={props.tabs}>
        {(tab) => {
          return (
            <span class={twMerge("py-2", tab.isActive && "-mb-[1px] border-b border-mauve-12")}>
              <a
                href={tab.href}
                class={twMerge(
                  "flex flex-row gap-1 overflow-y-auto rounded-md p-2 transition hover:bg-bg-muted",
                  tab.isActive ? "text-fg-default" : "text-fg-muted hover:text-fg-default",
                )}
              >
                <Icon name={tab.icon} class="size-5 flex-none md:size-7" />
                <span>{tab.value}</span>
              </a>
            </span>
          )
        }}
      </For>
    </nav>
  )
}
