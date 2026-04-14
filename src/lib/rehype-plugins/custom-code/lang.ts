import type { RehypeCustomCodeOptions } from "./plugin"

/**
 * Get language from class names
 * @param classNames class names e.g. `["language-javascript"]`
 * @returns language e.g. `javascript`
 *
 * @example
 * ```ts
 * const lang = getLangFromClassNames(["language-javascript"]);
 * console.log(lang);
 * // >>> javascript
 * ```
 *
 * @example
 * ```ts
 * const lang = getLangFromClassNames(["unknown-lang"]);
 * console.log(lang);
 * // >>> undefined
 * ```
 */
export const getLangFromClassNames = (
  classNames?: string[],
  associations: RehypeCustomCodeOptions["langAssociations"] = {},
) => {
  const prefix = "language-" as const
  const lang = classNames?.find((className) => className.startsWith(prefix))?.slice(prefix.length)

  for (const [pattern, mappedLang] of Object.entries(associations)) {
    if (lang?.match(pattern)) return mappedLang
  }
  return lang
}
