'use client'

import React, { useState } from 'react'
import { GuessingGameEngineProps } from './page'
import { Button } from '@repo/ui/button'
import {Input} from '@repo/ui/input'

export default function RandomNumberGame({ randomNumber, endGame, maxGuessCount }: GuessingGameEngineProps) {
    const [guessCount, setGuessCount] = useState(0)
    const [feedback, setFeedback] = useState('')
    const [guess, setGuess] = useState(0)
    const [gameOutcome, setGameOutcome] = useState<'win' | 'lose' | null>(null)

    function submitGuess(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newGuessCount = guessCount + 1
        if (guess === randomNumber) {
            setFeedback(`You won in ${newGuessCount} guesses!`)
            setGameOutcome("win")
        } else if (newGuessCount === maxGuessCount) {
            setFeedback(`You Lost :( The correct number was ${randomNumber}`)
            setGameOutcome("lose")
        } else if (guess < randomNumber) {
            setFeedback('Higher')
        } else if (guess > randomNumber) {
            setFeedback('Lower')
        }
        setGuessCount(newGuessCount)
    }

    function onSubmitEndGame(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setGuessCount(0)
        setFeedback('')
        setGameOutcome(null)
        endGame()
    }
    return (
        <div
            className={`${maxGuessCount - 1 === guessCount ? 'bg-red-500' : ''}
            ${gameOutcome === 'win' ? 'bg-green-100' : ''}
            ${gameOutcome === 'lose' ? 'bg-red-200' : ''}
            p-10 rounded-md transition-color`}
        >
            {gameOutcome ? (
                <form className="flex flex-col" onSubmit={onSubmitEndGame}>
                    <div>{feedback}</div>
                    <Button onClick={() => {}}>End Game</Button>
                </form>
            ) : (
                <form className="flex flex-col gap-2" onSubmit={submitGuess}>
                    <Input
                        name="guess"
                        id="guess"
                        type="number"
                        placeholder="Enter your Guess"
                        value={guess}
                        onChange = {(newValue) => setGuess(Number(newValue))}
                    />
                    <div>{feedback}</div>
                    <div>You have guessed {guessCount} times</div>
                    <div>You have {maxGuessCount - guessCount} guesses left</div>
                    <Button onClick={() => {}}>Feeling Lucky</Button>
                </form>
            )}
        </div>
    )
}
