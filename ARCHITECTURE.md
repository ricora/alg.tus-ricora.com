# Architecture

## 📁 Directory Structure

| Directory                 | Description                                                                    |
| :------------------------ | :----------------------------------------------------------------------------- |
| `public`                  | そのまま公開されるファイルを格納する（favicon、フォントなど）                  |
| `src`                     | サイトのソースコードを格納する                                                 |
| `src/assets`              | サイト全体でアセットとして使われるファイルを格納する（画像など）               |
| `src/components/Elements` | サイト全体で使われるコンポーネントを定義する（ボタン、リンクカード、タブなど） |
| `src/components/SideBar`  | サイドバーのコンポーネントを定義する                                           |
| `src/components/ui`       | ParkUIによって生成されるコンポーネントを格納する                               |
| `src/content/members`     | メンバー一覧ページで使われるメンバー情報を格納する                             |
| `src/content/pages`       | `/about-us`や`/contact`などのページのMDXファイルを格納する                     |
| `src/content/posts`       | ブログ記事のMDXファイルを格納する                                              |
| `src/layouts`             | 複数ページで共通のレイアウトを定義する                                         |
| `src/lib`                 | サイト全体で使われるユーティリティ関数を定義する                               |
| `src/pages`               | ページのルーティング、データ取得、レイアウト等を定義する                       |
| `src/styles`              | サイト全体で使われるスタイルを定義する                                         |

