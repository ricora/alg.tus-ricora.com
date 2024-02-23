import { Search } from "@/components/Elements/Search/Search"
import { Dialog } from "@ark-ui/solid"
import { createShortcut } from "@solid-primitives/keyboard"
import { createSignal, type Component, type JSX } from "solid-js"
import { Portal } from "solid-js/web"

type SearchModalProps = {
  buttonIcon?: JSX.Element
  searchIcon?: JSX.Element
}
export const SearchModal: Component<SearchModalProps> = (props) => {
  const [isOpen, setIsOpen] = createSignal(false)
  const toggleIsOpen = () => setIsOpen((isOpen) => !isOpen)

  createShortcut(["Control", "K"], toggleIsOpen, { preventDefault: true })

  return (
    <Dialog.Root closeOnEscapeKeyDown closeOnInteractOutside open={isOpen()} onOpenChange={(e) => setIsOpen(e.open)}>
      <Dialog.Trigger class="flex flex-row gap-4 rounded-md p-2 text-fg-muted transition hover:bg-bg-muted hover:text-fg-default">
        {props.buttonIcon}
        <span>検索</span>
      </Dialog.Trigger>
      <Portal mount={document.querySelector("#modal")!}>
        <Dialog.Backdrop class="h-dvh w-dvw bg-black/50 opacity-100 transition-opacity data-[state=closed]:opacity-0" />
        <Dialog.Positioner class="absolute left-[50dvw] top-[10dvh] h-fit max-h-[80dvh] w-[90dvw] max-w-screen-md -translate-x-1/2">
          <Dialog.Content>
            <Search searchIcon={props.searchIcon} class="h-fit max-h-[80dvh]" />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
