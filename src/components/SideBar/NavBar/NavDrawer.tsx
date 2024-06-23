import type { Component, JSX } from "solid-js"
import * as Drawer from "@/components/ui/Drawer"
import { Icon } from "@/components/Elements/Icon"
import { Portal } from "solid-js/web"
import { ToggleThemeSlider } from "./ToggleThemeSlider"
import { type Link, type LinkMenu, type SocialLink } from "./links"

export type NavDrawer = {
  class?: string
  closeButtonIcon?: JSX.Element
  socialLinks?: JSX.Element
  links?: JSX.Element
}

export const NavDrawer: Component<NavDrawer> = (props) => {
  return (
    <Drawer.Root variant="left">
      <Drawer.Trigger class={props.class}>
        <div class="rounded-md p-2 text-fg-muted transition hover:bg-bg-muted hover:text-fg-default">
          <Icon name="tabler:align-right" class="size-6" />
        </div>
      </Drawer.Trigger>
      <Portal mount={document.querySelector("#modal")!}>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content class="mr-auto max-w-[80%]">
            <Drawer.Header class="flex flex-row justify-between">
              <div class="flex flex-col gap-2">
                <a href="/" class="flex flex-col gap-2">
                  <Drawer.Title>RICORA Programming Team</Drawer.Title>
                  <Drawer.Description class="block gap-2">
                    <span class="inline-block">東京理科大学&nbsp;</span>
                    <span class="inline-block">電子計算機研究会&nbsp;</span>
                    <span class="inline-block">プログラミング班</span>
                  </Drawer.Description>
                </a>
                <div class="flex flex-row gap-2 text-fg-muted">{props.socialLinks}</div>
              </div>
              <Drawer.CloseTrigger class="mb-auto rounded-lg p-2 transition hover:bg-bg-muted">
                {props.closeButtonIcon}
              </Drawer.CloseTrigger>
            </Drawer.Header>
            <Drawer.Body>{props.links}</Drawer.Body>
            <Drawer.Footer>
              <div class="mr-auto">
                <ToggleThemeSlider />
              </div>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

export const NavDrawerSocialLinks: Component<{ links: SocialLink[] }> = (props) => {
  return (
    <>
      {props.links.map((link) => (
        <a class="hover:text-fg-default" href={link.href}>
          <Icon name={link.icon} class="size-6" />
        </a>
      ))}
    </>
  )
}

export const NavDrawerLinks: Component<{ links: (Link | LinkMenu)[] }> = (props) => {
  return (
    <>
      {props.links.map((link) =>
        link.type === "menu" ? (
          <NavDrawerLinks links={link.links} />
        ) : (
          <a
            href={link.href}
            class="flex flex-row gap-4 rounded-md p-2 text-fg-muted transition hover:bg-bg-muted hover:text-fg-default"
          >
            <Icon name={link.icon} class="size-6" />
            <span>{link.title}</span>
          </a>
        ),
      )}
    </>
  )
}
