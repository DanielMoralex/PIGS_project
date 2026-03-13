enum Bytes {
    Kilobytes = "KB",
    Megabytes = "MB",
    Gigabytes = "GB",
}

type FileSize = {
    size: number;
    unit: Bytes
}

export {FileSize, Bytes};