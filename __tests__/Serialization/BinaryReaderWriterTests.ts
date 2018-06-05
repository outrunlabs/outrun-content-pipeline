import { BinaryWriter } from "./../../src/Serialization/BinaryWriter"
import { BinaryReader } from "./../../src/Serialization/BinaryReader"

describe("BinaryWriter / BinaryReader", () => {
    it("reads & writes strings", () => {
        const ab = new ArrayBuffer(1024)
        const bw = new BinaryWriter(ab)

        bw.writeString("Hello world")

        const br = new BinaryReader(ab)
        const val = br.readString()

        expect(val).toEqual("Hello world")
    })
})
