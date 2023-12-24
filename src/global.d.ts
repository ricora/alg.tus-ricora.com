import type { Theme } from "./layouts/MainLayout/theme"
import type { WritableAtom } from "nanostores"

declare global {
  let theme: WritableAtom<Theme>
}
