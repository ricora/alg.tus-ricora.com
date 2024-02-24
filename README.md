# alg.tus-ricora.com

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=734781265&skip_quickstart=true&geo=SoutheastAsia)


<!-- TODO: CONTRIBUTING.mdへの誘導を追加する -->

このリポジトリは[RICORA Programming Team](https://alg.tus-ricora.com/)のブログを管理するためのものです。ブログの編集やローカルでの閲覧方法についてはWikiを参照してください。

## 🤖 Tech Stack

- [Astro](https://astro.build/)
- [SolidJS](https://solidjs.com/)
- [MDX](https://mdxjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Ark UI](https://ark-ui.com/)

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