ディレクトリ構造は、[Project Structure | Astro Docs](https://docs.astro.build/en/basics/project-structure/)や[Bulletproof React](https://github.com/alan2207/bulletproof-react)を参考にしています。

### `src/assets`

`src/assets`ディレクトリでは、サイト全体でアセットとして使われるファイルを格納します。

定義されたアセットは、利用するファイル（`*.ts`, `*.astro`等）からインポートして使うことができます。インポートの方法は、[Imports | Astro Docs](https://docs.astro.build/en/guides/imports/)を参照してください。

#### `src/assets/icons`

`src/assets/icons`ディレクトリでは、サイトで利用するアイコンを格納します。ここで定義されたアイコンは、Iconifyの [Custom icon sets](https://iconify.design/docs/icons/custom.html) として定義され、サイト全体で使えるようになります。

例えば、`src/assets/icons/brand` で定義されたアイコンは、以下のようにして使うことができます。

```astro
---
import { Icon } from "@/components/Elements/Icon"
---

<Icon name="brand:atcoder" />
```

`src/assets/icons/brand` に新たなアイコンを追加する場合は、以下の手順に従ってください。

1. `src/assets/icons/brand` に、新たなアイコンのSVGファイルを追加します。

   ```sh
   touch src/assets/icons/brand/new-icon.svg
   ```

2. `src/assets/icons/brand/index.ts` の `brandIconCollection` に、新たに追加したアイコンを登録します。

   ```diff
     // src/assets/icons/brand/index.ts
     import type { IconifyJSON } from "@iconify/iconify"
     import { getIconifyIcon } from "@/lib/iconify"
     import atcoderSvg from "./atcoder.svg?raw"
     import qiitaSvg from "./qiita.svg?raw"
     import hatenaBlogSvg from "./hatenablog.svg?raw"
     import noteSvg from "./note.svg?raw"
     import zennSvg from "./zenn.svg?raw"
     import ricoraSvg from "./ricora.svg?raw"
   + import newIconSvg from "./new-icon.svg?raw"

     export const brandIconCollection = {
       prefix: "brand",
       icons: {
         atcoder: getIconifyIcon(atcoderSvg),
         qiita: getIconifyIcon(qiitaSvg),
         hatenablog: getIconifyIcon(hatenaBlogSvg),
         note: getIconifyIcon(noteSvg),
         zenn: getIconifyIcon(zennSvg),
         ricora: getIconifyIcon(ricoraSvg),
   +     "new-icon": getIconifyIcon(newIconSvg),
       },
       width: 24,
       height: 24,
     } as const satisfies IconifyJSON
   ```

### `src/components`

`src/components`ディレクトリでは、サイト全体で使われるコンポーネントを定義します。

#### `src/components/Elements`

`src/components/Elements`ディレクトリでは、サイト全体で使われる基本的なコンポーネントを定義します。

例えば、`src/components/Elements/Icon/` ではIconifyを利用してアイコンを表示するコンポーネントを定義しています。

例として、新たに `Button` コンポーネントを追加する手順を以下に示します。

1. 新たに `src/components/Elements/Button/` ディレクトリを作成します。

   ```sh
   mkdir src/components/Elements/Button
   ```

2. `src/components/Elements/Button/Button.tsx` を作成し、`Button` コンポーネントを定義します。

   ```tsx
   // src/components/Elements/Button/Button.tsx

   import type { Component, ComponentProps } from "solid-js"

   export type ButtonProps = ComponentProps<"button">

   export const Button: Component<ButtonProps> = (props) => {
     return <button {...props} />
   }
   ```

3. `src/components/Elements/Button/index.ts` を作成し、`Button` コンポーネントをエクスポートします。

   ```ts
   // src/components/Elements/Button/index.ts

   export { Button, ButtonProps } from "./Button"
   ```

#### `src/components/SideBar`

`src/components/SideBar`ディレクトリでは、サイドバーのコンポーネントを定義します。

例えば、`src/components/SideBar/NavBar/` では、画面左側に表示されるナビゲーションバーを定義しています。

#### `src/components/ui`

`src/components/ui` ディレクトリでは、ParkUIによって生成されるコンポーネントを格納します。

例として、新たに [Button](https://park-ui.com/docs/panda/components/button) コンポーネントを追加する手順を以下に示します。
基本的には、[Button | Park UI](https://park-ui.com/docs/panda/components/button) のインストール手順に従えば良いです。

1. [Installation](https://park-ui.com/docs/panda/components/button#installation) に記載されているスニペットを、`src/components/ui` ディレクトリ内の適切なファイルにコピーします。

   ```tsx
   // src/components/ui/Button.tsx

   import { type HTMLArkProps, ark } from "@ark-ui/solid"
   import { splitProps } from "solid-js"
   import { type VariantProps, tv } from "tailwind-variants"

   export interface ButtonProps extends ButtonVariantProps, HTMLArkProps<"button"> {}

   export const Button = (props: ButtonProps) => {
     const [variantProps, buttonProps] = splitProps(props, ["class", "size", "variant"])
     return <ark.button class={styles(variantProps)} {...buttonProps} />
   }

   type ButtonVariantProps = VariantProps<typeof styles>

   const styles = tv(
     {
       base: "button",
       defaultVariants: { variant: "solid", size: "md" },
       variants: {
         variant: {
           solid: "button--variant_solid",
           outline: "button--variant_outline",
           ghost: "button--variant_ghost",
           link: "button--variant_link",
           subtle: "button--variant_subtle",
         },
         size: {
           xs: "button--size_xs",
           sm: "button--size_sm",
           md: "button--size_md",
           lg: "button--size_lg",
           xl: "button--size_xl",
           "2xl": "button--size_2xl",
         },
       },
     },
     { twMerge: false },
   )
   ```

### `src/content`

`src/content`ディレクトリでは、サイトのコンテンツを格納します。

詳しくは [Content Collections | Astro Docs](https://docs.astro.build/en/guides/content-collections/) を参照してください。

#### `src/content/posts`

`src/content/posts`ディレクトリでは、ブログ記事のMDXファイルを格納します。

ディレクリ構造はそのままルーティングに反映されます。
例えば、`src/content/posts/hello-world-2024/index.mdx`は`/posts/hello-world-2024`に対応します。

各MDXファイルで利用できる文法については [本サイトで利用可能なMDX記法一覧 | RICORA Programming Team](https://alg.tus-ricora.com/mdx-guide/) を参照してください。

#### `src/content/members`

`src/content/members`ディレクトリでは、メンバー一覧ページで使われるメンバー情報を格納します。

メンバー情報はYAMLファイルで定義され、以下のような構造を持ちます。
なお、ファイル名はGitHubのIDと一致するようにしてください。

```yaml
# src/content/members/r4ai.yaml
name: Rai
description: 情報計算科学科。普段はWeb開発をしています。最近はRustを使ったコンパイラ開発やゲーム制作に興味があります。
image: https://avatars.githubusercontent.com/u/96561881
social:
  - link: https://r4ai.dev/
  - icon: simple-icons:github
    link: https://github.com/r4ai
  - icon: brand:zenn
    link: https://zenn.dev/t4aru
  - icon: simple-icons:bluesky
    link: https://bsky.app/profile/r4ai.dev
joined_year: 2022
```

また、YAMLファイル内で利用可能なプロパティは以下の通りです。

| プロパティ名  | 必須 | 型                     | 説明                     |
| :------------ | :--- | :--------------------- | :----------------------- |
| `name`        | ⭕   | 文字列                 | 名前                     |
| `description` | ⭕   | 文字列                 | 簡単な自己紹介           |
| `image`       | ⭕   | 文字列（URL）          | アイコン画像のURL        |
| `social`      | ⭕   | ソーシャルリンクの配列 | ソーシャルリンクのリスト |

`social` プロパティの各要素（ソーシャルリンク）は以下のプロパティを持ちます。

| プロパティ名 | 必須 | 型                                        | 説明                                   |
| :----------- | :--- | :---------------------------------------- | :------------------------------------- |
| `label`      | ❌   | 文字列                                    | ソーシャルリンクのラベル               |
| `icon`       | ❌   | [文字列（Iconifyのアイコン名）](#iconify) | ソーシャルリンクの[アイコン](#iconify) |
| `link`       | ⭕   | 文字列（URL）                             | リンク先のURL                          |

#### `src/content/pages`

`src/content/pages`ディレクトリでは、記事以外のページのコンテンツを格納します。

例えば、`src/content/pages/about/index.mdx`は`/about`に対応します。

### `src/layouts`

`src/layouts`ディレクトリでは、複数ページで共通のレイアウトを定義します。

- `src/layouts/BaseLayout`: すべてのページで共通のレイアウト
- `src/layouts/PostLayout`: ブログ記事ページで利用するレイアウト
- `src/layouts/PageLayout`: ブログ記事以外のページ（`/about`, `/mdx-guide`等）で利用するレイアウト

### `src/lib`

`src/lib`ディレクトリでは、サイト全体で使われるユーティリティ関数を定義します。

例えば、`src/lib/remark-plugins/` ではMDXに独自の文法を追加するためのRemarkプラグインを定義しています。

### `src/pages`

`src/pages`ディレクトリでは、各ページのルーティング、データ取得、レイアウト等を定義します。

ルーティングはファイルベースで行われます。例えば、`src/pages/index.astro`は`/`に、`src/pages/about.astro`は`/about`に対応します。
各`index.astro`ファイルでは、そのページのレイアウトや使用するデータの取得を行います。

詳しくは [Pages | Astro Docs](https://docs.astro.build/en/basics/astro-pages/) を参照してください。

### `src/styles`

`src/styles`ディレクトリでは、サイト全体で使われるスタイルを定義します。

例えば、`src/styles/global.css`はサイト全体で使われるグローバルスタイルを定義しています。また、`src/styles/radix-color.css`はRadix Colorsのカラーシステムを読み込み、サイト全体で使えるようにしています。

## 😄 Iconify

Iconifyは、様々なアイコンを提供するフレームワークです。本サイトでは、Iconifyを利用してアイコンを表示しています。

利用可能なアイコン名は [Icônes](https://icones.js.org/) 等で検索できます。

### アイコンの表示

以下はSimple IconsのGitHubアイコンを表示する例です。
`<collection>:<icon-name>` の形式でアイコン名を指定します。

```astro
---
import { Icon } from "@/components/Elements/Icon"
---

<Icon name="simple-icons:github" />
```

### `alg.tus-ricora.com` でのみ利用可能なアイコン

`alg.tus-ricora.com` では、Iconifyに登録されていないアイコンを利用するために、独自のアイコンコレクションを定義しています。
現在、以下のコレクションが利用可能です。

- `brand`: 有名なサービスのロゴなど

#### `brand` コレクション

`brand` コレクションで利用可能なアイコンについては、[`src/assets/icons/brand`](/src/assets/icons/brand) を参照してください。
