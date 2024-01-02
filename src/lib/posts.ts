/**
 * 与えられたMarkdownの文字列から、読了時間を計算する
 * @argument content Markdownの文字列
 * @returns 読了時間（分）
 */
export const calculateReadingTime = (content: string) => Math.max(1, Math.round(content.length / 600))
