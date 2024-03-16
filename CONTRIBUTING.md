# Contribution Guide

文章。

## Table of Contents

- 目次

## Issueを作成する

文章。

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

#### Featureブランチを切る方法

### 開発環境の構築

このプロジェクトではJavaScriptランタイムとして[Bun](https://bun.sh/)を利用しています。必要なバージョンは[`.tool-versions`](./.tool-versions)を参照してください。

<!-- prettier-ignore -->
> [!TIP]
> [mise](https://github.com/jdx/mise)や[asdf](https://asdf-vm.com/)といったバージョン管理ツールを利用すると、[`.tool-versions`](./.tool-versions)に記載されたバージョンのBunを簡単にインストールすることができます。
>
> [mise](https://github.com/jdx/mise)の場合、
>
> ```sh
> mise install
> ```
>
> で必要なバージョンのBunをインストールできます。

#### ローカル環境で開発を行う

##### 依存関係のインストール

以下のコマンドで依存関係をインストールします。

```sh
bun install
```

##### ビルド

以下のコマンドでビルドを行い、静的なHTMLファイルを生成します。

```sh
bun run build
```

ビルド結果は`./dist/`に保存されます。

このコマンドは、TypeScriptの型チェックとサイトのビルドを行います。これらを個別に行いたい場合は、`bun run astro check`と`bun run astro build`をそれぞれ実行してください。

##### 開発サーバーの起動

以下のコマンドで開発サーバーを起動します。

```sh
bun run dev
```

> [!WARNING]
> 開発サーバーを起動する前に、ビルドを一度行ってください。
> ビルド時に検索用インデックスを生成するため、ビルドをしないと検索エンジンとして利用している[pagefind](https://pagefind.app/)が正しく動作しません。

開発サーバーはデフォルトでは[http://localhost:4321/](http://localhost:4321/)で起動します。HMR (Hot Module Replacement)によって、ファイルの変更を検知して自動的にブラウザの画面が更新されます。

##### テスト

以下のコマンドでテストを実行します。

```sh
bun run test
```

テストには[bun test](https://bun.sh/docs/cli/test)を利用しています。今後テストランナーを変更する可能性を考慮してscriptsを経由していますが、単に`bun test`としても実行できます。

##### プレビューサーバーの起動

以下のコマンドで`dist/`ディレクトリの中身をプレビューするサーバーを起動します。

```sh
bun run preview
```

#### GitHub Codespacesで開発を行う

### 記事を執筆する

### 機能を開発する

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

### Reviewを受ける

#### Reviewの承認後

Squash and Mergeでマージし、作業ブランチを削除します。
