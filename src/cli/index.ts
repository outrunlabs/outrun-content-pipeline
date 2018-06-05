import * as minimist from "minimist"

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

const buildAssets = () => {
    console.log("Building...")
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
