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
    twContainerClass: "bg-zinc-50/70 dark:bg-zinc-900/70",
    twTitleClass: "",
    icon: "heroicons-outline:information-circle",
  },
  info: {
    label: "Info",
    twContainerClass: "bg-zinc-50/70 dark:bg-zinc-900/70",
    twTitleClass: "",
    icon: "heroicons-outline:information-circle",
  },
  abstract: {
    label: "Abstract",
    twContainerClass: "border-purple-600/20 bg-purple-500/20 dark:border-purple-800/20",
    twTitleClass: "text-purple-500",
    icon: "heroicons:rocket-launch",
  },
  tldr: {
    label: "TL;DR",
    twContainerClass: "border-purple-600/20 bg-purple-500/20 dark:border-purple-800/20",
    twTitleClass: "text-purple-500",
    icon: "heroicons:rocket-launch",
  },
  todo: {
    label: "ToDo",
    twContainerClass: "border-blue-600/20 bg-blue-500/20 dark:border-blue-800/20",
    twTitleClass: "text-blue-500",
    icon: "heroicons:check-circle",
  },
  tip: {
    label: "Tip",
    twContainerClass: "border-green-600/20 bg-green-500/20 dark:border-green-800/20",
    twTitleClass: "text-green-500",
    icon: "heroicons-outline:light-bulb",
  },
  success: {
    label: "Success",
    twContainerClass: "border-green-600/20 bg-green-500/20 dark:border-green-800/20",
    twTitleClass: "text-green-500",
    icon: "heroicons:check",
  },
  question: {
    label: "Question",
    twContainerClass: "border-yellow-600/20 bg-yellow-500/20 dark:border-yellow-800/20",
    twTitleClass: "text-yellow-500",
    icon: "heroicons:question-mark-circle",
  },
  warning: {
    label: "Warning",
    twContainerClass: "border-orange-600/20 bg-orange-500/20 dark:border-orange-800/20",
    twTitleClass: "text-orange-500",
    icon: "heroicons-outline:exclamation",
  },
  caution: {
    label: "Caution",
    twContainerClass: "border-red-600/20 bg-red-500/20 dark:border-red-800/20",
    twTitleClass: "text-[#fb464c]",
    icon: "heroicons:shield-exclamation",
  },
  failure: {
    label: "Failure",
    twContainerClass: "border-red-600/20 bg-red-500/20 dark:border-red-800/20",
    twTitleClass: "text-[#fb464c]",
    icon: "heroicons:x-mark",
  },
  danger: {
    label: "Danger",
    twContainerClass: "border-red-600/20 bg-red-500/20 dark:border-red-800/20",
    twTitleClass: "text-[#fb464c]",
    icon: "heroicons:bolt",
  },
  bug: {
    label: "Bug",
    twContainerClass: "border-red-600/20 bg-red-500/20 dark:border-red-800/20",
    twTitleClass: "text-[#fb464c]",
    icon: "heroicons:bug-ant",
  },
  error: {
    label: "Error",
    twContainerClass: "border-red-600/20 bg-red-500/20 dark:border-red-800/20",
    twTitleClass: "text-[#fb464c]",
    icon: "heroicons:bolt",
  },
  important: {
    label: "Important",
    twContainerClass: "border-purple-600/20 bg-purple-500/20 dark:border-purple-800/20",
    twTitleClass: "text-purple-500",
    icon: "heroicons:fire",
  },
  example: {
    label: "Example",
    twContainerClass: "border-purple-600/20 bg-purple-500/20 dark:border-purple-800/20",
    twTitleClass: "text-purple-500",
    icon: "heroicons:list-bullet",
  },
  quote: {
    label: "Quote",
    twContainerClass: "border-gray-600/20 bg-gray-600/20 dark:border-gray-800/20",
    twTitleClass: "text-gray-500 dark:text-gray-400",
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
