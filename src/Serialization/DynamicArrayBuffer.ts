/**
 * A collection of ArrayBuffers - for when you don't know the size up front!
 */
export class DynamicArrayBuffer {
    private _buffers: ArrayBuffer[] = []
    private _byteLength: number = 0

    public get byteLength(): number {
        return this._byteLength
    }

    public concat(buffer: ArrayBuffer): void {
        this._buffers.push(buffer)
        this._byteLength += buffer.byteLength
    }

    public toArrayBuffer(): ArrayBuffer {
        const outputBuffer = new ArrayBuffer(this.byteLength)
        const outputView = new DataView(outputBuffer)
        let outputCursor = 0

        for (let idx = 0; idx < this._buffers.length; idx++) {
            const ab = this._buffers[idx]

            const v = new DataView(ab)

            for (let i = 0; i < ab.byteLength; i++) {
                const byte = v.getUint8(i)
                outputView.setUint8(outputCursor, byte)
                outputCursor++
            }
        }

        return outputBuffer
    }
}
