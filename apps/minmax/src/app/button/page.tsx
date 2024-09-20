import { Button } from '@repo/ui/button'
import { Size } from '../../../../../packages/ui/src/size'
import { Variant } from '@repo/ui/variant'

export default function ButtonPage() {
    return (
        <div className="flex flex-col min-h-screen min-w-screen">
            <div className='flex gap-4 w-full justify-center p-8'>
                <Button size={Size.SMALL} variant={Variant.PRIMARY}>Primary</Button>
                <Button size={Size.MEDIUM} variant={Variant.PRIMARY}>Primary</Button>
                <Button size={Size.LARGE} variant={Variant.PRIMARY}>Primary</Button>
            </div>
            <div className='flex gap-4 w-full justify-center p-8'>
                <Button size={Size.SMALL} variant={Variant.SECONDARY}>Secondary</Button>
                <Button size={Size.MEDIUM} variant={Variant.SECONDARY}>Secondary</Button>
                <Button size={Size.LARGE} variant={Variant.SECONDARY}>Secondary</Button>
            </div>
            <div className='flex gap-4 w-full justify-center p-8'>
                <Button size={Size.SMALL} variant={Variant.TERTIARY}>Tertiary</Button>
                <Button size={Size.MEDIUM} variant={Variant.TERTIARY}>Tertiary</Button>
                <Button size={Size.LARGE} variant={Variant.TERTIARY}>Tertiary</Button>
            </div>
        </div>
    )
}
