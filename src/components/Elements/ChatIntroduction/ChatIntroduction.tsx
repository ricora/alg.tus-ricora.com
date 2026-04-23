import { createSignal, onCleanup, onMount, For, Show } from "solid-js"
import { Icon } from "@/components/Elements/Icon"

type Message = {
  role: "user" | "assistant"
  content: string
}

const SCRIPT: Message[] = [
  { role: "user", content: "RICORA Programming Teamってどんなサークルですか？" },
  {
    role: "assistant",
    content:
      "東京理科大学 野田キャンパスで活動するプログラミングサークルです。低レイヤーの探究から競技プログラミング、CTF、ゲーム制作、Web開発など、多岐にわたり活動しています！",
  },
  { role: "user", content: "プログラミング初心者でも大丈夫ですか？" },
  {
    role: "assistant",
    content:
      "もちろん大歓迎です！先輩が優しくサポートしますし、有志による講習会や勉強会もあるので、ゼロからでも楽しく学べますよ。",
  },
  { role: "user", content: "面白そう！" },
  {
    role: "assistant",
    content: "ありがとうございます！活動記録や作品紹介もぜひチェックしてみてくださいね。",
  },
]

export const ChatIntroduction = () => {
  const [visibleIndex, setVisibleIndex] = createSignal(-1)
  const [typingText, setTypingText] = createSignal("")
  const [isTyping, setIsTyping] = createSignal(false)

  let observerRef: HTMLDivElement | undefined
  let observer: IntersectionObserver | undefined
  const timeoutIds = new Set<number>()
  const intervalIds = new Set<number>()

  const scheduleTimeout = (callback: () => void, delay: number) => {
    const timeoutId = window.setTimeout(() => {
      timeoutIds.delete(timeoutId)
      callback()
    }, delay)
    timeoutIds.add(timeoutId)
  }

  onMount(() => {
    observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && visibleIndex() === -1) {
          observer?.disconnect()
          startNext(0)
        }
      },
      { threshold: 0.3 },
    )
    if (observerRef) observer.observe(observerRef)
  })

  onCleanup(() => {
    observer?.disconnect()
    for (const timeoutId of timeoutIds) {
      window.clearTimeout(timeoutId)
    }
    timeoutIds.clear()
    for (const intervalId of intervalIds) {
      window.clearInterval(intervalId)
    }
    intervalIds.clear()
  })

  const startNext = (idx: number) => {
    if (idx >= SCRIPT.length) return

    setVisibleIndex(idx)
    const msg = SCRIPT[idx]

    if (msg.role === "user") {
      scheduleTimeout(() => {
        startNext(idx + 1)
      }, 800)
    } else {
      setIsTyping(true)
      setTypingText("")
      let charIndex = 0
      const intervalId = window.setInterval(() => {
        setTypingText(msg.content.slice(0, charIndex + 1))
        charIndex++
        if (charIndex >= msg.content.length) {
          window.clearInterval(intervalId)
          intervalIds.delete(intervalId)
          setIsTyping(false)
          scheduleTimeout(() => {
            startNext(idx + 1)
          }, 600)
        }
      }, 40)
      intervalIds.add(intervalId)
    }
  }

  return (
    <div
      ref={observerRef}
      class={`w-full ${visibleIndex() >= 0 ? "flex flex-col gap-6 pt-2 duration-700 animate-in fade-in" : ""}`}
    >
      <For each={SCRIPT}>
        {(msg, i) => (
          <div
            class={`flex flex-row items-start gap-4 ${msg.role === "user" ? "justify-end" : ""}`}
            style={{ display: visibleIndex() >= i() ? "flex" : "none" }}
          >
            {msg.role === "assistant" && (
              <div class="flex size-10 flex-none items-center justify-center overflow-hidden rounded-full border border-border-muted bg-bg-default">
                <Icon name="brand:ricora" class="size-7" />
              </div>
            )}

            <div
              class={`max-w-[85%] border border-border-muted bg-bg-muted px-5 py-3 text-fg-default ${
                msg.role === "user" ? "rounded-2xl rounded-tr-sm" : "rounded-2xl rounded-tl-sm"
              }`}
            >
              <p class="whitespace-pre-wrap text-sm leading-relaxed md:text-base">
                {visibleIndex() === i() && msg.role === "assistant" && isTyping() ? typingText() : ""}
                {visibleIndex() > i() ||
                (visibleIndex() === i() && msg.role === "user") ||
                (visibleIndex() === i() && msg.role === "assistant" && !isTyping())
                  ? msg.content
                  : ""}
                <Show when={visibleIndex() === i() && isTyping()}>
                  <span class="animate-pulse">▍</span>
                </Show>
              </p>
            </div>

            {msg.role === "user" && (
              <div class="flex size-10 flex-none items-center justify-center overflow-hidden rounded-full border border-border-muted bg-bg-default">
                {(i() / 2) % 3 === 0 && <Icon name="fluent-emoji:cat-face" class="size-7" />}
                {(i() / 2) % 3 === 1 && <Icon name="fluent-emoji:fox" class="size-7" />}
                {(i() / 2) % 3 === 2 && <Icon name="fluent-emoji:penguin" class="size-7" />}
              </div>
            )}
          </div>
        )}
      </For>
    </div>
  )
}
