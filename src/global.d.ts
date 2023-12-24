import type { Theme } from "@/lib/theme"
import type { WritableAtom } from "nanostores"

declare global {
  let themeAtom: WritableAtom<Theme>
}
