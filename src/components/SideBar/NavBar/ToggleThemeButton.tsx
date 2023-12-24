import { type Component } from "solid-js"
import { Switch } from "@ark-ui/solid"
import { getThemeAtom, setTheme } from "@/lib/theme"
import { twMerge } from "tailwind-merge"
import { useStore } from "@nanostores/solid"

type Props = { class?: string }

export const ToggleThemeButton: Component<Props> = (props) => {
  const theme = useStore(getThemeAtom())

  return (
    <Switch.Root
      class={twMerge(
        "flex flex-row items-center gap-4 transition hover:cursor-pointer hover:drop-shadow-lg",
        props.class,
      )}
      checked={theme() === "dark"}
      onCheckedChange={(e) => setTheme(e.checked ? "dark" : "light")}
    >
      <Switch.Control class="relative flex h-6 w-10 flex-row items-center rounded-full border bg-zinc-500">
        <Switch.Thumb
          class="absolute mx-1 h-4 w-4 rounded-full bg-zinc-100 data-[state='checked']:animate-switch-to-right data-[state='unchecked']:animate-switch-to-left"
          style={{ "animation-fill-mode": "forwards" }}
        />
      </Switch.Control>
      <Switch.Label>ダークモード</Switch.Label>
    </Switch.Root>
  )
}
