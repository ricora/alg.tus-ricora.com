import dedent from "dedent"
import { JSDOM } from "jsdom"
import { beforeAll, describe, expect, test } from "bun:test"
import { process } from "../test-utils/process"

describe("diff", () => {
  let jsdom: JSDOM
  let parser: DOMParser

  beforeAll(() => {
    jsdom = new JSDOM()
    parser = new jsdom.window.DOMParser()
  })

  test("diff code block with 0 indent", async () => {
    const md = dedent`
      \`\`\`rust diff
      +fn main() {
      -    println!("Hello, World!");
      +}
      \`\`\`
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const pre = doc.querySelector("pre")
    const preCodeText = pre?.textContent?.split("\n")
    const addedLines = pre?.querySelectorAll("[data-diff-added]")
    const removedLines = pre?.querySelectorAll("[data-diff-removed]")

    expect(preCodeText).toEqual(["fn main() {", '    println!("Hello, World!");', "}"])
    expect(addedLines?.length).toBe(2)
    expect(removedLines?.length).toBe(1)
  })

  test("diff code block with 1 indent", async () => {
    const md = dedent`
      \`\`\`rust diff
      + fn main() {
      -     println!("Hello, World!");
      + }
      \`\`\`
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const pre = doc.querySelector("pre")
    const preCodeText = pre?.textContent?.split("\n")
    const addedLines = pre?.querySelectorAll("[data-diff-added]")
    const removedLines = pre?.querySelectorAll("[data-diff-removed]")

    expect(preCodeText).toEqual(["fn main() {", '    println!("Hello, World!");', "}"])
    expect(addedLines?.length).toBe(2)
    expect(removedLines?.length).toBe(1)
  })

  test("diff code block with 2 indent", async () => {
    const md = dedent`
      \`\`\`rust diff
      +  fn main() {
      -      println!("Hello, World!");
      +  }
      \`\`\`
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const pre = doc.querySelector("pre")
    const preCodeText = pre?.textContent?.split("\n")
    const addedLines = pre?.querySelectorAll("[data-diff-added]")
    const removedLines = pre?.querySelectorAll("[data-diff-removed]")

    expect(preCodeText).toEqual(["fn main() {", '    println!("Hello, World!");', "}"])
    expect(addedLines?.length).toBe(2)
    expect(removedLines?.length).toBe(1)
  })

  test("diff code block with 3 indent", async () => {
    const md = dedent`
      \`\`\`rust diff
      +   fn main() {
      -       println!("Hello, World!");
      +   }
      \`\`\`
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const pre = doc.querySelector("pre")
    const preCodeText = pre?.textContent?.split("\n")
    const addedLines = pre?.querySelectorAll("[data-diff-added]")
    const removedLines = pre?.querySelectorAll("[data-diff-removed]")

    expect(preCodeText).toEqual(["fn main() {", '    println!("Hello, World!");', "}"])
    expect(addedLines?.length).toBe(2)
    expect(removedLines?.length).toBe(1)
  })
})
