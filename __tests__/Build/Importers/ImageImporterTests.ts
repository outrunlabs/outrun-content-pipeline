import { request } from "./../../../src/Common"
import { ImageImporter } from "./../../../src/Build/Importers/ImageImporter"

describe("ImageImporter", () => {
    it("reads back items in correct order", async () => {
        const canvas = document.createElement("canvas")
        canvas.width = 2
        canvas.height = 2
        const context = canvas.getContext("2d")

        context.fillStyle = "#F00"
        context.fillRect(0, 0, 1, 1)

        context.fillStyle = "#0F0"
        context.fillRect(1, 0, 1, 1)

        context.fillStyle = "#00F"
        context.fillRect(0, 1, 1, 1)

        context.fillStyle = "#FFF"
        context.fillRect(1, 1, 1, 1)

        const imageUrl = canvas.toDataURL("image/png")
        console.log("request complete")

        const importer = new ImageImporter()
        const content = await importer.convert(imageUrl)

        expect(content.width).toEqual(2)
        expect(content.height).toEqual(2)

        expect(content.getPixel(0, 0)).toEqual({ r: 255, g: 0, b: 0, a: 255 })
        expect(content.getPixel(1, 0)).toEqual({ r: 0, g: 255, b: 0, a: 255 })
        expect(content.getPixel(0, 1)).toEqual({ r: 0, g: 0, b: 255, a: 255 })
        expect(content.getPixel(1, 1)).toEqual({ r: 255, g: 255, b: 255, a: 255 })
    })
})
