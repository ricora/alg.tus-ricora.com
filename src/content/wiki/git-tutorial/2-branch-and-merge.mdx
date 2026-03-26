---
title: "Gitのつかいかた branch, merge"
slug: "git-tutorial/2-branch-and-merge"
---

## Git / GitHubの使い方 ブランチについて

- 前 [Git / GitHub の使い方 - ローカル編](/wiki/git-tutorial/1-init-add-commit/)

## Branchについて

Branch（以下ブランチ）とは枝のことですが、`git`における役割は木の枝ではなく支流のようなものです。
完全に以前の状況をリセットした状態から始めるのではなく、ある程度引き継いだ状態からファイルを追加したり、ソフトウェアのバージョン管理をするときに有用です。
青◯学院とかのキラキラJDがInstagramにのっけて承認欲求とともに貪るのはbrunch。別物です。

### ブランチ を切る / 移動する

まずブランチを切ってみましょう。
ブランチはコミットしたファイルが対象なので、とりあえず練習用のディレクトリを作り、以下のような感じで最初のファイル（ここではa.txt）を作ってからそれをコミットします。

```sh
git init
touch a.txt
git add a.txt
git commit -m "a.txt"
```

コミットする理由は、はじめにコミットがないと以降の操作ができないからです。

では、ブランチを切ります。コマンドは

```sh
git checkout -b (new branch name)
```

もしくは

```sh
git switch -c (new branch name)
```

です。(new branch name)には好きな名前を入れてください。

> なんで同じことをするためのコマンドが複数あるかは、[ここ](https://www.git-tower.com/learn/git/commands/git-switch#:~:text=The%20%22switch%22%20command,and%20creating%20branches!)とかを読んでください。
> また、ブランチは慣習により`切る`という表現をします。

さて、これで新しいブランチに移ることができました。では、ブランチの一覧を見てそれを確認しましょう。

```sh
git branch -l
```

を打つと、

```sh
  master or main
* (new branch name)
```

という表示がされると思います。'\*'(asterisk)は現在のブランチを示す記号です。
これでブランチを新しく作り、移動することができました。簡単でしたね！

では、また元のブランチに戻りましょう。そのためには

```sh
git checkout main or master
```

もしくは

```sh
git switch main or master
```

を打ちます。そこで再度現在のブランチ一覧を確認すると

```sh
> git branch -l

* master or main
  (new branch name)
```

こんな感じ。きちんと戻れましたね。

### ファイルが...ない？

さて、次にさっき自分が切ったブランチに戻ってファイルを作成しましょう。ついでに確認もしておくとすると、そのためのコマンドは

```sh
git switch (new branch name) / git checkout (new branch name)
git branch -l
```

でしたね。

では、ここでファイルを一つ作ります。UNIX系だと

```sh
touch lol.txt
```

などです。（lol.txtは任意のファイル名でいいです。)touchは本来ファイル生成コマンドではないのですが、それはさておき。

これでまたmain/masterに戻ります。さて、`ls`をしてみてください。

```sh
> ls
```

ない！ファイルがありません。さっき作ったのに？ではまた自分が作ったブランチに戻ります。

```sh
> ls
  lol.txt
```

ありました。どういうことなのでしょうか。

### HEAD? Branch?

ここで少し`git`の概念について話しましょう。もしそういうものが必要なければ、この節を飛ばして次の節に移っていただいて結構です。

では、はじめましょう。先述したとおり、`git`は現在のディレクトリ内でのバージョン管理をしてくれるシステムでした。
しかし、その詳細については立ち入ることなく素通りしていました。ブランチの挙動を理解するための導きの糸として、少しその設計に立ち入りましょう。

まず、次のコマンドを打ってみましょう。

```sh
git log
```

すると、

```sh
commit ...
Author: ...
Date:   ...

  something

```

という形式のログが出力されると思います。形式は`less`と同じなので、長い場合はqを押してログ出力プログラムを終了します。

さて、ログ出力の一番上には`commit ... (HEAD -> [ブランチ name])`という文字列が有ると思います。この`HEAD`とは何なのでしょうか。
実際にディレクトリをいじりながら探りましょう。まずは新しいディレクトリを作成します。そこで、

```sh
git init
touch A.txt
git add A.txt
git commit -m "initial commit"
```

までを入力します。そこでブランチを新しく作成しましょう。このページの中に書いてあるように、

```sh
git switch -c editA
```

と打ちます。そこで、

```sh
echo "hi, git! I'm here" > A.txt
git add A.txt
git commit -m "wrote to A.txt"
```

と打ちます。

