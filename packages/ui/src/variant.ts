export enum Variant {
    PRIMARY,
    SECONDARY,
    TERTIARY,
}

export function getVariantStyles(variant: Variant) {
    switch (variant) {
        case Variant.PRIMARY:
            return 'bg-red-500 outline-red-500 hover:bg-red-600 active:bg-red-700 text-white'
        case Variant.SECONDARY:
            return 'bg-emerald-500 outline-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white'
        case Variant.TERTIARY:
            return 'bg-blue-500 outline-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white'
    }
}

export function getVariantOutlineStyles(variant: Variant) {
    switch (variant) {
        case Variant.PRIMARY:
            return 'outline-red-500'
        case Variant.SECONDARY:
            return 'outline-emerald-500'
        case Variant.TERTIARY:
            return 'outline-blue-500'
    }
}

export function getVariantBorderStyles(variant: Variant) {
    switch (variant) {
        case Variant.PRIMARY:
            return 'border-2 border-red-500'
        case Variant.SECONDARY:
            return 'border-2 border-emerald-500'
        case Variant.TERTIARY:
            return 'border-2 border-blue-500'
    }
}

export function getVariantInputTextStyles(variant: Variant) {
    switch (variant) {
        case Variant.PRIMARY:
            return 'text-black'
        case Variant.SECONDARY:
            return 'text-black'
        case Variant.TERTIARY:
            return 'text-black'
    }
}
