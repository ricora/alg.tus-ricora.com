import type { IconifyJSON } from "@iconify/iconify"
import { getIconifyIcon } from "@/lib/iconify"
import atcoderSvg from "./atcoder.svg?raw"
import qiitaSvg from "./qiita.svg?raw"
import hatenaBlogSvg from "./hatenablog.svg?raw"
import noteSvg from "./note.svg?raw"
import zennSvg from "./zenn.svg?raw"
import ricoraSvg from "./ricora.svg?raw"

export const brandIconCollection = {
  prefix: "brand",
  icons: {
    atcoder: getIconifyIcon(atcoderSvg),
    qiita: getIconifyIcon(qiitaSvg),
    hatenablog: getIconifyIcon(hatenaBlogSvg),
    note: getIconifyIcon(noteSvg),
    zenn: getIconifyIcon(zennSvg),
    ricora: getIconifyIcon(ricoraSvg),
  },
  width: 24,
  height: 24,
} as const satisfies IconifyJSON
