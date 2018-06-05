import { getDecoder } from "./DecoderFactory"

export class BinaryReader {
    private _position: number = 0
    private _view: DataView

    constructor(private _arrayBuffer: ArrayBuffer) {
        this._view = new DataView(this._arrayBuffer)
    }

    public readUint8(): number {
        const val = this._view.getUint8(this._position)
        this._position += 1
        return val
    }

    public readUint16(): number {
        const val = this._view.getUint16(this._position)
        this._position += 2
        return val
    }

    public readString(): string {
        const length = this.readUint16()

        const bytes: Uint8Array = new Uint8Array(length)

        for (let i = 0; i < length; i++) {
            const byte = this.readUint8()
            bytes[i] = byte
        }

        const decoder = getDecoder()
        return decoder.decode(bytes)
    }
}
