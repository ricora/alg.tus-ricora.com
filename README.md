# alg.tus-ricora.com

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=734781265&skip_quickstart=true&geo=SoutheastAsia)

<!-- TODO: CONTRIBUTING.mdへの誘導を追加する -->

このリポジトリでは[RICORA Programming Team](https://alg.tus-ricora.com/)のWebサイトを管理しています。

## 🤖 Tech Stack

- **Meta-Framework**:
  - [**Astro**](https://astro.build/) - Static Site Generator
- **Framework**:
  - [**SolidJS**](https://solidjs.com/) - UI Framework
- **Component Library**:
  - [**Ark UI**](https://ark-ui.com/) - Headless UI Component Library
  - [**Park UI**](https://park-ui.com/) - Styled UI Component Library powered by Ark UI
- **Styling**:
  - [**Tailwind CSS**](https://tailwindcss.com/) - Utility-First CSS Framework
  - [**Radix Colors**](https://radix-ui.com/colors) - Color System
  - [**PostCSS**](https://postcss.org/) - CSS Post-Processor
- **Content Rendering**:
  - [**unified**](https://unifiedjs.com/) - Eco-system for processing content (used for rendering MDX)
  - [**KaTeX**](https://katex.org/) - Math typesetting library
  - [**shiki**](https://shiki.style/) - Syntax Highlighter
- **Language**:
  - [**TypeScript**](https://www.typescriptlang.org/) - JavaScript with syntax for types
  - [**MDX**](https://mdxjs.com/) - Markdown for the component era (used for writing blog posts)
  - [**YAML**](https://yaml.org/) - Human friendly data serialization standard
- **Runtime**:
  - [**Bun**](https://bun.sh/) - JavaScript all-in-one toolkit (used for package management, task running, testing, and more)
  - [**Node.js**](https://nodejs.org/) - JavaScript runtime
- **Other**:
  - [**pagefind**](https://pagefind.app/) - Static search library
  - [**nanostores**](https://github.com/nanostores/nanostores) - State management library
  - [**iconify**](https://iconify.design/) - Universal icon framework
  - [**unfurl**](https://github.com/jacktuck/unfurl) - Metadata scraper
  - [**satori**](https://github.com/vercel/satori) - Library to generate images from HTML and CSS
  - [**sharp**](https://sharp.pixelplumbing.com/) - Image processing library
  - [**budoux**](https://github.com/google/budoux) - Line break organizer tool

## 🎉 Features

### Blog

`src/content/posts/`にあるMDXファイルを基に、ブログ記事を生成します。

生成したブログ記事は、[alg.tus-ricora.com/posts](https://alg.tus-ricora.com/posts)にて公開されます。

利用可能なMDX記法については、[alg.tus-ricora.com/mdx-guide](https://alg.tus-ricora.com/mdx-guide)を参照してください。

### About us

`src/content/pages/about-us/`にあるMDXファイルを基に、サークルの紹介ページを[alg.tus-ricora.com/about-us](https://alg.tus-ricora.com/about-us)にて公開します。

### Members

`src/content/members/`にあるYAMLファイルを基に、サークルのメンバー一覧ページを[alg.tus-ricora.com/members](https://alg.tus-ricora.com/members)にて公開します。

### Contact

`src/content/pages/contact/`にあるMDXファイルを基に、お問い合わせページを[alg.tus-ricora.com/contact](https://alg.tus-ricora.com/contact)にて公開します。

### Links

`src/content/pages/links/`にあるMDXファイルを基に、サークルのリンク集ページを[alg.tus-ricora.com/links](https://alg.tus-ricora.com/links)にて公開します。

### Search

[pagefind](https://pagefind.app/)を利用して、サイト内の検索を実装しています。左側サイドバーから検索ボタンを押すか、<kbd>Ctrl</kbd> + <kbd>K</kbd>を押すことで検索を開始できます。
