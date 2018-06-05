import { request } from "./../../Common"

import * as Types from "./../../Types"

export class ImageImporter implements Types.Importer<Types.TextureContent> {
    public convert(url: string): Promise<Types.TextureContent> {
        return new Promise<Types.TextureContent>((res, rej) => {
            const image = new Image()
            console.log("using image: " + url)
            image.onload = () => {
                console.log("onload called")

                const { width, height } = image

                const canvas: HTMLCanvasElement = document.createElement("canvas")
                canvas.width = width
                canvas.height = height

                const context: CanvasRenderingContext2D = canvas.getContext("2d") as any

                context.drawImage(image, 0, 0)
                const imageData = context.getImageData(0, 0, width, height)

                const textureContent = new Types.TextureContent(width, height)

                for (let x = 0; x < width; x++) {
                    for (let y = 0; y < height; y++) {
                        const red = y * (width * 4) + x * 4
                        textureContent.setPixel(x, y, {
                            r: imageData.data[red],
                            g: imageData.data[red + 1],
                            b: imageData.data[red + 2],
                            a: imageData.data[red + 3],
                        })
                    }
                }
                console.log("resolving")

                res(textureContent)
            }

            image.onerror = err => {
                rej(err)
            }

            image.src = url
        })
    }
}
