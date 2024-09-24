

import { getInputSizeStyles, Size } from './size'
import { getVariantBorderStyles, getVariantInputTextStyles, Variant } from './variant'
import { HTMLInputTypeAttribute } from 'react'
import { getCommonStyles } from './tokens'

interface InputProps {
    size?: Size
    variant?: Variant
    placeholder?: string
    type?: HTMLInputTypeAttribute
    defaultValue?: any
    value?: any
    setValue?: (newValue: any) => void
    name: string
    id: string
}

export default function Input({
    size = Size.MEDIUM,
    variant = Variant.PRIMARY,
    placeholder,
    type = 'text',
    defaultValue,
    value,
    setValue,
    name,
    id,
}: InputProps) {
    const sizeCssClasses = getInputSizeStyles(size)
    const variantTextCssClasses = getVariantInputTextStyles(variant)
    const variantBorderCssClasses = getVariantBorderStyles(variant)
    const commonCssClasses = getCommonStyles()


    return (
        <input
            className={`${sizeCssClasses} ${variantTextCssClasses} ${variantBorderCssClasses} ${commonCssClasses}`}
            name={name}
            id={id}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={type}
            value={value}
            onChange={setValue ? (newValue) => setValue(newValue.currentTarget.value) : () => {}}
        />
    )
}
