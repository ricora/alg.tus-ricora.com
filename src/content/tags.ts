export type Tag = {
  title: string
}

export const tags = [{ title: "Advent Calendar" }, { title: "Lightning Talk" }] as const satisfies Tag[]
