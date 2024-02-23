import { type Component } from "solid-js"
import { getThemeAtom, setTheme } from "@/lib/theme"
import { useStore } from "@nanostores/solid"
import { Switch } from "@/components/ui/Switch"

type Props = { class?: string }

export const ToggleThemeButton: Component<Props> = (props) => {
  const theme = useStore(getThemeAtom())

  return (
    <Switch
      class={props.class}
      checked={theme() === "dark"}
      onCheckedChange={(e) => setTheme(e.checked ? "dark" : "light")}
    >
      <span class="text-fg-muted">ダークモード</span>
    </Switch>
  )
}
