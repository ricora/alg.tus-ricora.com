export type RadixColor =
  | "gray"
  | "mauve"
  | "slate"
  | "sage"
  | "olive"
  | "sand"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "bronze"
  | "gold"
  | "brown"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "mint"
  | "sky"

export type RadixColorPalette<Color extends RadixColor> = {
  1: `var(--${Color}-1)`
  2: `var(--${Color}-2)`
  3: `var(--${Color}-3)`
  4: `var(--${Color}-4)`
  5: `var(--${Color}-5)`
  6: `var(--${Color}-6)`
  7: `var(--${Color}-7)`
  8: `var(--${Color}-8)`
  9: `var(--${Color}-9)`
  10: `var(--${Color}-10)`
  11: `var(--${Color}-11)`
  12: `var(--${Color}-12)`
  a1: `var(--${Color}-a1)`
  a2: `var(--${Color}-a2)`
  a3: `var(--${Color}-a3)`
  a4: `var(--${Color}-a4)`
  a5: `var(--${Color}-a5)`
  a6: `var(--${Color}-a6)`
  a7: `var(--${Color}-a7)`
  a8: `var(--${Color}-a8)`
  a9: `var(--${Color}-a9)`
  a10: `var(--${Color}-a10)`
  a11: `var(--${Color}-a11)`
  a12: `var(--${Color}-a12)`
}

export const radixColor = <Color extends RadixColor>(color: Color): RadixColorPalette<Color> =>
  new Array(12).reduce((palette, _, i) => {
    palette[i + 1] = `var(--${color}-${i + 1})`
    palette[`a${i + 1}`] = `var(--${color}-a${i + 1})`
    return palette
  }, {})
