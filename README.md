# alg.tus-ricora.com (WIP)

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=734781265&skip_quickstart=true&geo=SoutheastAsia)

> [!WARNING]
> このリポジトリは現在開発中です。

<!-- TODO: Wikiのリンクを張る -->

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

## 💻 Development

### 🧰 Prerequirements

- [Bun](https://bun.sh/)
  - JavaScriptランタイム
  - 必要バージョン：[`.tool-versions`](./.tool-versions)を参照

<!-- prettier-ignore -->
> [!TIP]
> [mise](https://github.com/jdx/mise)や[asdf](https://asdf-vm.com/)といったバージョン管理ツールを利用すると、[`.tool-versions`](./.tool-versions)に記載されたバージョンのBunを簡単にインストールすることができます。

### 🚀 Getting Started

1. このリポジトリをクローンする

   ```sh
   git clone https://github.com/ricora/alg.tus-ricora.com.git
   ```

2. 依存関係をインストールする

   ```sh
   bun install
   ```

3. ビルドする

   ```sh
   bun run build
   ```

   ビルドした成果物は`./dist/`に保存されます。

   このコマンドは、TypeScriptの型チェックとサイトのビルドを行います。これらを個別に行いたい場合は、`bun run astro check`と`bun run astro build`をそれぞれ実行してください。

4. 開発サーバーを立ち上げる

   ```sh
   bun run dev
   ```

   開発サーバーはデフォルトで`localhost:4321`で立ち上がります。

   > [!WARNING]
   > 開発サーバーを立ち上げる前に、ビルドを一度行ってください。  
   > ビルド時に検索用インデックスを生成するため、一度ビルドをしないと検索エンジンとして利用している[pagefind](https://pagefind.app/)が正しく動作しません。

5. テストを実行する

   ```sh
   bun run test
   ```

   テストには[bun test](https://bun.sh/docs/cli/test)を利用しているため、単に`bun test`としても実行できます。

6. ビルドした成果物をプレビューする

   ```sh
   bun run preview
   ```

### 🧞 Commands

全てのコマンドは、ターミナル上でプロジェクトのルートディレクトリから実行してください:

| Command                   | Action                                                |
| :------------------------ | :---------------------------------------------------- |
| `bun install`             | 依存関係をインストールする                            |
| `bun run dev`             | 開発サーバーを`localhost:4321`で立ち上げる            |
| `bun run build`           | `./dist/`へプロジェクトをビルドする                   |
| `bun run test`            | テストを実行する                                      |
| `bun run preview`         | ビルドした成果物をローカルサーバーでプレビューする    |
| `bun run astro ...`       | `astro add`, `astro check`といったAstro CLIを実行する |
| `bun run astro -- --help` | Astro CLIの使い方を見る                               |
