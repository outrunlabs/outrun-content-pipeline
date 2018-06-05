export const getEncoder = (): TextEncoder => {
    let ctor = null
    if (window && window.TextEncoder) {
        ctor = window.TextEncoder
    } else {
        ctor = require("text-encoding").TextEncoder
    }

    return new ctor()
}

export const getDecoder = (): TextDecoder => {
    let ctor = null
    if (window && window.TextDecoder) {
        ctor = window.TextDecoder
    } else {
        ctor = require("text-encoding").TextDecoder
    }

    return new ctor()
}
