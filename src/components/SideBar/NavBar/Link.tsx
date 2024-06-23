import { Icon, type IconName } from "@/components/Elements/Icon"
import { splitProps, type Component, type ComponentProps } from "solid-js"
import { twMerge } from "tailwind-merge"

export type LinkProps = ComponentProps<"a"> & {
  title: string
  icon?: IconName
  href: string
}

export const Link: Component<LinkProps> = (_props) => {
  const [props, aTagProps] = splitProps(_props, ["title", "icon", "href", "class"])
  return (
    <a
      href={props.href}
      class={twMerge(
        "flex flex-row gap-2 rounded-md px-3 py-2 text-fg-muted transition hover:text-fg-default",
        props.class,
      )}
      {...aTagProps}
    >
      {props.icon && <Icon name={props.icon} class="size-6" />}
      <span>{props.title}</span>
    </a>
  )
}
