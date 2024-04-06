import { expect, test } from "@playwright/test"

test("index page test", async ({ page }) => {
  await page.goto("/", { timeout: 5000 })
  const screenshot = await page.screenshot({ animations: "disabled", fullPage: true })
  await expect(screenshot).toMatchSnapshot("index.png", { maxDiffPixelRatio: 0.001 })
})
