



export function storageRemoveItem(key: string) {
    return localStorage.removeItem(key)
}

export function storageAddItem(key: string, data: unknown) {
    const serializeData = JSON.stringify(data)
    return localStorage.setItem(key, serializeData)
}

export function storageGetItem(key: string, parsedata?: boolean) {
    const getData = localStorage.getItem(key)
    if (parsedata) {
        const serializeData = JSON.parse(getData || "{}")
        return serializeData
    }

    return getData

}

