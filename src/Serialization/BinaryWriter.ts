import { getEncoder } from "./DecoderFactory"

export class BinaryWriter {
    private _position: number = 0
    private _view: DataView

    constructor(private _arrayBuffer: ArrayBuffer) {
        this._view = new DataView(this._arrayBuffer)
    }

    public writeUint8(n: number): void {
        this._view.setUint8(this._position, n)
        this._position += 1
    }

    public writeUint16(n: number): void {
        this._view.setUint16(this._position, n)
        this._position += 2
    }

    public writeString(s: string): void {
        const encoder = getEncoder()
        const byteArray = encoder.encode(s)

        this.writeUint16(byteArray.length)

        for (let i = 0; i < byteArray.length; i++) {
            this.writeUint8(byteArray[i])
        }
    }
}
