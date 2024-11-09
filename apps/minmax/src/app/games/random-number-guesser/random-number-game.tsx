'use client'

import React, { useState } from 'react'
import { GuessingGameEngineProps } from './page'
import { Button } from '@repo/ui/button'
import Input from '@repo/ui/input'

export default function RandomNumberGame({ randomNumber, endGame, maxGuessCount }: GuessingGameEngineProps) {
    const [guessCount, setGuessCount] = useState(0)
    const [feedback, setFeedback] = useState('')
    const [guess, setGuess] = useState(0)
    const [hasWon, setGameOver] = useState(false)

    function submitGuess(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const newGuessCount = guessCount + 1
        if (guess < randomNumber) {
            setFeedback('Higher')
        } else if (guess > randomNumber) {
            setFeedback('Lower')
        } else if (guess === randomNumber) {
            setFeedback('You won in ${newGuessCount} guesses!')
            setGameOver(true)
        } else if (newGuessCount === maxGuessCount) {
            setFeedback('You Lost :(')
            setGameOver(true)
        }
        setGuessCount(newGuessCount)
    }
    function onSubmitEndGame(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setGuessCount(0)
        setFeedback('')
        setGameOver(false)
        endGame()
    }
    return (
        <div
            className={`${maxGuessCount - 1 === guessCount ? 'bg-red-500' : ''}
            ${maxGuessCount === guessCount ? 'bg-red-200' : ''}
            ${hasWon ? '!bg-green-100' : ''}
            p-10 rounded-md transition-color`}
        >
            {hasWon ? (
                <form className="flex flex-col" onSubmit={onSubmitEndGame}>
                    <div>{feedback}</div>
                    <Button>End Game</Button>
                </form>
            ) : (
                <form className="flex flex-col" onSubmit={submitGuess}>
                    <Input
                        name="guess"
                        id="guess"
                        type="number"
                        placeholder="Enter your Guess"
                        value={guess}
                        setValue={(newValue) => setGuess(Number(newValue))}
                    />
                    <div>{feedback}</div>
                    <div>You have guessed {guessCount} times</div>
                    <div>You have {maxGuessCount - guessCount} guesses left</div>
                    <Button>Feeling Lucky</Button>
                </form>
            )}
        </div>
    )
}
