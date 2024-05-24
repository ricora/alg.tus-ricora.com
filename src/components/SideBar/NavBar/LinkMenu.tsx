import { createSignal, type Component } from "solid-js"
import type { Link as LinkType } from "./links"
import { Icon } from "@/components/Elements/Icon"
import { HoverCard } from "@ark-ui/solid"
import { twMerge } from "tailwind-merge"
import { Link } from "./Link"

export type LinkMenuProps = {
  title: string
  links: LinkType[]
}

export const LinkMenu: Component<LinkMenuProps> = (props) => {
  const [isOpen, setOpen] = createSignal(false)

  return (
    <>
      <HoverCard.Root
        open={isOpen()}
        onOpenChange={({ open }) => setOpen(open)}
        openDelay={0}
        closeDelay={100}
        positioning={{ gutter: 0 }}
      >
        <HoverCard.Trigger
          class={twMerge(
            "flex flex-row items-center gap-1 rounded-md px-3 py-2 text-fg-muted transition",
            isOpen() && "text-fg-default",
          )}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span>{props.title}</span>
          <Icon name="tabler:chevron-down" class="size-4" />
        </HoverCard.Trigger>
        <HoverCard.Positioner>
          <HoverCard.Content
            class={twMerge(
              "flex flex-col gap-0 rounded-lg border bg-bg-default p-2",
              "animate-in fade-in zoom-in-90 slide-in-from-top-2",
              !isOpen() && "hidden animate-out fade-out",
            )}
          >
            {props.links.map((link) => (
              <Link title={link.title} icon={link.icon} href={link.href} class="hover:bg-bg-muted" />
            ))}
          </HoverCard.Content>
        </HoverCard.Positioner>
      </HoverCard.Root>
    </>
  )
}
