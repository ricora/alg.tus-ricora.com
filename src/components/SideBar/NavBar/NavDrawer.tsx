import type { Component, JSX } from "solid-js"
import * as Drawer from "@/components/ui/Drawer"
import { Icon } from "@/components/Elements/Icon"
import { Portal } from "solid-js/web"
import { ToggleThemeButton } from "./ToggleThemeButton"

export type NavDrawer = {
  class?: string
  closeButtonIcon?: JSX.Element
  githubIcon?: JSX.Element
  twitterIcon?: JSX.Element
  youtubeIcon?: JSX.Element
  links?: JSX.Element
}

export const NavDrawer: Component<NavDrawer> = (props) => {
  return (
    <Drawer.Root variant="left">
      <Drawer.Trigger class={props.class}>
        <div class="rounded-md p-2 text-fg-muted transition hover:bg-bg-muted hover:text-fg-default">
          <Icon name="tabler:align-right" class="h-6 w-6" />
        </div>
      </Drawer.Trigger>
      <Portal mount={document.querySelector("#modal")!}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content class="mr-auto max-w-[80%]">
            <Drawer.Header class="flex flex-row justify-between">
              <div class="flex flex-col gap-2">
                <Drawer.Title>RICORA Programming Team</Drawer.Title>
                <Drawer.Description class="block gap-2">
                  <span class="inline-block">東京理科大学&nbsp;</span>
                  <span class="inline-block">電子計算機研究会&nbsp;</span>
                  <span class="inline-block">プログラミング班</span>
                </Drawer.Description>
                <div class="flex flex-row gap-2 text-fg-muted">
                  <a class="hover:text-fg-default" href="https://github.com/RICORA/">
                    {props.githubIcon}
                  </a>
                  <a class="hover:text-fg-default" href="https://twitter.com/ricora_alg/">
                    {props.twitterIcon}
                  </a>
                  <a class="hover:text-fg-default" href="https://www.youtube.com/channel/UC4qBY_aaTvTkQ3E0PY89T2">
                    {props.youtubeIcon}
                  </a>
                </div>
              </div>
              <Drawer.CloseTrigger class="mb-auto rounded-lg p-2 transition hover:bg-bg-muted">
                <div>{props.closeButtonIcon}</div>
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>{props.links}</Drawer.Body>
            <Drawer.Footer>
              <div class="mr-auto">
                <ToggleThemeButton />
              </div>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}
