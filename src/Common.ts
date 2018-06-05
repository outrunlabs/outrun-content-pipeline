export const request = (url: string): Promise<ArrayBuffer> => {
    return new Promise<ArrayBuffer>((res, rej) => {
        const xhr = new XMLHttpRequest()
        console.log("Requesting url: " + url)
        xhr.open("GET", url, true)
        xhr.responseType = "arraybuffer"

        xhr.onload = () => {
            console.log("xhr::onload")
            const arrayBuffer = xhr.response

            if (arrayBuffer) {
                res(arrayBuffer)
            }
        }

        xhr.onerror = err => {
            rej(err)
        }

        xhr.send()
    })
}
