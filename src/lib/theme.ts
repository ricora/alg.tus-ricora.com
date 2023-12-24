import { atom, type WritableAtom } from "nanostores"

export type Theme = "light" | "dark"

const isBrowser = typeof window !== "undefined"

/**
 * グローバル変数として保存されている`themeAtom`を取得する
 * - ブラウザでの動作：`themeAtom`はレンダリング前に必ず設定されるため、それを返す
 * - ビルド時の動作：undefinedを返す
 */
export const getThemeAtom = (): WritableAtom<Theme | undefined> => {
  if (isBrowser) return themeAtom
  return atom(undefined)
}

export const getTheme = () => getThemeAtom()?.get()
export const setTheme = (theme: Theme) => getThemeAtom()?.set(theme)
export const toggleTheme = () => setTheme(getTheme() === "dark" ? "light" : "dark")
