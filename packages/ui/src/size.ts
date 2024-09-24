export enum Size {
    SMALL,
    MEDIUM,
    LARGE,
}

export function getSizeStyles(size: Size) {
    switch (size) {
        case Size.SMALL:
            return 'py-1 px-4 rounded shadow'
        case Size.MEDIUM:
            return 'py-1.5 px-6 rounded-md shadow-md'
        case Size.LARGE:
            return 'py-2 px-8 rounded-lg shadow-lg'
    }
}

export function getInputSizeStyles(size: Size) {
    switch (size) {
        case Size.SMALL:
            return 'px-2 py-1 rounded shadow'
        case Size.MEDIUM:
            return 'px-3 py-1.5 rounded-md shadow-md'
        case Size.LARGE:
            return 'px-4 py-2 rounded-lg shadow-lg'
    }
}
