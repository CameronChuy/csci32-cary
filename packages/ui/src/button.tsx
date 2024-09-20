'use client'

import { ReactNode } from 'react'
import { Size } from './size'
import { Variant } from './variant'

interface ButtonProps {
    children: ReactNode
    className?: string
    href?: string
    onClick?: () => void
    size?: Size
    variant?: Variant
}

export const Button = ({
    children,
    className,
    href,
    onClick,
    size = Size.MEDIUM,
    variant = Variant.PRIMARY,
}: ButtonProps) => {
    let sizeCssClasses = ''
    switch (size) {
        case Size.SMALL:
            sizeCssClasses = 'py-1 px-4 rounded shadow'
            break
        case Size.MEDIUM:
            sizeCssClasses = 'py-1.5 px-6 rounded-md shadow-md'
            break
        case Size.LARGE:
            sizeCssClasses = 'py-2 px-8 rounded-lg shadow-lg'
            break
    }

    let variantCssClasses = ''
    switch (variant) {
        case Variant.PRIMARY:
            variantCssClasses = 'bg-red-500 outline-red-500 hover:bg-red-600 active:bg-red-700'
            break
        case Variant.SECONDARY:
            variantCssClasses = 'bg-emerald-500 outline-emerald-500 hover:bg-emerald-600 active:bg-emerald-700'
            break
        case Variant.TERTIARY:
            variantCssClasses = 'bg-blue-500 outline-blue-500 hover:bg-blue-600 active:bg-blue-700'
            break
    }
    const commonCssClasses = 'flex text-white justify-content items-center focus:outline outline-offset-2 transition-colors'
    const completedCssClasses = `${sizeCssClasses} ${variantCssClasses} ${commonCssClasses} ${className}`

    return href ? (
        <a href={href} className={completedCssClasses}>
            {children}
        </a>
    ) : (
        <button className={completedCssClasses} onClick={() => alert(`Hello from your app!`)}>
            {children}
        </button>
    )
}
