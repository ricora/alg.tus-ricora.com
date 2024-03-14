import { CustomTerminal } from "@/lib/terminal"
import "@xterm/xterm/css/xterm.css"
import { onMount, type Component } from "solid-js"

export const Terminal: Component = () => {
  let terminalDiv: HTMLDivElement
  onMount(() => {
    new CustomTerminal(terminalDiv)
  })

  return <div ref={(el) => (terminalDiv = el)}></div>
}
