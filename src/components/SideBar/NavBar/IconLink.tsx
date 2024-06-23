import { Icon, type IconName } from "@/components/Elements/Icon"
import * as Tooltip from "@/components/ui/Tooltip"
import { splitProps, type ComponentProps } from "solid-js"
import { twMerge } from "tailwind-merge"

type Props = ComponentProps<"a"> & {
  name: IconName
  label: string
}

export const IconLink = (props: Props) => {
  const [iconLinkProps, aTagProps] = splitProps(props, ["name", "label", "class"])

  return (
    <Tooltip.Root closeDelay={150} openDelay={300}>
      <Tooltip.Trigger>
        <a class={twMerge("block rounded-md p-2", props.class)} {...aTagProps}>
          <Icon name={iconLinkProps.name} class="size-6 text-fg-muted transition hover:text-fg-default" />
        </a>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Arrow>
          <Tooltip.ArrowTip />
        </Tooltip.Arrow>
        <Tooltip.Content>{iconLinkProps.label}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  )
}
