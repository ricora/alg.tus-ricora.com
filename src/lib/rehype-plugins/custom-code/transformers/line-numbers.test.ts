import dedent from "dedent"
import { JSDOM } from "jsdom"
import { beforeAll, describe, expect, test } from "bun:test"
import { process } from "../test-utils/process.js"

describe("line numbers", () => {
  let jsdom: JSDOM
  let parser: DOMParser

  beforeAll(() => {
    jsdom = new JSDOM()
    parser = new jsdom.window.DOMParser()
  })

  test('numbered lines should have "data-line=number" and "data-line-numbers" attribute', async () => {
    const md = dedent`
      \`\`\`rust showLineNumbers
      fn main() {
          println!("Hello, World!");
          println!("Hello, Shikiji!");
      }
      \`\`\`
    `

    const { html } = await process(md)
    const doc = parser.parseFromString(html, "text/html")
    const pre = doc.querySelector("pre")
    const code = pre?.querySelectorAll("[data-line-numbers]")
    const lines = pre?.querySelectorAll("[data-line]")

    expect(code?.[0].children.length).toBe(4)
    expect(lines?.length).toBe(4)
    expect(lines?.[0].textContent).toBe("fn main() {")
    expect(lines?.[0].getAttribute("data-line")).toBe("1")
    expect(lines?.[1].textContent).toBe('    println!("Hello, World!");')
    expect(lines?.[1].getAttribute("data-line")).toBe("2")
    expect(lines?.[2].textContent).toBe('    println!("Hello, Shikiji!");')
    expect(lines?.[2].getAttribute("data-line")).toBe("3")
    expect(lines?.[3].textContent).toBe("}")
    expect(lines?.[3].getAttribute("data-line")).toBe("4")
  })
})
