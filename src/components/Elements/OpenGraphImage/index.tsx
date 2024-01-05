import { loadDefaultJapaneseParser } from "budoux"
import fs from "node:fs"
import satori from "satori"
import sharp from "sharp"

type Props = {
  title: string
  category: string
  tags: string[]
}

const titleFont = fs.readFileSync("src/assets/fonts/kinto-sans/KintoSans-Bold.otf")
const categoryFont = fs.readFileSync("src/assets/fonts/kinto-sans/KintoSans-Regular.otf")
const tagFont = fs.readFileSync("src/assets/fonts/kinto-sans/KintoSans-Medium.otf")
const backgroundImage = fs.readFileSync("src/assets/opengraph/background.png").toString("base64")

const parser = loadDefaultJapaneseParser()

export const getOgImage = async (props: Props): Promise<Buffer> => {
  const svg = await satori(
    {
      type: "div",
      props: {
        children: [
          {
            type: "div",
            props: {
              children: [
                props.tags.map((tag) => {
                  return {
                    type: "span",
                    props: {
                      children: `#${tag}`,
                      style: {
                        backgroundColor: "#2C3E50",
                        whiteSpace: "nowrap",
                        marginRight: "15px",
                        padding: "18px 8px 2px 8px",
                      },
                    },
                  }
                }),
              ],
              style: {
                display: "flex",
                position: "absolute",
                top: "80px",
                left: "95px",
                fontFamily: "kinto-sans",
                fontWeight: 500,
                fontSize: "35px",
                color: "#FFFFFF",
              },
            },
          },
          {
            type: "div",
            props: {
              children: [
                parser.parse(props.title).map((semanticChunk) => {
                  return {
                    type: "span",
                    props: {
                      children: semanticChunk,
                      style: {
                        display: "block",
                      },
                    },
                  }
                }),
              ],
              style: {
                display: "flex",
                flexWrap: "wrap",
                textOverflow: "ellipsis",
                position: "absolute",
                top: "185px",
                left: "95px",
                width: "1010px",
                fontFamily: "kinto-sans",
                fontWeight: 700,
                fontSize: "75px",
                color: "#222222",
                lineHeight: 1.4,
              },
            },
          },
          {
            type: "div",
            props: {
              children: props.category.toUpperCase(),
              style: {
                fontFamily: "kinto-sans",
                fontWeight: 400,
                fontSize: "50px",
                color: "#2C3E50",
                display: "flex",
                position: "absolute",
                top: "505px",
                left: "95px",
              },
            },
          },
        ],
        style: {
          display: "flex",
          width: 1200,
          height: 630,
          backgroundImage: `url(data:image/png;base64,${backgroundImage})`,
          backgroundSize: "1200px 630px",
        },
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "kinto-sans",
          data: titleFont,
          weight: 700,
        },
        {
          name: "kinto-sans",
          data: categoryFont,
          weight: 400,
        },
        {
          name: "kinto-sans",
          data: tagFont,
          weight: 500,
        },
      ],
    },
  )

  return await sharp(Buffer.from(svg)).png().toBuffer()
}
