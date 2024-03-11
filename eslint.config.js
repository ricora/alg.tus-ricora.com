// @ts-check
import { defineFlatConfig } from "eslint-define-config"
import eslint from "@eslint/js"
import gitignore from "eslint-config-flat-gitignore"
import eslintConfigPrettier from "eslint-config-prettier"
import { FlatCompat } from "@eslint/eslintrc"
import globals from "globals"
import typescriptESLint from "@typescript-eslint/eslint-plugin"
import typescriptESLintParser from "@typescript-eslint/parser"
import astroESLintParser from "astro-eslint-parser"

/// <reference types="@eslint-types/typescript-eslint" />

const compat = new FlatCompat()

const globalConfig = defineFlatConfig([
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
      parser: typescriptESLintParser,
    },
    plugins: {
      // todo: typescript-eslintはflatConfigに未対応で型が合わないので、型を上書きしている
      /** @type {Record<string, import("eslint").ESLint.Plugin>} */
      typescriptESLint,
    },
  },
])

/** @type {import("eslint-define-config").FlatESLintConfig[]} */
//  @ts-expect-error Linter.FlatConfigをFlatESLintConfigに変換できない
const extendedConfig = compat.extends(
  "plugin:@typescript-eslint/recommended",
  "plugin:astro/recommended",
  "plugin:tailwindcss/recommended",
)

const astroConfig = defineFlatConfig({
  files: ["**/*.astro"],
  languageOptions: {
    parser: astroESLintParser,
    parserOptions: {
      parser: "@typescript-eslint/parser",
      extraFileExtensions: [".astro"],
    },
  },
})

export default defineFlatConfig([
  gitignore(),
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...extendedConfig,
  ...globalConfig,
  astroConfig,
])
