import { Icon } from "@/components/Elements/Icon"
import { type Component, createSignal, onCleanup, onMount, Show, For } from "solid-js"

export type FeaturedItem = {
  title: string
  image: string
  link: string
}

export type FeaturedCarouselProps = {
  items: FeaturedItem[]
  autoPlayInterval?: number
}

export const FeaturedCarousel: Component<FeaturedCarouselProps> = (props) => {
  const interval = () => props.autoPlayInterval ?? 8000
  const [currentIndex, setCurrentIndex] = createSignal(0)
  let autoPlayTimer: ReturnType<typeof setInterval> | undefined

  const resetAutoPlay = () => {
    if (autoPlayTimer) clearInterval(autoPlayTimer)

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion || props.items.length <= 1) return

    autoPlayTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev === props.items.length - 1 ? 0 : prev + 1))
    }, interval())
  }

  onMount(() => {
    resetAutoPlay()
  })

  onCleanup(() => {
    if (autoPlayTimer) clearInterval(autoPlayTimer)
  })

  const goTo = (index: number) => {
    setCurrentIndex(index)
    resetAutoPlay()
  }

  const goToPrev = () => {
    const newIndex = currentIndex() === 0 ? props.items.length - 1 : currentIndex() - 1
    goTo(newIndex)
  }

  const goToNext = () => {
    const newIndex = currentIndex() === props.items.length - 1 ? 0 : currentIndex() + 1
    goTo(newIndex)
  }

  /**
   * スライドの相対位置を返す。
   *
   * -1(左), 0(中央), 1(右), null(非表示)
   */
  const getSlidePosition = (index: number): number | null => {
    const current = currentIndex()
    const total = props.items.length
    if (index === current) return 0
    if (index === (current - 1 + total) % total) return -1
    if (index === (current + 1) % total) return 1
    return null
  }

  return (
    <Show when={props.items.length > 0}>
      <div class="flex flex-col gap-3">
        <div class="relative mx-auto w-full overflow-hidden rounded-lg">
          <div class="relative aspect-[16/9] w-full sm:aspect-[2.5/1]">
            <For each={props.items}>
              {(item, index) => {
                const pos = () => getSlidePosition(index())
                const isVisible = () => pos() !== null

                return (
                  <div
                    class="absolute inset-y-0 transition-all duration-500 ease-in-out"
                    style={{
                      width: "70%",
                      left: (() => {
                        const p = pos()
                        if (p === 0) return "15%"
                        if (p === -1) return "-55%"
                        if (p === 1) return "85%"
                        return "115%"
                      })(),
                      opacity: isVisible() ? (pos() === 0 ? "1" : "0.5") : "0",
                      "z-index": pos() === 0 ? "2" : "1",
                      transform: pos() === 0 ? "scale(1)" : "scale(0.92)",
                    }}
                  >
                    <a
                      href={item.link}
                      class="block h-full w-full"
                      style={{
                        "pointer-events": pos() === 0 ? "auto" : "none",
                      }}
                      aria-hidden={pos() !== 0}
                      tabIndex={pos() === 0 ? 0 : -1}
                    >
                      <div class="h-full w-full overflow-hidden rounded-lg border bg-bg-default">
                        <img
                          src={item.image}
                          alt={item.title}
                          class="h-full w-full object-cover"
                          loading={index() === 0 ? "eager" : "lazy"}
                        />
                        {/* 画像内のテキストの可読性を確保するため、明示的に黒色のグラデーション背景を使用する */}
                        <div class="absolute inset-x-0 bottom-0 rounded-b-lg bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4 sm:p-6">
                          <h3 class="text-base font-bold text-white sm:text-xl md:text-2xl">{item.title}</h3>
                        </div>
                      </div>
                    </a>
                  </div>
                )
              }}
            </For>

            <Show when={props.items.length > 1}>
              <button
                type="button"
                onClick={goToPrev}
                class="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-mauve-a8 text-white backdrop-blur-sm transition-all hover:bg-mauve-a9 sm:left-4 sm:h-12 sm:w-12"
                aria-label="前のスライド"
              >
                <Icon name="tabler:chevron-left" class="h-5 w-5 sm:h-6 sm:w-6" />
              </button>

              <button
                type="button"
                onClick={goToNext}
                class="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-mauve-a8 text-white backdrop-blur-sm transition-all hover:bg-mauve-a9 sm:right-4 sm:h-12 sm:w-12"
                aria-label="次のスライド"
              >
                <Icon name="tabler:chevron-right" class="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            </Show>
          </div>
        </div>

        <Show when={props.items.length > 1}>
          <div class="flex items-center justify-center gap-2">
            <For each={props.items}>
              {(_, index) => (
                <button
                  type="button"
                  onClick={() => goTo(index())}
                  class={`h-2 rounded-full transition-all duration-300 ${
                    index() === currentIndex() ? "w-6 bg-mauve-11" : "w-2 bg-mauve-7 hover:bg-mauve-8"
                  }`}
                  aria-label={`スライド ${index() + 1} に移動`}
                  aria-current={index() === currentIndex() ? "true" : undefined}
                />
              )}
            </For>
          </div>
        </Show>
      </div>
    </Show>
  )
}
