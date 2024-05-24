import { type Component } from "solid-js"
import { getThemeAtom, setTheme } from "@/lib/theme"
import { useStore } from "@nanostores/solid"
import { Button } from "@/components/ui/Button"
import { twMerge } from "tailwind-merge"

type Props = { class?: string; lightIcon?: Element; darkIcon?: Element }

export const ToggleThemeButton: Component<Props> = (props) => {
  const theme = useStore(getThemeAtom())

  return (
    <Button
      variant="ghost"
      class={twMerge("p-2 text-fg-muted transition hover:text-fg-default", props.class)}
      onClick={() => setTheme(theme() === "dark" ? "light" : "dark")}
      aria-label={theme() === "dark" ? "カラーテーマをライトに変更します" : "カラーテーマをダークに変更します"}
    >
      {theme() === "dark" ? props.darkIcon : props.lightIcon}
    </Button>
  )
}
