// @ts-check

/** @type {import("lint-staged").Config} */
export default {
  "*.{js,cjs,ts,jsx,tsx,astro}": ["eslint --fix", "prettier --write"],
  "*.{md,html,json,yaml,yml}": ["prettier --write"],
}
