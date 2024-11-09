'use client'

import { useState } from 'react'
import { getRandomInt } from '@repo/math/getRandomInt'
import { start } from 'repl'
import RandomNumberGame from './random-number-game'
import RandomNumberGameMenu from './random-number-guesser-menu'

export interface StartGameProps {
    min: number
    max: number
    maxGuessCount: number
}

export interface GuessingGameMenuProps {
    startGame: (props: StartGameProps) => void
}

export interface GuessingGameEngineProps {
    randomNumber: number
    maxGuessCount: number
    endGame: () => void
}

export default function RandomNumberGuesser() {
    const [isGameinProgress, setisGameinProgress] = useState(false)
    const [randomNumber, setRandomNumber] = useState(0)
    const [maxGuessCount, setMaxGuessCount] = useState(0)

    function startGame({ min, max, maxGuessCount }: StartGameProps) {
        const newRandomNumber = getRandomInt({ min, max })
        setRandomNumber(newRandomNumber)
        setMaxGuessCount(maxGuessCount)
        setisGameinProgress(true)
    }

    function endGame() {
        setisGameinProgress(false)
    }

    return (
        <div className="w-2/3 p-24 m-auto">
            {isGameinProgress ? (
                <RandomNumberGame endGame={endGame} randomNumber={randomNumber} maxGuessCount={maxGuessCount} />
            ) : (
                <RandomNumberGameMenu startGame={startGame} />
            )}
        </div>
    )
}
