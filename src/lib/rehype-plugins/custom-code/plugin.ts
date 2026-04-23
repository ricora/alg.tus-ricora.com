import merge from "deepmerge"
import type { Element, Root } from "hast"
import { toString as hastToString } from "hast-util-to-string"
import JSON5 from "json5"
import { createHighlighter, type CodeOptionsThemes, type HighlighterCoreOptions, type ShikiTransformer } from "shiki"
import { visit } from "unist-util-visit"
import { VFile } from "vfile"
import { getMeta, isCodeElement, isPreElement } from "./elements"
import { getLangFromClassNames } from "./lang"
import type { Meta } from "./parser"
import { getPropsKey } from "./utils"
import { defaultTransformers } from "./transformers"

export type ShikiOptions<M extends Meta = Meta> = {
  /**
   * Language names to include.
   *
   * @default Object.keys(bundledLanguages)
   * @see https://shiki.style/guide/install#fine-grained-bundle
   */
  langs?: HighlighterCoreOptions["langs"]

  /**
   * Extra meta data to pass to the highlighter
   */
  meta?: Record<string, unknown>

  /**
   * Customize the generated HTML by manipulating the hast tree.
   * You can pass custom functions to modify the tree for different types of nodes.
   *
   * @see https://shiki.style/guide/transformers
   */
  transformers?: (meta: M) => ShikiTransformer[]
}

export type RehypeCustomCodeOptions<M extends Meta = Meta> = {
  /**
   * glob pattern to language name associations.
   * - key: glob pattern
   * - value: language name. if you want not to be highlighted with shiki, set `ignore`.
   * @default {}
   * @example
   * ```ts
   * const langAssociations = {
   *   // highlight `jsx-like-lang` as `jsx`
   *   "jsx-like-lang": "jsx",
   * };
   * ```
   * Following code block will be highlighted as jsx:
   * ````md
   * ```jsx-like-lang
   * <div>Hello, World!</div>
   * ```
   * ````
   */
  langAssociations?: Record<string, string>

  /**
   * List of languages this plugin does not work in.
   * @default []
   * @example
   * ```ts
   * const options: RehypeCustomCodeOptions = {
   *   ignoreLangs: ["plaintext", "text"],
   * }
   * ```
   */
  ignoreLangs?: string[]

  /**
   * Prefix for props.
   * @default "data"
   * @example
   * ```ts
   * const options: RehypeCustomCodeOptions = {
   *   propsPrefix: "",
   * }
   * ```
   * If this option is given, the following HTML will be output:
   * ```html
   * <pre lang="javascript" title="Hello, World!" line="1-5">
   *   <!-- Some code... -->
   * </pre>
   * ```
   * `propsPrefix: ""` is useful to receive as props in React, etc.
   *
   * @example
   * ```ts
   * const options: RehypeCustomCodeOptions = {
   *   propsPrefix: "PRE",
   * }
   * ```
   * If this option is given, the following HTML will be output:
   * ```html
   * <pre pre-lang="javascript" pre-title="Hello, World!" pre-line="1-5">
   *   <!-- Some code... -->
   * </pre>
   * ```
   * given `propsPrefix` is converted to lowercase
   */
  propsPrefix?: string

  /**
   * Preprocess the meta string.
   * @default (metaString) => metaString
   */
  metaStringPreprocess?: (metaString: string) => string

  /**
   * Transform the parsed meta data.
   * @default (meta) => meta
   */
  metaDataTransform?: (meta: M) => M

  /**
   * Whether to export the code text as props.
   * This is useful when you want to use the code text in custom components.
   * @default false
   * @example
   * ```ts
   * const options: RehypeCustomCodeOptions = {
   *   shouldExportCodeAsProps: true,
   * }
   * ```
   * If this option is given, the following HTML will be output:
   * ```html
   * <pre data-code='console.log("Hello, World!");\n' ...>
   *   <!-- Some code... -->
   * </pre>
   * ```
   */
  shouldExportCodeAsProps?: boolean

  /**
   * Options for Shiki highlighter's `codeToHast` method.
   */
  codeToHastOptions?: { themes: CodeOptionsThemes; transformers: (meta: M) => ShikiTransformer[] }

  /**
   * Shiki highlighter.
   */
  highlighter: Awaited<ReturnType<typeof createHighlighter>>
}

