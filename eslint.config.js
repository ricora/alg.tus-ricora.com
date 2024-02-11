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
import * as mdx from "eslint-plugin-mdx"

/// <reference types="@eslint-types/typescript-eslint" />

const isFix = process.argv.findIndex((arg) => arg.startsWith("--fix")) !== -1

const compat = new FlatCompat()

const globalConfig = defineFlatConfig([
  {
    rules: {
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
const extendedConfig = compat.extends("plugin:@typescript-eslint/recommended", "plugin:astro/recommended")

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

// todo: auto-fixで出力されるMDXが壊れているため、簡易的な対応として自動修正を無効化している。恐らくASTからMDXへの変換の際に問題が発生していると思われる
/** @type {import("eslint-define-config").FlatESLintConfig[]} */
const mdxConfig = isFix
  ? []
  : // @ts-expect-error: eslint-mdxはeslint-define-configに対応していない
    // @see https://github.com/mdx-js/eslint-mdx/issues/526
    defineFlatConfig([
      {
        ...mdx.flat,
        processor: mdx.createRemarkProcessor({
          lintCodeBlocks: false,
          languageMapper: {},
        }),
      },
      {
        ...mdx.flatCodeBlocks,
        rules: {
          ...mdx.flatCodeBlocks.rules,
        },
      },
    ])

export default defineFlatConfig([
  gitignore(),
  eslint.configs.recommended,
  eslintConfigPrettier,
  ...extendedConfig,
  ...globalConfig,
  astroConfig,
  ...mdxConfig,
])
