import { expect, test } from "@playwright/test"

test("mdx-guide page test", async ({ page }) => {
  await page.goto("/mdx-guide", { timeout: 5000 })
  const screenshot = await page.screenshot({ animations: "disabled", fullPage: true })
  await expect(screenshot).toMatchSnapshot("mdx-guide.png", { maxDiffPixelRatio: 0.01 })
})

test("members page test", async ({ page }) => {
  await page.goto("/members", { timeout: 5000 })
  const screenshot = await page.screenshot({ animations: "disabled", fullPage: true })
  await expect(screenshot).toMatchSnapshot("members.png", { maxDiffPixelRatio: 0.01 })
})
