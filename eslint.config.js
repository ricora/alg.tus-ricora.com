// @ts-check
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import gitignore from "eslint-config-flat-gitignore"
import eslintConfigPrettier from "eslint-config-prettier"
import globals from "globals"
import typescriptESLintParser from "@typescript-eslint/parser"
import astroESLintParser from "astro-eslint-parser"
// @ts-expect-error eslint-plugin-tailwindcss doesn't have typescript types: https://github.com/francoismassart/eslint-plugin-tailwindcss/issues/371
import tailwind from "eslint-plugin-tailwindcss"
import astro from "eslint-plugin-astro"

const globalConfig = tseslint.config(
  gitignore(),
  eslint.configs.recommended,
  eslintConfigPrettier,
  tseslint.configs.recommended,
  ...tailwind.configs["flat/recommended"],
  {
    rules: {
      "no-console": "error",
      "no-var": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          // AstroではPropsという名前の型を暗黙的にpropsの型として利用するため、未使用でもエラーを表示しない
          varsIgnorePattern: "(Props)|(^_)",
          argsIgnorePattern: "^_",
        },
      ],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
)

const astroConfig = tseslint.config(...astro.configs.recommended, {
  files: ["**/*.astro"],
  languageOptions: {
    parser: astroESLintParser,
    parserOptions: {
      parser: typescriptESLintParser,
      extraFileExtensions: [".astro"],
    },
  },
})

export default tseslint.config(...globalConfig, ...astroConfig)
