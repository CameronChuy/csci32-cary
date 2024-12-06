'use client'

import { Button } from '@repo/ui/button'
import { Input } from '@repo/ui/input'
import { GuessingGameMenuProps } from './page'
import { useState } from 'react'

export default function RandomNumberGameMenu({ startGame }: GuessingGameMenuProps) {
    const [showSettings, setShowSettings] = useState(false)

    function onSubmitSettings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const min = Number(data.get('min'))
        const max = Number(data.get('max'))
        const maxGuessCount = Number(data.get('maxGuessCount'))
        startGame({ min, max, maxGuessCount })
        setShowSettings(false)
    }
    return (
        <div className="flex flex-col">
            {showSettings ? (
                <div className="flex flex-col w-full items-center gap-2">
                    <header>
                        <h1>Please enter the minimum and maximum number values.</h1>
                    </header>
                    <form className="flex flex-col gap-2 items-center" onSubmit={onSubmitSettings}>
                        <Input defaultValue={0} type="number" placeholder="Minimum Number Value" name="min" id="min" />
                        <Input defaultValue={10} type="number" placeholder="Maximum Number Value" name="max" id="max" />
                        <Input
                            defaultValue={3}
                            type="number"
                            placeholder="Number of Guesses"
                            name="maxGuessCount"
                            id="maxGuessCount"
                        />
                        <Button onClick={() => {}}>Submit</Button>
                    </form>
                </div>
            ) : (
                <div className="flex flex-col w-full items-center gap-2">
                    <header>
                        <h1>Ready to play the Guessing Game?</h1>
                    </header>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            setShowSettings(true)
                        }}
                    >
                        <Button onClick={() => {}}>Get Started</Button>
                    </form>
                </div>
            )}
        </div>
    )
}
