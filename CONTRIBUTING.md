# Contribution Guide

このドキュメントは、alg.tus-ricora.com への貢献を行うためのガイドラインです。

> [!CAUTION]
> 現在執筆途中の個所があります。
> 一部の情報が不足している可能性がありますので、ご了承ください。

## Table of Contents

- [Contribution Guide](#contribution-guide)
  - [Table of Contents](#table-of-contents)
  - [Issueを作成する](#issueを作成する)
    - [Issueを開く](#issueを開く)
      - [Issueのタイトル](#issueのタイトル)
      - [Issueの本文](#issueの本文)
        - [記事の提案](#記事の提案)
        - [バグ報告](#バグ報告)
        - [機能の提案](#機能の提案)
  - [Pull Requestを作成する](#pull-requestを作成する)
    - [コード変更のための前準備](#コード変更のための前準備)
      - [Forkをする方法](#forkをする方法)
      - [Cloneをする方法](#cloneをする方法)
      - [Featureブランチを切る方法](#featureブランチを切る方法)
    - [開発環境の構築](#開発環境の構築)
      - [ローカル環境で開発を行う](#ローカル環境で開発を行う)
      - [GitHub Codespacesで開発を行う](#github-codespacesで開発を行う)
    - [記事を執筆する](#記事を執筆する)
      - [1. 記事の執筆](#1-記事の執筆)
      - [2. 記事のプレビュー](#2-記事のプレビュー)
    - [機能を開発する](#機能を開発する)
      - [例: リンク一覧にconnpassを追加する](#例-リンク一覧にconnpassを追加する)
    - [メンバー一覧に自分の情報を追加する](#メンバー一覧に自分の情報を追加する)
    - [Pull Requestを開く](#pull-requestを開く)
      - [Pull Requestのタイトル](#pull-requestのタイトル)
      - [Pull Requestの本文](#pull-requestの本文)
    - [Reviewを受ける](#reviewを受ける)
      - [Reviewの承認後](#reviewの承認後)
  - [付録](#付録)
    - [コマンド](#コマンド)
      - [依存関係のインストール](#依存関係のインストール)
      - [ビルド](#ビルド)
      - [開発サーバーの起動](#開発サーバーの起動)
      - [テスト](#テスト)
      - [プレビューサーバーの起動](#プレビューサーバーの起動)

## Issueを作成する

本リポジトリでは、タスク管理のために GitHub Issues を利用しています。以下の目的に応じて Issue を作成してください。

- 記事の提案 (新規記事の追加)
  - 例: [#282](https://github.com/ricora/alg.tus-ricora.com/issues/282), [#283](https://github.com/ricora/alg.tus-ricora.com/issues/283)
- バグ報告 (既存の記事の修正、機能の修正)
  - 例: [#82](https://github.com/ricora/alg.tus-ricora.com/issues/82), [#202](https://github.com/ricora/alg.tus-ricora.com/issues/202)
- 機能の提案 (新機能の追加、既存機能の改修)
  - 例: [#28](https://github.com/ricora/alg.tus-ricora.com/issues/28), [#191](https://github.com/ricora/alg.tus-ricora.com/issues/191), [#232](https://github.com/ricora/alg.tus-ricora.com/issues/232), [#242](https://github.com/ricora/alg.tus-ricora.com/issues/242)
- その他 (質問、議論、依存関係の更新)

自分自身でPull Requestを作成する場合でも、対応するIssueを作成することを推奨します。

### Issueを開く

Issueを作成する前に同様のIssueが既に存在しないかをよく確認し、さらに次のことに注意してください。

#### Issueのタイトル

タイトルはわかりやすく簡潔に、誤解が生じないように記述してください。

#### Issueの本文

##### 記事の提案

記事を追加する場合は、以下の内容を明確に記載してください。

- 目的
- 記事の概要

##### バグ報告

バグ報告をする場合は、以下の内容を明確に記載してください。

- 現状の問題点 (as is)
  - 問題が発生する環境
  - 問題が発生する条件
- 望ましい状態 (to be)

##### 機能の提案

新機能の追加や改修の提案をする場合は、以下の内容を明確に記載してください。

- 現状の問題点 (as is)
- 提案内容 (to be)
- メリットとデメリット
- 移行の計画

## Pull Requestを作成する

文章。

一つのPull Requestは一つの機能追加やバグ修正に対応します。一度のPull Requestで複数の機能追加やバグ修正を行うことは避けてください。

### コード変更のための前準備

#### Forkをする方法

[GitHubのリポジトリ](https://github.com/ricora/alg-blog)の右上にある「Fork」ボタンをクリックして、自分のアカウントにこのリポジトリをフォークしてください。

![Forkボタンの場所](https://github.com/ricora/alg.tus-ricora.com/assets/96561881/3667c988-4867-40a3-8f5f-52c787de32e4)

![新たなForkを作成する](https://github.com/ricora/alg.tus-ricora.com/assets/96561881/02983e3e-9da7-47ff-bcfc-c31aff489c19)

#### Cloneをする方法

次に、Forkしたリポジトリをローカルにクローンしてください。

ターミナルを開いて、以下のコマンドを実行してください。

```sh
git clone https://github.com/<あなたのユーザー名>/alg.tus-ricora.com.git
```

`<あなたのユーザー名>` には、ご自身のGitHubのユーザー名に置き換えてください。

例：

```sh
git clone https://github.com/r4ai/alg.tus-ricora.com.git
```

#### Featureブランチを切る方法

まずは、クローンしたリポジトリのディレクトリに移動してください。

```sh
cd alg.tus-ricora.com
```

次に、Featureブランチを切ってください。

```sh
git switch -c feature/<機能名>
```

`<機能名>` には、追加する機能や修正する内容を簡潔に記述してください。
例えば、`feature/add-schedule-component` や `feature/issue-123` などです。

例：

```sh
git switch -c feature/add-schedule-component
```

> [!NOTE]
> Featureブランチにおけるコミットは最終的にはSquash and mergeによってPR単位でまとめられますが、コミットの粒度やメッセージの内容は適切に保つようにしてください。

### 開発環境の構築

このリポジトリではJavaScriptランタイムとして[Node.js](https://nodejs.org/)を、パッケージ管理ツールとして[Bun](https://bun.sh/)を利用しています。
開発に必要なバージョンは[`.tool-versions`](./.tool-versions)を参照してください。

詳しい導入方法が分からない場合は、[GitHub Codespacesで開発を行う](#github-codespacesで開発を行う)から始めることをお勧めします。こちらの方法では、全自動で開発環境が構築されるため、[ローカル環境で開発を行う](#ローカル環境で開発を行う)に比べて簡単です。

#### ローカル環境で開発を行う

このリポジトリではJavaScriptランタイムとして[Node.js](https://nodejs.org/)を、パッケージ管理ツールとして[Bun](https://bun.sh/)を利用しています。

したがって、開発には[`.tool-versions`](./.tool-versions)に記載されたバージョンのNode.jsとBunが必要です。

<!-- prettier-ignore -->
> [!TIP]
> 直接Node.jsとBunを公式サイトからインストールすることも可能ですが、バージョン管理が面倒になるため、[mise](https://github.com/jdx/mise)や[asdf](https://asdf-vm.com/)といったバージョン管理ツールを利用することを推奨します。

ここでは、バージョン管理ツールとして [mise](https://mise.jdx.dev/) を利用した場合の手順を説明します。

1. **[mise](https://mise.jdx.dev/)のインストール**

   miseをインストールするために、次のコマンドを実行してください。

   ```sh
   curl https://mise.run | sh
   ```

   続いて、miseを有効化するために、利用しているシェルに応じて次のコマンドを実行してください。

   - bashの場合：

     ```sh
     echo 'eval "$(mise activate bash)"' >> ~/.bashrc
     ```

   - zshの場合：

     ```sh
     echo 'eval "$(mise activate zsh)"' >> ~/.zshrc
     ```

   - fishの場合：

     ```sh
     echo 'mise activate fish | source' >> ~/.config/fish/config.fish
     ```

   さらに、miseのパスを通すために、利用しているシェルに応じて次のコマンドを実行してください。

   - bashの場合：

     ```sh
     echo 'export PATH="$HOME/.local/share/mise/shims:$PATH"' >> ~/.bash_profile
     ```

   - zshの場合：

     ```sh
     echo 'export PATH="$HOME/.local/share/mise/shims:$PATH"' >> ~/.zprofile
     ```

   - fishの場合：

     ```sh
     fish_add_path ~/.local/share/mise/shims
     ```

   詳しいインストール方法については、[Getting Started | mise-en-place](https://mise.jdx.dev/getting-started.html#quickstart)を参照してください。

2. **[mise](https://mise.jdx.dev/)を利用したNode.jsとBunのインストール**

   以下のコマンドを実行して、[`.tool-versions`](./.tool-versions)に記載されたバージョンのNode.jsとBunをインストールしてください。

   ```sh
   mise install
   ```

3. **依存関係のインストール**

   依存関係をインストールするために、次のコマンドを実行してください。

   ```sh
   bun install
   ```

   これにより、依存関係がインストールされ、開発環境が整います。

   この他のコマンドについては、[付録/コマンド](#コマンド)を参照してください。

#### GitHub Codespacesで開発を行う

次のボタンをクリックして、GitHub Codespacesで開発環境を構築してください。

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=734781265&skip_quickstart=true&geo=SoutheastAsia)

このボタンをクリックすると、ブラウザ上で開発環境が構築されます。`.tool-versions`に記載されたバージョンのNode.jsとBunが自動的にインストールされるため、すぐに開発を始められます。

起動後は、ターミナルを開いて以下のコマンドを一度実行してください。

```sh
bun install
```

これにより、依存関係がインストールされ、開発環境が整います。

この他のコマンドについては、[付録/コマンド](#コマンド)を参照してください。

### 記事を執筆する

#### 1. 記事の執筆

まずは、記事を執筆します。記事は、[`src/content/posts`](./src/content/posts/)ディレクトリ下にMDXファイルとして保存します。

例えば、`https://alg.tus-ricora.com/posts/first-contributions/`というURLでアクセスできる記事を追加したい場合は、`src/content/posts/first-contributions/index.mdx`というファイルを作成します。

以下は、記事のMDXファイルの例です。

```mdx
---
title: はじめての貢献
date: 2024-05-25T00:00:00+09:00
categories:
  - news
tags:
  - 雑記
icon: fluent-emoji:building-construction
---

alg.tus-ricora.com への貢献に興味を持っていただき、ありがとうございます！

この記事があなたの貢献の第一歩となることを願っています。
```

詳しいMDXの記法については、[本サイトで利用可能なMDX記法一覧 | RICORA Programming Team](https://alg.tus-ricora.com/mdx-guide/)を参照してください。

#### 2. 記事のプレビュー

記事を執筆したら、記事が正しく表示されるかどうかを確認します。

以下のコマンドを実行して、開発サーバーを起動してください。

```sh
bun run dev
```

開発サーバーはデフォルトでは[http://localhost:4321/](http://localhost:4321/)で起動します。

先ほど作成した`src/content/posts/first-contributions/index.mdx`を閲覧するには、[http://localhost:4321/posts/first-contributions/](http://localhost:4321/posts/first-contributions/)にアクセスしてください。

### 機能を開発する

いくつかの機能を開発する例を示します。
開発に際しては、このリポジトリの[アーキテクチャ](./ARCHITECTURE.md)を軽く把握しておくことをお勧めします。

#### 例: リンク一覧にconnpassを追加する

例として、[#293](https://github.com/ricora/alg.tus-ricora.com/issues/293)を解決するために、リンク一覧にconnpassを追加する方法を説明します。

まず、`/links`ページの内容は[`src/content/pages/links/index.mdx`](./src/content/pages/links/index.mdx)で記述されています。これは、記事以外の多くのページのコンテンツは[`src/content/pages`]下にて管理されているためです。したがって、`/links`ページにconnpassのリンクを追加するには、このファイルを編集する必要があります。

実際に、`src/content/pages/links/index.mdx`を編集して、connpassのリンクを追加します。

```diff
  ---
  title: リンク
  draft: false
  links:
    - title: RICORA
      description: Music TeamとProgramming Teamを合わせた、RICORA全体のホームページです。
      website: https://tus-ricora.com
      image: https://github.com/ricora.png

    - title: RICORA Music Team
      description: RICORA Music Teamのホームページです。
      website: https://music.tus-ricora.com
      image: https://github.com/ricora.png

    - title: GitHub
      description: RICORA Programming TeamのGitHubリポジトリです。
      website: https://github.com/RICORA
      image: https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png

    - title: Twitter
      description: RICORA Programming Teamの公式Twitterです。
      website: https://twitter.com/ricora_alg
      image: https://abs.twimg.com/responsive-web/client-web-legacy/icon-ios.b1fc7275.png

    - title: YouTube
      description: RICORA Programming TeamのYouTubeチャンネルです。
      website: https://www.youtube.com/channel/UC4qBY_aaTvTkQ3E0PY89T2A
      image: https://lh3.googleusercontent.com/KhY28aTw30hEJXooMF-_rQqwMIIqofFvasbZJtEpvlgHQwLXKP3KW0OoCTtoYpDNn_U=w128


+   - title: connpass
+     description: RICORA Programming Teamのconnpassページです。
+     website: https://ricora.connpass.com/
+     image: https://connpass.com/static/img/468_468.png

    - title: Wiki
      description: RICORA Programming Teamの部員向け技術メモ置き場です。
      website: https://alg-wiki.tus-ricora.com/
      image: https://github.com/ricora.png

    - title: Slides
      description: RICORA Programming Teamの部員向けスライド資料置き場です。
      website: https://alg-slides.tus-ricora.com/
      image: https://github.com/ricora.png

    - title: 東京理科大学
      description: 東京理科大学のホームページです。
      website: https://www.tus.ac.jp/
      image: https://www.tus.ac.jp/about/university/symbol/img/symbole03.jpg

    - title: 神楽坂一丁目通信局 かぐちょ
      description: 神楽坂キャンパスを拠点に活動されている神楽坂一丁目通信局 かぐちょのホームページです。
      website: https://kagucho.net/
      image: https://kagucho.net/ico/safari-pinned-tab.svg

    - title: 情報技術クラブ ITC
      description: 葛飾キャンパスを拠点に活動されている情報技術クラブ ITCのホームページです。
      website: https://tusitclub.net/
      image: https://tusitclub.net/favicon.ico
  ---
```

続いて、開発サーバーを起動して、`/links`ページにconnpassのリンクが表示されるかどうかを確認します。

```sh
bun run dev
```

ブラウザ上で、[http://localhost:4321/links/](http://localhost:4321/links/)にアクセスし、connpassのリンクが表示されていることを確認してください。

変更が正しく反映されていることを確認したら、この変更をコミットしてください。

```sh
git add src/content/pages/links/index.mdx
git commit -m "feat: `/links`ページにconnpassへのリンクを追加"
```

そして、この変更をリモートリポジトリにプッシュしてください。

```sh
git push origin <feature-branch>
```

`<feature-branch>` には、[featureブランチを切る方法](#featureブランチを切る方法)で作成したブランチ名を指定してください。

例：

```sh
git push origin feature/add-connpass-link
```

### メンバー一覧に自分の情報を追加する

メンバー一覧に自分の情報を追加する方法を説明します。

メンバー情報は、[`src/content/members`](./src/content/members/)下のyamlファイルで管理されています。
したがって、自分の情報を追加するには、このディレクトリに自身の情報を記述したyamlファイルを作成する必要があります。なお、ファイル名は`<GITHUB_ID>.yaml`としてください。`<GITHUB_ID>`には、GitHubのIDを指定してください。

例として、GitHubのIDが`r4ai`の場合を考えます。
まず、`src/content/members/r4ai.yaml`を作成して、自身の情報を記述します。

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

このyamlファイル内で利用できるプロパティについては、[ARCHITECTURE.md](./ARCHITECTURE.md#srccontentmembers)を参照してください。

続いて、開発サーバーを起動して、メンバー一覧に自分の情報が表示されるかどうかを確認します。

```sh
bun run dev
```

ブラウザ上で、[http://localhost:4321/members/](http://localhost:4321/members/)にアクセスし、自分の情報が表示されていることを確認してください。メンバーは参加年度の降順で表示されます。

変更が正しく反映されていることを確認したら、この変更をコミットしてください。

```sh
git add src/content/members/r4ai.yaml
git commit -m "feat: メンバー一覧にr4aiを追加"
```

そして、この変更をリモートリポジトリにプッシュしてください。

```sh
git push origin <feature-branch>
```

`<feature-branch>` には、[featureブランチを切る方法](#featureブランチを切る方法)で作成したブランチ名を指定してください。

例：

```sh
git push origin feature/add-r4ai-to-members
```

> [!NOTE]
> 実際にメンバー情報を追加しているPull Requestの例：
>
> - [docs(members): membersにr4aiを追加 by r4ai · Pull Request #169 · ricora/alg.tus-ricora.com](https://github.com/ricora/alg.tus-ricora.com/pull/169)

### Pull Requestを開く

Issueと同様に、タイトルはわかりやすく簡潔に、誤解が生じないように記述してください。さらに次のことに注意してください。

#### Pull Requestのタイトル

Pull Requestのタイトルはマージ後のコミットメッセージとして使われます。タイトルは[Angular-style](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#type)のコミットメッセージに従って記述してください。

```plaintext
<type>(<scope>): <short summary>
```

- `<type>`: このコミットの種類
  - `feat`: 新機能
  - `fix`: バグの修正
  - `docs`: ドキュメントの変更
  - `style`: コードの意味に影響を与えない、空白、フォーマット、セミコロンの追加などの変更
  - `refactor`: 既存のコードのリファクタリング
  - `perf`: パフォーマンスを向上させるコードの変更
  - `test`: テストコードの追加と修正
  - `chore`: ビルドプロセス、ツール、ライブラリの変更
- `<scope>`: このコミットの影響範囲 (省略可能)
- `<short summary>`: このコミットの簡潔な要約
  - 日本語の命令形で記述
    - e.g. `feat: xxxを追加`

#### Pull Requestの本文

Pull Requestの本文には、以下の内容を明確に記載してください。

- 解決するIssueの番号
- 変更内容
- 確認事項

例：

```md
close #123

## 変更内容

- hogeを追加
- fugaを修正
- piyoのためにfooを削除

## 確認事項

- hogehogeが表示されること
- fugafugaが表示されないこと
- piyopiyoのレイアウトが崩れないこと
```

> [!NOTE]
> 実際のPull Requestの例は、以下のリンクを参照してください。
>
> - [Pull requests · ricora/alg.tus-ricora.com](https://github.com/ricora/alg.tus-ricora.com/pulls?q=is%3Apr+-author%3Aapp%2Frenovate+is%3Aclosed)

### Reviewを受ける

#### Reviewの承認後

Squash and Mergeでマージし、作業ブランチを削除します。

## 付録

### コマンド

#### 依存関係のインストール

以下のコマンドで依存関係をインストールします。

```sh
bun install
```

#### ビルド

以下のコマンドでビルドを行い、静的なHTMLファイルを生成します。

```sh
bun run build
```

ビルド結果は`./dist/`に保存されます。

このコマンドは、TypeScriptの型チェックとサイトのビルドを行います。これらを個別に行いたい場合は、`bun run astro check`と`bun run astro build`をそれぞれ実行してください。

#### 開発サーバーの起動

以下のコマンドで開発サーバーを起動します。

```sh
bun run dev
```

> [!WARNING]
> 開発サーバーを起動する前に、[ビルド](#ビルド)を一度行ってください。
> ビルド時に検索用インデックスを生成するため、ビルドをしないと検索エンジンとして利用している[pagefind](https://pagefind.app/)が正しく動作しません。

開発サーバーはデフォルトでは[http://localhost:4321/](http://localhost:4321/)で起動します。HMR (Hot Module Replacement)によって、ファイルの変更を検知して自動的にブラウザの画面が更新されます。

#### テスト

以下のコマンドでテストを実行します。

```sh
bun run test
```

テストには[bun test](https://bun.sh/docs/cli/test)を利用しています。今後テストランナーを変更する可能性を考慮してscriptsを経由していますが、単に`bun test`としても実行できます。

#### プレビューサーバーの起動

以下のコマンドで`dist/`ディレクトリの中身をプレビューするサーバーを起動します。

```sh
bun run preview
```