ここまで行った後で、二つのブランチ、mainとeditAでの`git log`の出力を比べてみましょう。

mainでは

```sh
commit ... (HEAD -> main)
```

editAでは

```sh
commit ...  (HEAD -> editA)
Author: ...
Date: ...

  something

commit ... (master)
```

という表示がされるはずです。確かにさっきA.txtを編集したはずなのにmainでは表示されていませんね。

なぜそのようなことが起きるかを図解したものが以下になります。ブランチはある特定のコミットを指すポインタです。ポインタに馴染みがない人は、コミットの上に看板を立てているようなものだと解釈してください。

ここでHEADは、現在いるブランチの先頭のコミットを指すのです。先程のコマンドを例に取ります。はじめにコミットしたときは

```sh
commit "initial commit"
          ^
          |
   ブランチ main <= HEAD
```

となります。まだeditAはありません。そこで`git switch -c editA`を打ったとき、HEADはeditAの先頭のコミットを指すようになります。しかし、editAの先頭はmainのものと同一なので、実質的にHEADが指す位置は変わりません。

```sh
commit "initial commit"
          ^
          |
   ブランチ main, editA <= HEAD
```

その次にコミットをするとどうなるでしょうか。上の例に従えば、editAの先頭のコミットは`git commit "wrote to A.txt"`を指すことになります。そこで、HEADもeditAの先頭を指すことになります。

```sh
                  -----> commit "wrote to A.txt"
                  |          ^
                  |          |
                  |      ブランチ editA <= HEAD
                  |
commit "initial commit"
          ^
          |
   ブランチ main
```

ここで`git switch main / master`をすると、HEADの位置はmaster / mainブランチの先頭のコミットへ移動します。

```sh
                  -----> commit "wrote to A.txt"
                  |          ^
                  |          |
                  |      ブランチ editA
                  |
commit "initial commit"
          ^
          |
   ブランチ main <= HEAD
```

ここで、例えば`touch b.txt`などを打って新規にファイルを作成し、それをコミットするとどうなるでしょうか。main / masterがeditAとは違う方向に1コミット分進むことになります。

```sh
                  -----> commit "wrote to A.txt"
                  |          ^
                  |          |
                  |      ブランチ editA
                  |
commit "initial commit" --> commit "create B.txt"
                                     ^
                                     |
                            ブランチ main <= HEAD
```

すると、コミットの履歴が分岐するのです。それはさておき、これでおわかりでしょうか。HEADが指し示す先が移動することによって、私たちは**見せかけの**ブランチ移動をしているのです。
また、ブランチがなぜブランチと呼ばれるかも解ると思います。ブランチという名は、本流から切り離されてその一つの枝になることから来ているということです。

さて、ここからなぜブランチの切り替えでファイルがなくなるかを考えてみましょう。答えはシンプルで、HEADが移動することによって、ファイルがない状態のコミットが最近のコミットになるからです。

では、これらのブランチを統合するようなこと、つまりmergeについて見ていきましょう。

## Git / GitHub の使い方 - マージする

ブランチの使いどころとしては、

- 新規機能開発・機能追加
- バグ修正などのパッチ当て作業

などが挙げられます。いずれもどこかのタイミングで開発の本流、例えばmainやmasterブランチにそのコミットを反映させる必要があるものです。

そこで、ブランチにはマージという機能があります。mergeというのは混ぜる、という意味の英単語です。その名の通り、二つのブランチを合流させるためのものです。

コマンドは簡単です。

```sh
git merge (マージしたいブランチ名)
```

で終わります。

しかし、マージが可能である場面とそうでない場面があります。その中で、よくある状況を少し考えてみましょう。

A. Fast-Forwardが可能であるような状態

マージするブランチがもう一つのブランチのHEADの先にコミットしている場合、マージするには他のブランチのコミットを単純に引っ張ってくればいいので簡単にマージできます。

B. 直接マージできない状態

マージするブランチともう一つのブランチのコミットログに差があり、単純にコミットログを融合できないようなことも考えられます。
そのような場合は、git側でエラーを吐くこともあります。エラーログを読むと共に、コミットログを確認してブランチがスパゲッティ状態にならないようにしましょう。

詳しくは`man git-merge`もしくは`man 1 git-merge`とか[Branching and Merging - Git SCM Book](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging)を読んでください。

ただし、基本的にマージをするタイミングは多くないと思います。その際に調べていくような感じでいいと思います。

**要追記**

最後の[リモート・プロジェクトへの貢献編](/wiki/git-tutorial/3-push-and-pull-request/)を読み、ブランチを用いた開発手法を学びましょう。
