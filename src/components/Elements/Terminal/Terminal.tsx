import { CustomTerminal } from "@/lib/terminal"
import "@xterm/xterm/css/xterm.css"
import { onMount, type Component } from "solid-js"

export const Terminal: Component = () => {
  let terminalDiv: HTMLDivElement
  onMount(() => {
    new CustomTerminal(terminalDiv)
  })

  return (
    <div class="rounded-md bg-black">
      <div class="relative flex h-7 w-full flex-row items-center justify-center rounded-t-md bg-[#363636]">
        <div class="absolute left-0 top-0 flex h-full flex-row items-center gap-2 px-3">
          <div class="size-3 rounded-full bg-[#ED6A5E]" />
          <div class="size-3 rounded-full bg-[#F4BD50]" />
          <div class="size-3 rounded-full bg-[#61C454]" />
        </div>
        <div class="text-xs text-white/90">guest@ricora-alg</div>
      </div>
      <div class="*:*:rounded-md *:p-2" ref={(el) => (terminalDiv = el)}></div>
    </div>
  )
}
