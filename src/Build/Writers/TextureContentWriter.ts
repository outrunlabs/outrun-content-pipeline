import { request } from "./../../Common"

import * as Types from "./../../Types"

export class TextureContentWriter implements Types.Writer<Types.TextureContent> {
    public write(textureContent: Types.TextureContent): Promise<ArrayBuffer> {
        return Promise.resolve(new ArrayBuffer(1))
    }
}
