---
title: "VS Codeガイド"
slug: "vscode-tutorial/guide"
---

VS Codeとは、Microsoftが開発する高機能テキストエディタ「Visual Studio Code」の略称である。
テキストエディタでありながら、拡張機能の導入によってIDE同等レベルの機能性を得られる。
ソースコードはGitHubで公開されており、electron製であるためwindows・macOS・Linuxなど様々なOSで動作する。

## テキストエディタとIDEの違い

| 種類             | 説明                                                                                                 |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| テキストエディタ | コードを書く上で最小限の機能を持ったソフト。必要な機能については適宜追加していく。それ故動作が軽い。 |
| IDE              | 最初から必要なものは全部入ってる。それ故ちょっと重いが、環境構築は楽。                               |

## VS Codeの導入方法

### Windows

↓以下参照↓
[Let'sプログラミング、「Visual Studio Codeのダウンロードとインストール」](https://www.javadrive.jp/vscode/install/index1.html)

### macOS

macでもwindowsと同様、インストーラーを用いてもVS Codeをインストールできる。
ただし、homebrewというパッケージマネージャを利用したほうが後々便利であるため、今回はbrewを用いたインストール方法を解説する。
また、詳しいhomebrewの使い方については解説しないため、興味があったら各自調べてもらいたい。

#### 1. homebrewを導入する

1. Homebrewの[公式HP](https://brew.sh/index_ja)に行き、真ん中に表示されているコマンドをコピーする。
2. `ターミナル.app`を起動する
3. `ターミナル`上で、①でコピーした内容を貼り付け、実行する。
4. インストールが進み、`[Installation Success]`と表示されたらインストール成功。

#### 2. VS Codeを導入する

ターミナル上で、

```bash
brew install --cask visual-studio-code
```

を実行する。

> 参考文献: [VS Codeのインストール方法をまとめてみた(MacOS)](https://qiita.com/DaikiSuyama/items/f51a407584084c04b5cd)

## VS Codeの使い方

以下の内容は、[公式ドキュメント](https://code.visualstudio.com/docs/getstarted/userinterface)の内容をもとに作られている。
また、初歩的な使い方は[こちらのサイト](https://www.javadrive.jp/vscode/)が体系的にまとまっていて分かりやすいのでオススメ。

### VS Codeの画面構成

VS Codeの画面は、以下の画面レイアウトから成り立っている。

- A. Activity Bar
  画面左端にあり、エクスプローラ画面や拡張機能画面などにサイドバーのビューを切り替えるのに使う。
- B. Side Bar
  エクスプローラや拡張機能、デバッグ画面など様々なビューを表示する。エディターグループでの作業を支援する。
- C. **Editor Groups**
  画面真ん中の、**実際のコードを書いていく画面**。基本的にこの画面で作業をしていく。
- D. Panel
  エディタ下部の、ターミナルなどを表示しておける画面。**`ctrl-j`で表示、非表示を切り替えられる**。便利。
- E. Status Bar
  言語や文字コードなど、開いてるプロジェクトやファイルの情報を表示する。

![User Interface](https://code.visualstudio.com/assets/docs/getstarted/userinterface/hero.png)

### markdownを書いてみる(初心者向け)

#### 1.ファイルを作成してみよう

1. `Ctrl+N`より、ファイルを作成する。
2. `Ctrl+K M`で言語選択画面を開き、markdownを選択する。
3. `Ctrl+S`で、適当な場所に保存しておく。

#### 2. ファイルを編集してみよう

詳しいmarkdownの文法については、各自調べてもらいたい。
一応、基礎的な文法は以下の通りである。

```markdown
# 見出し1

## 見出し2

- リスト1
- リスト2

1. 番号付きリスト1
2. 番号付きリスト2

> 引用

**強調文字**

# 区切り

`インラインコード`
```

試しに、Hello worldのwikipediaの一部をmarkdownで書いてみる。

```markdown
**Hello world**（ハロー・ワールド）は、画面に「Hello, world!」やそれに類する文字列を表示するプログラムの通称である。
多くのプログラミング言語において非常に単純なプログラムであり、プログラミング言語の入門書で、プログラムを動かすためのプログラミング言語の基本文法の解説例として提示される。

## 利用目的

ハロー・ワールドは伝統的にプログラミング言語をプログラム初心者に紹介するために使われる。
また、ハロー・ワールドはプログラミング言語が正しくインストールされていること、およびプログラミング言語の使用方法を理解するための[健全性テスト](https://ja.wikipedia.org/wiki/健全性テスト)にも使用される。

## 歴史

プログラミングできる[コンピュータ](https://ja.wikipedia.org/wiki/コンピュータ)の開発以来、小さなテストプログラムは存在してきたが、
テスト文言として「Hello, World!」を使う習慣はブライアン・カーニハンとデニス・リッチーによる著書
「[プログラミング言語C](https://ja.wikipedia.org/wiki/プログラミング言語C)」（1978年）のC言語バージョンから始まったと言われている。
同著書のプログラム例は`hello, world`（大文字なし、感嘆符なし）を標準出力に出力する。
```

以上の内容を書き込んだら、`ctrl+s`で保存をする。
`ctrl+k v`でプレビューをしてみて、正常に見れたら成功。

## VS Codeをカスタムする

### keymapについて

VS Codeでは、キーマップの設定を自由に変更できる。
また、標準で設定されているキーマップについては、**`Ctrl+K Ctrl+R`でPDF形式のチートシートが表示される**。
最初のうちはどこかにプリントアウトしてお手元においておくと良いかも。

> [チートシートの日本語訳\[qiita\]](https://qiita.com/TakahiRoyte/items/cdab6fca64da386a690b)

#### キーマップの設定方法

1. `Ctrl+K Ctrl+S`でショートカットキーの設定画面を開く。
   もしくは、`Ctrl+Shift+P`から`Open Keyboard Shortcuts`と検索しても良い
2. 適当に変えたいキーバインドを検索して、`keybindig`の値を変更する。
   (検索窓右側にあるキーボードアイコンを押すと、キー入力から検索できる)

### 拡張機能について

ジャンル別におすすめの拡張機能を紹介していく。

#### 日本語化

- [Japanese Language Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=MS-CEINTL.vscode-language-pack-ja)
  - 日本語化したい人は入れましょう。

#### Git関連

- [GitLens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
  - 機能が多すぎて説明しきれないため、[こちら](https://atmarkit.itmedia.co.jp/ait/articles/2111/19/news034.html)を参照。
  - 絶対に入れましょう。
- [gitignore](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore)
  - gitignoreのsyntaxhighlightを追加
  - 選択した言語のgitignoreを自動生成する(コマンドパレットから、`Add gitignore`を選択)。

#### SSH

- [Remote Development](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack)
  - VS CodeからSSH接続が出来るようになる。
  - SSHのときだけvimを使っているというそこのあなた、是非使ってみましょう。

#### Markdown

- [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
  - VS CodeをMarkdownエディタに変身させるソフト。
  - `Ctrl+Shift+V`よりmdのプレビューが出来る。
  - 詳しい使い方は[こちらの記事](https://zenn.dev/ctrlkeykoyubi/articles/vscode-markdown-all-in-one)を参照。

#### その他

- [Tabnine](https://marketplace.visualstudio.com/items?itemName=TabNine.tabnine-vscode)
  - AIによる優秀なコード補完が提供される。
- [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
  - コメントアウトの後に`*`, `!`, `?`, `TODO:`などをつけることで、コメントアウトをカラフルに出来るようになる。
    ![better comments](https://github.com/aaron-bond/better-comments/raw/HEAD/images/better-comments.PNG)
- [indent rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
  - インデントをカラフルにする。
  - pythonなどインデントが重要な言語では入れると良いかも？
    ![indent rainbow](https://raw.githubusercontent.com/oderwat/vscode-indent-rainbow/master/assets/example.png)

### themeについて

VS Codeのthemeは、拡張機能と同様にインストール出来る。

#### themeの入れ方

今回は、[vscodethemes.com](https://vscodethemes.com/)から好きなthemeを探し、インストールしてみる。

1. [vscodethemes.com](https://vscodethemes.com/)を開く。
2. 入れたいthemeを探し、クリック。
3. OPEN WITH `VSCODE` をクリック。
4. VS Code上で開かれた画面上部にあるインストールをクリック。
5. どのthemeを適用するか聞かれるので、好きなものを選ぶ。

#### おすすめのtheme一覧

- [GithHub Theme](https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme)
  誰もが知るGitHubで使われているテーマのVS Code版。
  構文ハイライトに使われる色の種類は少なめで、直感的にコードを読める。筆者もよく使っている。
  ![GitHub Theme](https://vscodethemes.com/e/github.github-vscode-theme/github-dark.svg?language=javascript)

- [Material Theme](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme)
  非常に人気のあるtheme。アクセントカラーを簡単に変えられるのが売り。
  個人的に一番オシャレだと思うテーマNo.1。
  ![Material Theme](https://vscodethemes.com/e/equinusocio.vsc-community-material-theme/community-material-theme-darker-high-contrast.svg?language=javascript)

- [Monokai Pro](https://marketplace.visualstudio.com/items?itemName=monokai.theme-monokai-pro-vscode&ssr=false#overview)
  かの有名なsublimetextのmonokaiをVS Codeに移植したもの。
  monokaiの作者本人が作っているらしく、非常にクオリティが高い。
  注意点としては、有料ライセンス(¥1000位)を買わないとたまに購入促進の広告が出るらしい(筆者は使ってないので詳しくは不明)。
  ![Monokai](https://vscodethemes.com/e/monokai.theme-monokai-pro-vscode/monokai-pro.svg?language=javascript)

- [One Dark Pro](https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme)
  Atom標準のダークテーマのVS Code移植版。
  構文ハイライトに使われる色の種類が多く、慣れれば見やすい。個人的にはjavascriptとの親和性が高いように感じる。
  ![One Dark Pro](https://vscodethemes.com/e/zhuangtongfa.material-theme/one-dark-pro.svg?language=javascript)

- [Dracula Official](https://marketplace.visualstudio.com/items?itemName=dracula-theme.theme-dracula)
  コントラストがかなり高めで、目が疲れる代わりに可読性がかなり高いテーマ。
  Dracula Themeは様々なソフトウェアで開発されており、[公式HP](https://draculatheme.com/)より対応一覧が出ている。
  ![Dracula](https://vscodethemes.com/e/dracula-theme.theme-dracula/dracula.svg?language=javascript)

#### 細かいthemeのいじり方(中・上級者向け)

基本的に設定はjsonファイルからのみ可能である。
`"workbench.colorCustomizations"`と、`"editor.tokenColorCustomization"`に設定を上書きすることによって、カスタマイズをしていく。
また、細かい設定の値については、実際のThemeのソースコード([GitHub Theme](https://github.com/primer/github-vscode-theme))や[公式ドキュメント](https://code.visualstudio.com/api/references/theme-color)を参考にしてもらいたい。

##### themeをいじる

具体的には、

```json
"workbench.colorCustomizations": {
  "設定項目": "値"
}
```

といった形で書いていく。

また、特定のthemeでのみ適応させたい場合は、

```json
"workbench.colorCustomizations": {
  "[テーマ名]": {
    "設定項目": "値"
  }
},
```

Ex. `Cummunity Material Theme Darker High Contrast`での`focusBorder`の色を赤にする。

```json
"workbench.colorCustomizations": {
  "[Community Material Theme Darker High Contrast]": {
    "focusBorder": "#ff0000"
  }
},
```

##### syntax highlightをいじる

具体的には、

```json
"editor.tokenColorCustomizations": {
  "comments": {
    "foreground": "#008800",
    "fontStyle": "underline"
  },
  "functions": {
    "foreground": "#000088",
    "fontStyle": "bold"
  },
```

といった形で書いていく。
また、ここで指定できるものは、以下にあるものだけである。

- comments: コメントの色とスタイル
- functions: 関数やメソッドの色とスタイル
- keywords: キーワードの色とスタイル
- numbers: 数値リテラルの色とスタイル
- strings: 文字列リテラルの色とスタイル
- types: 型の色とスタイル
- variables: 変数の色とスタイル
- textMateRules: TextMateエディタで定められているルールにのっとった構文ハイライト指定（後述）

そして、commentsやfunctionなど大まかなジャンル指定では対応できないもの対しては、`textMateRules`を用いて指定していく。

##### textMateRulesをいじる

具体的には、以下のように書いていく。

```json
"textMateRules": [
  {
    "scope": [
      "comment",
      "comment.block",
      "comment.block.documentation",
      "keyword.control",
      "storage.type"
    ],    "settings": {
      "fontStyle": ""
    }
  }
],
```

- `"scope"`の値については、コマンドパレットより`Developer: Inspect Editor Tokens and Scopes`を有効化すると、カーソル位置の構文の`textMateScopes`を確認できる。
- `"settings"`の中に、変更したいスタイル(`"fontStyle"`や`"foregroundColor"`など)を指定していく。

## 参考文献

### VS Codeについて

- 日経XTECH、「これさえあれば大丈夫、ソフト開発の大定番「VS Code」を極める」
  https://xtech.nikkei.com/atcl/nxt/column/18/01907/010500001/
- Microsoft、「Visual Studio Code」
  https://azure.microsoft.com/ja-jp/products/visual-studio-code/

### VS Codeのインストール方法

- Let'sプログラミング、「Visual Studio Code」のダウンロードとインストール
  https://www.javadrive.jp/vscode/install/index1.html
- Qiita、「Homebrewのインストール」
  https://qiita.com/zaburo/items/29fe23c1ceb6056109fd
- Qiita、「VS Codeのインストール方法をまとめてみた(MacOS)」
  https://qiita.com/DaikiSuyama/items/f51a407584084c04b5cd

### VS Codeの使いかた

- Microsoft、「Visual Studio Code User Interface」
  https://code.visualstudio.com/docs/getstarted/userinterface
- Let'sプログラミング、「Visual Studio Code」の使い方
  https://www.javadrive.jp/vscode/

### VS Codeのカスタマイズ関連

- Qiita、「【Windows版】VS Code キーボードショートカット一覧 （オススメ付き）」
  https://qiita.com/TakahiRoyte/items/cdab6fca64da386a690b
- ITメディア、「VS Codeで配色テーマをカスタマイズするには」
  https://atmarkit.itmedia.co.jp/ait/articles/1810/19/news032.html
- ITメディア、「Visual Studio Codeの設定「虎の巻」：構文ハイライト／配色テーマ自作編」
  https://atmarkit.itmedia.co.jp/ait/articles/1710/20/news023.html