export const defaultRehypeCustomCodeOptions = <M extends Meta = Meta>(options: RehypeCustomCodeOptions<M>) => {
  const propsPrefix = options.propsPrefix ?? "data"
  return {
    langAssociations: {},
    ignoreLangs: [],
    propsPrefix,
    shouldExportCodeAsProps: false,
    metaStringPreprocess: (metaString) => metaString,
    metaDataTransform: (meta) => meta,
    codeToHastOptions: {
      themes: {
        themes: {
          light: "github-light",
          dark: "one-dark-pro",
        },
      },
      transformers: (meta) => defaultTransformers.map((transformer) => transformer(meta, propsPrefix)),
    },
  } satisfies Required<Omit<RehypeCustomCodeOptions<M>, "highlighter">>
}

type PluginReturn = (tree: Root, file: VFile) => void

/**
 * rehype plugin to customize code blocks.
 * @param options options
 * @returns unified plugin
 *
 * @example
 * ```ts
 * import { rehypeCustomCode } from "@/lib/rehype-plugins/custom-code";
 * import { createHighlighter, bundledLanguages } from "shiki";
 *
 * const md = `
 *   \`\`\`javascript title="Hello, World!" {1-5}
 *   console.log("Hello, World!");
 *   \`\`\`
 * `;
 * const highlighter = await createHighlighter({
 *   langs: Object.keys(bundledLanguages),
 *   themes: ["github-light", "one-dark-pro"],
 * });
 *
 * const html = await unified()
 *   .use(remarkParse)
 *   .use(remarkRehype)
 *   .use(rehypeCustomCode, {
 *     highlighter,
 *   })
 *   .use(rehypeStringify)
 *   .process(md);
 *
 * console.log(html.toString());
 * ```
 */
export const rehypeCustomCode = <M extends Meta = Meta>(_options: RehypeCustomCodeOptions<M>): PluginReturn => {
  const options: Required<RehypeCustomCodeOptions<M>> = {
    ...defaultRehypeCustomCodeOptions<M>(_options),
    ..._options,
  } as const

  const highlighter = options.highlighter

  return (tree, file) => {
    visit(tree, "element", (preNode, index, parent) => {
      // check if the current node is a block code element
      if (!parent || index == null || !isPreElement(preNode)) return

      // check if the current pre node has a code element as its child
      const codeNode = preNode.children[0]
      if (!isCodeElement(codeNode) || !codeNode.properties) return
      const codeText = hastToString(codeNode.children[0]).trimEnd()

      // detect language from class names
      const lang = getLangFromClassNames(codeNode.properties.className as string[], options.langAssociations)

      // if the language is unknown or ignored, skip
      if (!lang || options.ignoreLangs.includes(lang)) return

      // get meta data
      const meta = options.metaDataTransform(getMeta<M>(codeNode, options.metaStringPreprocess))

      // get new highlighted pre node
      const newPreNode = (() => {
        try {
          const fragment = highlighter?.codeToHast(codeText, {
            lang: lang && highlighter.getLoadedLanguages().includes(lang) ? lang : "plaintext",
            transformers: options.codeToHastOptions.transformers(meta),
            ...options.codeToHastOptions.themes,
          })
          return fragment?.children[0] as Element | undefined
        } catch {
          file.fail(`failed to highlight code block: ${codeText}`)
          return undefined
        }
      })()
      if (!isPreElement(newPreNode)) return

      // merge the current pre node with the new highlighted pre node
      newPreNode.data = merge(preNode.data ?? {}, newPreNode.data ?? {})
      newPreNode.position = preNode.position
      newPreNode.properties = merge(preNode.properties ?? {}, newPreNode.properties ?? {})

      // set meta data
      newPreNode.properties[getPropsKey(options.propsPrefix, "lang")] = lang
      if (options.shouldExportCodeAsProps) {
        newPreNode.properties[getPropsKey(options.propsPrefix, "code")] = codeText
      }
      for (const [key, value] of Object.entries(meta)) {
        const propsKey = getPropsKey(options.propsPrefix, key)
        if (Array.isArray(value) || typeof value === "object") {
          newPreNode.properties[propsKey] = JSON5.stringify(value)
        } else if (value == null) {
          newPreNode.properties[propsKey] = undefined
        } else {
          newPreNode.properties[propsKey] = String(value)
        }
      }

      // replace the current pre node with the highlighted pre node which is generated by shiki
      parent.children.splice(index, 1, newPreNode as Element)
    })
  }
}
