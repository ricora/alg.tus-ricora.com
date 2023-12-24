import { atom } from "nanostores"

export type Theme = "light" | "dark"

const STORAGE_KEY = "theme"

const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

const getThemePreference = (): Theme => (darkModeMediaQuery.matches ? "dark" : "light")

const getThemeFromStorage = (): Theme | undefined => {
  const theme = localStorage.getItem(STORAGE_KEY)
  if (theme === "light" || theme === "dark") return theme
  return undefined
}

const resolveTheme = (theme: Theme | undefined): Theme => {
  if (theme === "light" || theme === "dark") return theme
  return getThemePreference()
}

const writeThemeToDom = (theme: Theme) => {
  document.documentElement.setAttribute("data-theme", theme)
  if (theme === "dark") document.documentElement.classList.add(theme)
}

const saveThemeToStroge = (theme: Theme) => {
  localStorage.setItem(STORAGE_KEY, theme)
}

const initTheme = () => {
  // グローバル変数としてテーマを保持する
  theme = atom<Theme>(resolveTheme(getThemeFromStorage()))

  // テーマの変更をDOMに反映し、localStorageに保存する
  theme.subscribe((value) => {
    writeThemeToDom(value)
    saveThemeToStroge(value)
    console.log("Theme has changed to", value)
  })

  // デバイスでダークモードもしくはライトモードが有効になった場合、サイトのテーマをそれに合わせる
  darkModeMediaQuery.addEventListener("change", (event) => {
    if (event.matches) {
      theme.set("dark")
    } else {
      theme.set("light")
    }
  })
}

// TODO: ViewTransitionに対応する
initTheme()
