import { createResource, type Component, type ComponentProps } from "solid-js"
import type { IconData, IconName } from "./type"
import Iconify from "@iconify/iconify/dist/iconify.js"
import { brandIconCollection } from "@/assets/icons/brand"
import { Dynamic, NoHydration, isServer, renderToString } from "solid-js/web"

Iconify.addCollection(brandIconCollection)

const getIconData = async (icon: string): Promise<IconData> => {
  await Iconify.loadIcon(icon)

  const iconData = Iconify.getIcon(icon)
  if (!iconData) throw new Error(`Icon ${icon} not found`)

  return {
    left: iconData.left,
    top: iconData.top,
    width: iconData.width,
    height: iconData.height,
    body: iconData.body,
  }
}

const Svg: Component<{ iconData: IconData | undefined; alt: string | undefined }> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`${props.iconData?.left} ${props.iconData?.top} ${props.iconData?.width} ${props.iconData?.height}`}
      fill="none"
      style="width:100%"
    >
      {props.alt && <title>{props.alt}</title>}
      <Dynamic component={props.iconData?.body} />
    </svg>
  )
}

export type IconProps = ComponentProps<"div"> & {
  name: IconName
  alt?: string
  pagefindImage?: boolean
}

const IconComponent: Component<IconProps> = (props) => {
  if (!isServer) {
    // eslint-disable-next-line no-console
    console.error("Icon component should only be used on the server")
    return null
  }

  const [iconData] = createResource(() => getIconData(props.name))
  const svg = <Svg iconData={iconData()} alt={props.alt} />

  const shouldSetPagefindMeta = props.pagefindImage && isServer

  return (
    <div
      {...props}
      data-pagefind-meta={shouldSetPagefindMeta && `image_svg:${encodeURIComponent(renderToString(() => svg))}`}
    >
      {svg}
    </div>
  )
}

export const Icon: Component<IconProps> = (props) => {
  return (
    <NoHydration>
      <IconComponent {...props} />
    </NoHydration>
  )
}
