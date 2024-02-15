import type { Component, JSX } from "solid-js"

export type TwoColumnProps = {
  left: JSX.Element
  right: JSX.Element
}

export const TwoColumn: Component<TwoColumnProps> = (props) => {
  return (
    <div class="flex gap-8 sm:flex-row">
      <div class="max-w-[50%] flex-1 *:*:mt-0">{props.left}</div>
      <div class="flex-1 *:*:mt-0">{props.right}</div>
    </div>
  )
}
