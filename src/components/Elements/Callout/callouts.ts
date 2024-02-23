import type { IconName } from "../Icon"

type Callout = {
  label: string
  twContainerClass: string
  twTitleClass: string
  icon: IconName
}

type Callouts = {
  [key: string]: Readonly<Callout>
}

export const callouts = {
  note: {
    label: "Note",
    twContainerClass: "border-mauve-a4 bg-mauve-a2",
    twTitleClass: "",
    icon: "heroicons-outline:information-circle",
  },
  info: {
    label: "Info",
    twContainerClass: "border-mauve-a4 bg-mauve-a2",
    twTitleClass: "",
    icon: "heroicons-outline:information-circle",
  },
  abstract: {
    label: "Abstract",
    twContainerClass: "border-purple-a4 bg-purple-a2 dark:border-purple-a3",
    twTitleClass: "text-purple-10",
    icon: "heroicons:rocket-launch",
  },
  tldr: {
    label: "TL;DR",
    twContainerClass: "border-purple-a4 bg-purple-a2 dark:border-purple-a3",
    twTitleClass: "text-purple-a10",
    icon: "heroicons:rocket-launch",
  },
  todo: {
    label: "ToDo",
    twContainerClass: "border-blue-a4 bg-blue-a2 dark:border-blue-a3",
    twTitleClass: "text-blue-a10",
    icon: "heroicons:check-circle",
  },
  tip: {
    label: "Tip",
    twContainerClass: "border-green-a4 bg-green-a2 dark:border-green-a3",
    twTitleClass: "text-green-a10",
    icon: "heroicons-outline:light-bulb",
  },
  success: {
    label: "Success",
    twContainerClass: "border-green-a4 bg-green-a2 dark:border-green-a3",
    twTitleClass: "text-green-10",
    icon: "heroicons:check",
  },
  question: {
    label: "Question",
    twContainerClass: "border-amber-a4 bg-amber-a2 dark:border-amber-a3",
    twTitleClass: "text-amber-a10 dark:text-amber-a9",
    icon: "heroicons:question-mark-circle",
  },
  warning: {
    label: "Warning",
    twContainerClass: "border-orange-a4 bg-orange-a2 dark:border-orange-a3",
    twTitleClass: "text-orange-a10",
    icon: "heroicons-outline:exclamation",
  },
  caution: {
    label: "Caution",
    twContainerClass: "border-red-a4 bg-red-a2 dark:border-red-a3",
    twTitleClass: "text-red-10",
    icon: "heroicons:shield-exclamation",
  },
  failure: {
    label: "Failure",
    twContainerClass: "border-red-a4 bg-red-a2 dark:border-red-a3",
    twTitleClass: "text-red-a10",
    icon: "heroicons:x-mark",
  },
  danger: {
    label: "Danger",
    twContainerClass: "border-red-a4 bg-red-a2 dark:border-red-a3",
    twTitleClass: "text-red-a10",
    icon: "heroicons:bolt",
  },
  bug: {
    label: "Bug",
    twContainerClass: "border-red-a4 bg-red-a2 dark:border-red-a3",
    twTitleClass: "text-red-a10",
    icon: "heroicons:bug-ant",
  },
  error: {
    label: "Error",
    twContainerClass: "border-red-a4 bg-red-a2 dark:border-red-a3",
    twTitleClass: "text-red-a10",
    icon: "heroicons:bolt",
  },
  important: {
    label: "Important",
    twContainerClass: "border-purple-a4 bg-purple-a2 dark:border-purple-a3",
    twTitleClass: "text-purple-a10",
    icon: "heroicons:fire",
  },
  example: {
    label: "Example",
    twContainerClass: "border-purple-a4 bg-purple-a2 dark:border-purple-a3",
    twTitleClass: "text-purple-a10",
    icon: "heroicons:list-bullet",
  },
  quote: {
    label: "Quote",
    twContainerClass: "border-mauve-a4 bg-mauve-a2",
    twTitleClass: "",
    icon: "tabler:quote",
  },
} as const satisfies Callouts

export type CalloutKind = keyof typeof callouts

const hasCallout = (kind: string): kind is CalloutKind => kind in callouts

export const getCallout = (kind: string) => {
  const key = kind.toLowerCase()
  if (hasCallout(key)) {
    return callouts[key]
  }
  return callouts.note
}
