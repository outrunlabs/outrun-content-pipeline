export const getEncoder = (): TextEncoder => {
    let ctor = null
    if (typeof TextEncoder !== "undefined") {
        ctor = TextEncoder
    } else {
        ctor = require("text-encoding").TextEncoder
    }

    return new ctor()
}

export const getDecoder = (): TextDecoder => {
    let ctor = null
    if (typeof TextDecoder !== "undefined") {
        ctor = TextDecoder
    } else {
        ctor = require("text-encoding").TextDecoder
    }

    return new ctor()
}
