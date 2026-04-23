import { describe, expect, test } from "bun:test"
import { type Meta, defaultMeta, parseMeta, removeDuplicateAndSort, retrieveEscapedString } from "./parser"

describe("utility functions", () => {
  test("retrieve escaped string", () => {
    const escapedString = retrieveEscapedString("\\'Some \\'Code\\' Data\\'")
    expect(escapedString).toBe("'Some 'Code' Data'")
  })

  test("retrieve escaped string with no escape", () => {
    const escapedString = retrieveEscapedString("'Some 'Code' Data'")
    expect(escapedString).toBe("'Some 'Code' Data'")
  })

  test("remove duplicate and sort array", () => {
    const arr = [1, 3, 2, 1, 4, 3, 5, 2, 6, 5, 4, 3, 2, 1]
    const sortedArr = removeDuplicateAndSort(arr)
    expect(sortedArr).toEqual([1, 2, 3, 4, 5, 6])
  })
})

describe("parse meta data", () => {
  test("parse meta string", () => {
    const metaString = '{1,4-6,11} showLineNumbers {1, 92-95} title="Some Code Data"'
    const meta = parseMeta(metaString)
    expect(meta).toEqual({
      ...defaultMeta,
      title: "Some Code Data",
      range: [1, 4, 5, 6, 11, 92, 93, 94, 95],
      showLineNumbers: true,
    } satisfies Meta)
  })

  test("parse meta string with duplicate range", () => {
    const metaString = "{1,4-5,11} {1,3,9-13} {200,400}{300,500}"
    const meta = parseMeta(metaString)
    expect(meta).toEqual({
      ...defaultMeta,
      range: [1, 3, 4, 5, 9, 10, 11, 12, 13, 200, 300, 400, 500],
    } satisfies Meta)
  })

  test("parse meta string with duplicate title", () => {
    const metaString = 'title="Some Code Data" title="Some Code Data"'
    const meta = parseMeta(metaString)
    expect(meta).toEqual({
      ...defaultMeta,
      title: "Some Code Data",
    } satisfies Meta)
  })

  test("parse meta string with duplicate showLineNumbers", () => {
    const metaString = "showLineNumbers showLineNumbers"
    const meta = parseMeta(metaString)
    expect(meta).toEqual({
      ...defaultMeta,
      showLineNumbers: true,
    } satisfies Meta)
  })

  test("parse meta string with title without quote", () => {
    const metaString = "title=Some Code Data"
    const meta = parseMeta(metaString)
    expect(meta).toEqual({
      ...defaultMeta,
      title: "Some",
      Code: true,
      Data: true,
    } satisfies Meta)
  })

  test("parse meta string with single quote title", () => {
    const metaString = "title='Some \"Code\" Data'"
    const meta = parseMeta(metaString)
    expect(meta).toEqual({
      ...defaultMeta,
      title: 'Some "Code" Data',
    } satisfies Meta)
  })

  test("parse meta string with escaped single quote title", () => {
    const metaString = "title='Some \\'Code\\' Data'"
    const meta = parseMeta(metaString)
    expect(meta).toEqual({
      ...defaultMeta,
      title: "Some 'Code' Data",
    } satisfies Meta)
  })

  test("parse meta string with double quote title", () => {
    const metaString = "title=\"Some 'Code' Data\""
    const meta = parseMeta(metaString)
    expect(meta).toEqual({
      ...defaultMeta,
      title: "Some 'Code' Data",
    } satisfies Meta)
  })

  test("parse meta string with escaped double quote title", () => {
    const metaString = 'title="Some \\"Code\\" Data"'
    const meta = parseMeta(metaString)
    expect(meta).toEqual({
      ...defaultMeta,
      title: 'Some "Code" Data',
    } satisfies Meta)
  })
})
