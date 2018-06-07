import * as fs from "fs"
import * as path from "path"

import * as glob from "glob"
import * as mkdirp from "mkdirp"

import * as Importers from "./Importers"
import * as Writers from "./Writers"

import * as Types from "./../Types"

export interface PipelineContext {
    inputPath: string
    outputPath: string
}

interface ImporterMetadata {
    outputType: string
    importer: Types.Importer<any>
}

export class Pipeline {
    private _extensionToImporter: { [key: string]: ImporterMetadata } = {}
    private _typeToWriter: { [key: string]: Types.Writer<any> } = {}

    constructor(private _context: PipelineContext) {
        // this.registerImporter("bmp", "TextureContent", new Importers.ImageImporter())
        this.registerImporter("jpg", "TextureContent", new Importers.ImageImporter())
        this.registerImporter("png", "TextureContent", new Importers.ImageImporter())

        this.registerWriter("TextureContent", new Writers.TextureContentWriter())
    }

    registerImporter<T>(extension: string, outputType: string, importer: Types.Importer<T>) {
        this._extensionToImporter["." + extension] = {
            outputType,
            importer,
        }
    }

    registerWriter<T>(inputType: string, writer: Types.Writer<T>) {
        this._typeToWriter[inputType] = writer
    }

    public build(): Promise<void> {
        const files = glob.sync(path.join(this._context.inputPath, "**", "*.*"))

        const allPromises = files.map(async f => {
            const extension = path.extname(f)
            console.log("Extension: " + extension)

            const importer = this._extensionToImporter[extension]
            if (!importer) {
                console.error("No importer found for file, skipping: " + f)
                return
            }

            console.log("-- Importing file: " + f + "[" + importer.outputType + "]")
            const content = await importer.importer.convert(f)
            console.log("-- File import complete for: " + f)

            const writer = this._typeToWriter[importer.outputType]

            if (!writer) {
                console.error("No writer found for content type: " + importer.outputType)
                process.exit(1)
            }

            console.log("-- Serializing content: " + f)
            const buffer = await writer.write(content)
            console.log("-- Content serialization complete.")

            mkdirp.sync(this._context.outputPath)

            const outputFileName = path.basename(f).split(".")[0] + ".orb"
            console.log("-- Writing to: " + outputFileName)
            fs.writeFileSync(path.join(this._context.outputPath, outputFileName), buffer)
            console.log("-- Write complete: " + outputFileName)
        })

        return Promise.all(allPromises).then(() => {})
    }
}
