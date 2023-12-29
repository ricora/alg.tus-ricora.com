import { splitProps, type Component, type JSX } from "solid-js"
import { Portal } from "solid-js/web"
import { Tooltip as ArkTooltip, type TooltipProps as ArkTooltipProps } from "@ark-ui/solid"

type TooltipProps = {
  children: JSX.Element
  tip: string
  contentAsChild?: boolean
}
type Props = ArkTooltipProps & TooltipProps

export const Tooltip: Component<Props> = (_props) => {
  const [props, arkProps] = splitProps(_props, ["children", "tip", "contentAsChild"])

  return (
    <ArkTooltip.Root closeDelay={150} openDelay={300} {...arkProps}>
      <ArkTooltip.Trigger>{props.children}</ArkTooltip.Trigger>
      <Portal>
        <ArkTooltip.Positioner>
          <ArkTooltip.Content
            class="rounded-md border bg-card px-3 py-1 animate-in fade-in-10 slide-in-from-bottom-1"
            asChild={props.contentAsChild}
          >
            {props.tip}
          </ArkTooltip.Content>
        </ArkTooltip.Positioner>
      </Portal>
    </ArkTooltip.Root>
  )
}
