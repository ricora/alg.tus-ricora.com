import fs from "node:fs/promises"
import path from "node:path"
import YAML from "yaml"
import emojiList from "emojilib"

const gitRootDir = Bun.spawnSync(["git", "rev-parse", "--show-toplevel"]).stdout.toString().trim()

const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/

const renameMd2Mdx = async (dir: string) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await renameMd2Mdx(entryPath)
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      const newPath = entryPath.replace(/\.md$/, ".mdx")
      await fs.rename(entryPath, newPath)
      console.log(`Renamed ${entryPath} to ${newPath}`)
    }
  }
}

/**
 * 旧ブログにて採用されていたMarkdown記法を、新ブログのMDX記法に変換する
 * - frontmatterの`emoji: <unicode>`を`icon: fluent-emoji:<name>`に変換する
 * - `{{ linkcard url="https://example.com" }}`を、`https://example.com`に変換する
 * - `{{ slide url="https://example.com" }}`を、`https://example.com`に変換する
 */
const migrateMarkdown = async (dir: string) => {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      await migrateMarkdown(entryPath)
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      const content = await fs.readFile(entryPath, "utf-8")

      const migratedMarkdown = await migrateFrontmatter(await migrateMarkdownSyntax(content))

      console.log(`Migrated ${entryPath}`)
      await fs.writeFile(entryPath, migratedMarkdown)
    }
  }
}

/**
 * 旧ブログにて採用されていたfrontmatterを、新ブログのfrontmatterに変換する
 * - frontmatterの`emoji: <unicode>` -> `icon: fluent-emoji:<name>`
 */
const migrateFrontmatter = async (content: string) => {
  // Read frontmatter
  const frontmatterText = content.match(frontmatterRegex)?.[1]
  if (!frontmatterText) return content
  const yaml = YAML.parse(frontmatterText)

  // frontmatterの`emoji: <unicode>`を`icon: fluent-emoji:<name>`に変換する
  if (yaml.emoji) {
    const emojiUnicode: string = yaml.emoji // e.g. "1f389"
    const emojiStr = String.fromCodePoint(parseInt(emojiUnicode, 16))

    if (!(emojiStr in emojiList)) return content
    // @ts-expect-error: emojiList is not typed
    const emojiKeywords: string[] = emojiList[emojiStr]

    const emojiName = emojiKeywords[0].replaceAll("_", "-").replaceAll(" ", "-")
    yaml.icon = `fluent-emoji:${emojiName}`

    delete yaml.emoji
  }

  // Write frontmatter
  const newFrontmatterText = YAML.stringify(yaml).trim()
  const migratedContent = content.replace(frontmatterRegex, `---\n${newFrontmatterText}\n---\n`)
  return migratedContent
}

/**
 * 旧ブログにて採用されていたMarkdown記法を、新ブログのMDX記法に変換する
 * - `{{< linkcard url="https://example.com" >}}` -> `https://example.com`
 * - `{{< slide url="https://example.com" >}}`    -> `https://example.com`
 */
const migrateMarkdownSyntax = async (content: string) => {
  const linkcardRegex = /{{<\s+linkcard\s+url="(.+?)"\s+>}}/g
  const slideRegex = /{{<\s+slide\s+url="(.+?)"\s+>}}/g

  const migratedContent = content.replaceAll(linkcardRegex, "$1").replaceAll(slideRegex, "$1")
  return migratedContent
}

const main = async () => {
  const postsDir = path.join(gitRootDir, "src", "content", "posts")
  await renameMd2Mdx(postsDir)
  await migrateMarkdown(postsDir)
}
await main()
