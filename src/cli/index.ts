import * as minimist from "minimist"
import * as path from "path"

import { Pipeline } from "./../Build/Pipeline"

const args = minimist(process.argv.slice(2))

const verbs = args._

const printHelp = () => {
    console.log(`
    outrun-content-build

    The following commands are supported:

    build
    help
    `)
}

if (verbs.length === 0) {
    printHelp()
    process.exit(0)
}

export const instantiateDOM = () => {
    if (typeof window === "undefined") {
        const { JSDOM } = require("jsdom")
        const dom = new JSDOM("", { resources: "usable" })
        const globalAsAny = global as any
        globalAsAny["document"] = dom.window.document
        globalAsAny["window"] = dom.window
        globalAsAny["Image"] = dom.window.Image
    }
}

const buildAssets = () => {
    console.log("Instantiating DOM...")
    instantiateDOM()
    console.log("Building...")

    const contentPath = path.join(process.cwd(), "content")
    const outputPath = path.join(process.cwd(), "dist", "content")

    const pipeline = new Pipeline({ inputPath: contentPath, outputPath })

    pipeline.build().then(res => {
        console.log("-- Build complete!")
    })
}

const commandToHandler: any = {
    build: buildAssets,
    help: printHelp,
}

const handler = commandToHandler[verbs[0]]

if (handler) {
    handler()
} else {
    console.warn("Unrecognized command: " + verbs[0])
}
