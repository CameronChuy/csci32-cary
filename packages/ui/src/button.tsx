'use client'

import { ReactNode } from 'react'
import { getSizeStyles, Size } from './size'
import { getVariantBorderStyles, getVariantStyles, Variant } from './variant'
import { getCommonStyles } from './tokens'

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
    const sizeCssClasses = getSizeStyles(size)

    const variantBackgroundCssClasses = getVariantStyles(variant)
    const variantBorderCssClasses = getVariantBorderStyles(variant)

    const commonCssClasses = getCommonStyles()
    const completedCssClasses = `${sizeCssClasses} ${variantBackgroundCssClasses} ${variantBorderCssClasses} ${commonCssClasses} ${className}`

    return href ? (
        <a href={href} className={completedCssClasses}>
            {children}
        </a>
    ) : onClick ? (
        <button className={completedCssClasses} onClick={onClick}>
            {children}
        </button>
    ) : (
        <button className={completedCssClasses} onClick={() => alert(`Hello from your app!`)}>
            {children}
        </button>
    )
}
