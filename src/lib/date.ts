/**
 * 日付をフォーマットする
 * @param date 日付
 * @returns フォーマットされた日付の文字列
 * @example
 * ```ts
 * formatDate(new Date()) // => "2023年12月29日"
 * ```
 */
export const formatDate = (date: string | Date) => {
  const d = new Date(date)
  return d.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}
