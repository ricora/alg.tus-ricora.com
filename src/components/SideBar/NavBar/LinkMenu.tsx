import { createEffect, createSignal, on, type Component } from "solid-js"
import type { Link as LinkType } from "./links"
import { Icon, type IconName } from "@/components/Elements/Icon"
import { HoverCard } from "@ark-ui/solid"
import { twMerge } from "tailwind-merge"

export type LinkMenuProps = {
  title: string
  icon: IconName
  links: LinkType[]
}

export const LinkMenu: Component<LinkMenuProps> = (props) => {
  const [isOpen, setOpen] = createSignal(false)
  const [hidden, setHidden] = createSignal(true)

  let timeoutToCloseMenu: NodeJS.Timeout | undefined = undefined
  createEffect(
    on(
      isOpen,
      () => {
        if (isOpen()) {
          setHidden(false)
          clearTimeout(timeoutToCloseMenu)
        } else {
          timeoutToCloseMenu = setTimeout(() => setHidden(true), 300)
          return () => clearTimeout(timeoutToCloseMenu)
        }
      },
      { defer: true },
    ),
  )

  return (
    <>
      <HoverCard.Root open={isOpen()} onOpenChange={({ open }) => setOpen(open)} openDelay={0} closeDelay={100}>
        <HoverCard.Trigger
          class={twMerge(
            "group peer flex flex-row items-center gap-1 rounded-md px-3 py-2 text-fg-muted transition",
            isOpen() && "text-fg-default",
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          <div class="flex flex-row items-center gap-2">
            <Icon name={props.icon} class="size-6" />
            <span>{props.title}</span>
          </div>
          <Icon name="tabler:chevron-down" class="size-4 transition-transform group-data-[state=open]:rotate-180" />
        </HoverCard.Trigger>
        <HoverCard.Content
          class={twMerge(
            "absolute left-0 top-16 block w-full border-b bg-bg-canvas",
            "data-[state=closed]:animate-reveal-out-to-top data-[state=open]:animate-reveal-in-from-top",
            hidden() ? "hidden" : "block",
          )}
        >
          <div class="mx-auto my-4 max-w-screen-2xl px-8">
            <ul class="flex flex-row gap-12">
              {props.links.map((link) => (
                <li class="max-w-52">
                  <a
                    class="group flex flex-col gap-3 text-fg-muted transition hover:cursor-pointer hover:text-fg-default"
                    href={link.href}
                  >
                    <div class="flex flex-row items-center gap-2">
                      <Icon name={link.icon} class="size-6" />
                      <span>{link.title}</span>
                    </div>
                    <span class="text-sm text-fg-subtle group-hover:text-fg-muted">{link.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </HoverCard.Content>
      </HoverCard.Root>
    </>
  )
}
