import { danger, fail, warn } from "danger"

const title = danger.github.pr.title
const body = danger.github.pr.body

const checkTitle = () => {
  const allowedPrefixList = ["chore", "docs", "feat", "fix", "perf", "refactor", "style", "test"]
  const allowTitleRegex = new RegExp(`^(${allowedPrefixList.join("|")})(\\(([\\w$.* -]*)\\))?: (.+)(?:\\n|$)`, "g")
  if (!allowTitleRegex.test(title)) {
    fail(
      `PRのタイトルが不正です: \`${title}\`\n次のいずれかのPrefixを使用してください: \n${allowedPrefixList
        .map((prefix) => {
          return `\`${prefix}: \``
        })
        .join(" ")}\n例: \`feat: ユーザーの削除機能を追加\``,
    )
  }
}

const checkCloseIssue = () => {
  if (
    !/(close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)\s+(#\d+|https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/issues\/\d+)/i.test(
      body,
    )
  ) {
    warn("このPRが解決するIssueへのリンクを記載してください。\n例: `close #123`")
  }
}

checkTitle()
checkCloseIssue()
