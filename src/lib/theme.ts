export type Theme = "light" | "dark"

export const getTheme = () => themeAtom.get()
export const setTheme = (theme: Theme) => themeAtom.set(theme)
export const toggleTheme = () => themeAtom.set(themeAtom.get() === "dark" ? "light" : "dark")
