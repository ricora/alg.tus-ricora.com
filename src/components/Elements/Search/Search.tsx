import {
  type Component,
  createSignal,
  createResource,
  onMount,
  Suspense,
  createMemo,
  type Setter,
  type JSX,
} from "solid-js"
import type { PagefindSearchResult, PagefindSearchResults } from "./type"
import { isDev } from "@/lib/runtime"
import { twMerge } from "tailwind-merge"
import "./mark.css"
import { HeroiconsDocumentText } from "./HeroiconsDocumentText"

type Pagefind = {
  init: () => void
  search: (query: string) => Promise<PagefindSearchResults>
}

const loadPagefind = async () => {
  // Because `dist/pagefind/pagefind.js` is generated at build time, we need to use a dynamic import
  const pagefindPath = isDev ? "../../../../dist/pagefind/pagefind.js" : "/pagefind/pagefind.js"
  const pagefind = (await import(/* @vite-ignore */ pagefindPath)) as Pagefind
  pagefind.init()
  return pagefind
}

type SearchProps = {
  searchIcon: JSX.Element
  class?: string
}

export const Search: Component<SearchProps> = (props) => {
  let pagefind: Pagefind
  onMount(async () => {
    pagefind = await loadPagefind()
  })

  const [query, setQuery] = createSignal("")
  const isQuerying = createMemo(() => query().length > 0)

  const [searchResultRefs, setSearchResultRefs] = createSignal<HTMLAnchorElement[]>([])
  const [searchResults] = createResource(query, async (query: string) => {
    if (query.length === 0) return undefined

    const searchResults = await pagefind?.search(query)
    setSearchResultRefs(Array(searchResults?.results.length ?? 0).fill(null))
    setActiveIndex(0)
    return searchResults
  })

  const [activeIndex, setActiveIndex] = createSignal(0)
  const incrementActiveIndex = () => setActiveIndex(Math.min(activeIndex() + 1, searchResultRefs().length - 1))
  const decrementActiveIndex = () => setActiveIndex(Math.max(activeIndex() - 1, 0))

  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        incrementActiveIndex()
        searchResultRefs().at(activeIndex())?.scrollIntoView({ block: "nearest" })
        break
      case "ArrowUp":
        e.preventDefault()
        decrementActiveIndex()
        searchResultRefs().at(activeIndex())?.scrollIntoView({ block: "nearest" })
        break
    }
  }

  const handleOnSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    if (searchResultRefs().length <= 0) return

    searchResultRefs().at(activeIndex())?.click()
  }

  return (
    <div
      class={twMerge(
        "flex flex-col rounded-xl border bg-bg-default p-2 backdrop-blur-2xl dark:bg-mauve-a2",
        props.class,
      )}
    >
      <form
        class={twMerge("flex w-full flex-none flex-row gap-3 px-2 pt-1", isQuerying() ? "border-b pb-3" : "pb-1")}
        onsubmit={handleOnSubmit}
      >
        <div class="flex items-center">{props.searchIcon}</div>
        <input
          type="text"
          value={query()}
          placeholder="Search..."
          onInput={(e) => setQuery(e.currentTarget.value)}
          onKeyDown={handleKeyDown}
          class="w-full bg-transparent text-lg font-bold text-fg-default outline-none"
        />
      </form>
      <Suspense>
        {isQuerying() && (
          <SearchResults
            query={query()}
            results={searchResults()?.results}
            resultRefs={searchResultRefs()}
            setResultRefs={setSearchResultRefs}
            activeIndex={activeIndex()}
            setActiveIndex={setActiveIndex}
          />
        )}
      </Suspense>
    </div>
  )
}

type SearchResultsProps = {
  query: string
  results: PagefindSearchResults["results"] | undefined
  resultRefs: HTMLAnchorElement[]
  setResultRefs: Setter<HTMLAnchorElement[]>
  activeIndex: number
  setActiveIndex: Setter<number>
}

const SearchResults: Component<SearchResultsProps> = (props) => {
  const setResultRef = (i: number) => (el: HTMLAnchorElement) => {
    props.setResultRefs((refs) => {
      refs[i] = el
      return refs
    })
  }

  return (
    <>
      {props.results?.length === 0 ? (
        <div class="mx-auto my-8 text-fg-muted">
          No results found for <span class="font-bold text-fg-default">"{props.query}"</span>
        </div>
      ) : (
        <ol class="mt-3 flex flex-auto flex-col gap-2 overflow-y-auto">
          {props.results?.map((result, i) => (
            <Suspense>
              <SearchResult
                index={i}
                result={result}
                ref={setResultRef(i)}
                active={i === props.activeIndex}
                setActiveIndex={props.setActiveIndex}
              />
            </Suspense>
          ))}
        </ol>
      )}
    </>
  )
}

type SearchResultProps = {
  index: number
  result: PagefindSearchResult
  ref: (el: HTMLAnchorElement) => void
  active: boolean
  setActiveIndex: Setter<number>
}

const SearchResult: Component<SearchResultProps> = (props) => {
  const [result] = createResource(() => props.result.data())
  return (
    <li>
      <a
        class={twMerge(
          "flex flex-row gap-5 rounded-lg px-5 py-2 outline-none transition",
          props.active && "sm:bg-mauve-a4",
        )}
        href={result()?.raw_url}
        ref={props.ref}
        onFocus={() => props.setActiveIndex(props.index)}
        onMouseEnter={() => props.setActiveIndex(props.index)}
      >
        <div class="my-auto size-8 flex-none">
          {result()?.meta["image_svg"] ? (
            <div class="size-full" innerHTML={decodeURIComponent(result()!.meta["image_svg"])}></div>
          ) : (
            // Because `<Search />` is client only component, we can't use `<Icon />` here because it is server only component.
            // So we use static icon component `<HeroiconsDocumentText />` instead.
            <HeroiconsDocumentText class="size-full" />
          )}
        </div>
        <div class="flex flex-col gap-1">
          <div class="font-bold">{result()?.meta["title"]}</div>
          <div class="text-sm text-fg-subtle" innerHTML={result()?.excerpt} />
        </div>
      </a>
    </li>
  )
}
