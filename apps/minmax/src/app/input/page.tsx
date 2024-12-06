'use client'

import { Button } from '@repo/ui/button'
import { Size } from '../../../../../packages/ui/src/size'
import { Variant } from '@repo/ui/variant'
import { Input } from '@repo/ui/input'
import { useState } from 'react'

export default function InputPage() {
    const [name, setName] = useState('')
    const [hobby, setHobby] = useState('')
    const [goal, setGoal] = useState('')

    return (
        <div className="flex min-w-screen justify-center gap-4 flex-wrap pt-10">
            <div className="flex gap-2">
                <Input
                    size={Size.MEDIUM}
                    variant={Variant.PRIMARY}
                    name="Name"
                    id="name"
                    placeholder="Name"
                    setValue={setName}
                    value={name}
                ></Input>
                <Button onClick={() => alert(`Your name is: ${name}`)} size={Size.MEDIUM} variant={Variant.PRIMARY}>
                    Name
                </Button>
            </div>
            <div className="flex gap-2">
                <Input
                    size={Size.MEDIUM}
                    variant={Variant.SECONDARY}
                    name="Hobby"
                    id="hobby"
                    placeholder="Hobby"
                    setValue={setHobby}
                    value={hobby}
                ></Input>
                <Button onClick={() => alert(`Your hobby is: ${hobby}`)} size={Size.MEDIUM} variant={Variant.SECONDARY}>
                    Hobby
                </Button>
            </div>
            <div className="flex gap-2">
                <Input
                    size={Size.MEDIUM}
                    variant={Variant.TERTIARY}
                    name="Goal"
                    id="goal"
                    placeholder="Goal"
                    setValue={setGoal}
                    value={goal}
                ></Input>
                <Button onClick={() => alert(`Your goal is: ${goal}`)} size={Size.MEDIUM} variant={Variant.TERTIARY}>
                    Goal
                </Button>
            </div>
        </div>
    )
}
