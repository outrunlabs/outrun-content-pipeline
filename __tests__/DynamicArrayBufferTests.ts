import { DynamicArrayBuffer } from "./../src/Serialization/DynamicArrayBuffer"

const createArrayBufferWithSingleByte = (b: number): ArrayBuffer => {
    const ab = new ArrayBuffer(1)
    const view = new DataView(ab)
    view.setUint8(0, b)
    return ab
}

describe("DynamicArrayBuffer", () => {
    it("concatenates basic array buffers", () => {
        const ab1 = createArrayBufferWithSingleByte(0)
        const ab2 = createArrayBufferWithSingleByte(64)
        const ab3 = createArrayBufferWithSingleByte(128)

        const dynamicArrayBuffer = new DynamicArrayBuffer()
        dynamicArrayBuffer.concat(ab1)
        dynamicArrayBuffer.concat(ab2)
        dynamicArrayBuffer.concat(ab3)

        expect(dynamicArrayBuffer.byteLength).toBe(3)

        const view = new DataView(dynamicArrayBuffer.toArrayBuffer())

        expect(view.getUint8(0)).toBe(0)
        expect(view.getUint8(1)).toBe(64)
        expect(view.getUint8(2)).toBe(128)
    })
})
