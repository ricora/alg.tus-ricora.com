import { type IconName } from "@/components/Elements/Icon"

export type LinkMenu = {
  type: "menu"
  title: string
  links: Link[]
}

export type Link = {
  type: "link"
  title: string
  description: string
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
        description: '"お知らせ"に関連する記事を表示します',
        href: "/categories/news",
        icon: "tabler:speakerphone",
      },
      {
        type: "link",
        title: "活動記録",
        description: '"活動記録"に関連する記事を表示します',
        href: "/categories/activities",
        icon: "tabler:book-2",
      },
      {
        type: "link",
        title: "作品紹介",
        description: '"作品紹介"に関連する記事を表示します',
        href: "/categories/works",
        icon: "tabler:sparkles",
      },
    ],
  },
  {
    type: "link",
    title: "アーカイブ",
    description: "過去の記事を表示します",
    href: "/archives",
    icon: "tabler:archive",
  },
  {
    type: "link",
    title: "RICORAについて",
    description: "RICORAについての情報を表示します",
    icon: "tabler:info-circle",
    href: "/about",
  },
  {
    type: "link",
    title: "お問い合わせ",
    description: "RICORAへのお問い合わせフォームを表示します",
    icon: "tabler:mail",
    href: "/contact",
  },
  {
    type: "link",
    title: "メンバー",
    description: "RICORAのメンバー一覧を表示します",
    icon: "tabler:users",
    href: "/members",
  },
  {
    type: "link",
    title: "リンク",
    description: "RICORAに関連するリンクを表示します",
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
