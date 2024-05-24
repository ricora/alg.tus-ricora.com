import { type IconName } from "@/components/Elements/Icon"

export type LinkMenu = {
  type: "menu"
  title: string
  links: Link[]
}

export type Link = {
  type: "link"
  title: string
  icon: IconName
  href: string
}

export type SocialLink = {
  label: string
  icon: IconName
  href: string
}

export const links = [
  {
    type: "menu",
    title: "記事",
    links: [
      {
        type: "link",
        title: "お知らせ",
        href: "/categories/news",
        icon: "tabler:speakerphone",
      },
      {
        type: "link",
        title: "活動記録",
        href: "/categories/activities",
        icon: "tabler:book-2",
      },
      {
        type: "link",
        title: "作品紹介",
        href: "/categories/works",
        icon: "tabler:palette",
      },
    ],
  },
  {
    type: "link",
    title: "アーカイブ",
    href: "/archives",
    icon: "tabler:archive",
  },
  {
    type: "link",
    title: "RICORAについて",
    icon: "tabler:info-circle",
    href: "/about",
  },
  {
    type: "link",
    title: "お問い合わせ",
    icon: "tabler:mail",
    href: "/contact",
  },
  {
    type: "link",
    title: "メンバー",
    icon: "tabler:users",
    href: "/members",
  },
  {
    type: "link",
    title: "リンク",
    icon: "tabler:link",
    href: "/links",
  },
] as const satisfies (LinkMenu | Link)[]

export const socialLinks = [
  {
    label: "GitHub",
    icon: "tabler:brand-github",
    href: "https://github.com/RICORA/",
  },
  {
    label: "X (旧Twitter)",
    icon: "tabler:brand-x",
    href: "https://twitter.com/ricora_alg/",
  },
  {
    label: "YouTube",
    icon: "tabler:brand-youtube",
    href: "https://www.youtube.com/channel/UC4qBY_aaTvTkQ3E0PY89T2A/",
  },
] as const satisfies SocialLink[]
