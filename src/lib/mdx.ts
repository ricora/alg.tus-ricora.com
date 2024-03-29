import { Callout, CalloutTitle } from "@/components/Elements/Callout"
import { CodeBlock } from "@/components/Elements/CodeBlock"
import { OEmbed } from "@/components/Elements/Embed"
import { LinkCard } from "@/components/Elements/LinkCard"
import { Code } from "@/components/ui/Code"

export const mdxComponents = {
  callout: Callout,
  "callout-title": CalloutTitle,
  pre: CodeBlock,
  "link-card": LinkCard,
  oembed: OEmbed,
  "inline-code": Code,
}
