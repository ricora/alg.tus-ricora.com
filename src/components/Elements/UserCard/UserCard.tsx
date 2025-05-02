import { For } from "solid-js"
import type { CollectionEntry } from "astro:content"
import { Icon, type IconName } from "../Icon"
import * as Tooltip from "@/components/ui/Tooltip"
import { toUnicode } from "punycode"
import type { Component } from "solid-js"

const removeProtocol = (url: string) => {
  const urlObj = new URL(url)
  return toUnicode(urlObj.host) + decodeURI(urlObj.pathname)
}

type UserCardProps = CollectionEntry<"members">

export const UserCard: Component<UserCardProps> = (props) => {
  const user = () => props.data

  return (
    <div class="flex max-w-72 flex-col items-center gap-6 rounded-xl border bg-bg-default p-8">
      <div>
        <img
          class="rounded-full bg-white"
          width="120"
          height="120"
          src={user().image}
          alt={user().name}
          loading="lazy"
        />
      </div>
      <div class="text-2xl font-bold">{user().name}</div>
      <div class="text-center text-sm text-fg-muted">{user().description}</div>
      <div class="my-auto flex flex-row gap-4">
        <For each={user().social.sort((a, b) => (!b.icon || (a.icon && a.icon < b.icon) ? -1 : 1))}>
          {(s) => (
            <Tooltip.Root>
              <Tooltip.Trigger>
                <a class="opacity-70 transition hover:opacity-100" href={s.link}>
                  {s.icon ? (
                    <Icon name={s.icon as IconName} class="size-6" />
                  ) : (
                    <Icon name="heroicons:link" class="size-6" />
                  )}
                </a>
              </Tooltip.Trigger>
              <Tooltip.Positioner>
                <Tooltip.Arrow>
                  <Tooltip.ArrowTip />
                </Tooltip.Arrow>
                <Tooltip.Content>{s.label ?? removeProtocol(s.link)}</Tooltip.Content>
              </Tooltip.Positioner>
            </Tooltip.Root>
          )}
        </For>
      </div>
    </div>
  )
}
