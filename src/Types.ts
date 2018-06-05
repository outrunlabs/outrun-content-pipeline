export type Byte = number

export interface Color {
    r: Byte
    b: Byte
    g: Byte
    a: Byte
}

export interface Importer<T> {
    convert(url: string): Promise<T>
}

export class TextureContent {
    private _colors: Color[]

    public get width(): number {
        return this._width
    }

    public get height(): number {
        return this._height
    }

    constructor(private _width: number, private _height: number) {
        this._colors = new Array(this._width * this._height)
    }

    public setPixel(x: number, y: number, color: Color): void {
        const off = y * this._width + x
        this._colors[off] = color
    }

    public getPixel(x: number, y: number): Color {
        const off = y * this._width + x
        return this._colors[off]
    }
}
