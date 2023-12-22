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
      "no-var": "error",
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
const extendedConfig = compat.extends("plugin:@typescript-eslint/recommended", "plugin:astro/recommended")

const astroConfig = defineFlatConfig({
  files: ["**/*.astro"],
  languageOptions: {
    parser: astroESLintParser,
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
