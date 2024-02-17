import { createSignal, type Component } from "solid-js"

export const Counter: Component = () => {
  const [count, setCount] = createSignal(0)

  const increment = () => setCount((prev) => prev + 1)
  const decrement = () => setCount((prev) => prev - 1)

  return (
    <div class="space-x-2">
      <div class="p-2">Count: {count()}</div>
      <button onClick={increment} class="rounded border p-2 font-mono">
        +1
      </button>
      <button onClick={decrement} class="rounded border p-2 font-mono">
        -1
      </button>
    </div>
  )
}
