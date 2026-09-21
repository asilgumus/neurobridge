import { useState, useCallback } from 'react'
import { DIRECTIONS } from '../data/levels'

export function useGameLogic(level) {
    const [position, setPosition] = useState(level?.start || { x: 0, y: 0 })
    const [program, setProgram] = useState([])
    const [isRunning, setIsRunning] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [currentStepId, setCurrentStepId] = useState(null)

    const resetPosition = useCallback(() => {
        if (level) setPosition(level.start)
        setIsRunning(false)
        setIsComplete(false)
        setCurrentStepId(null)
    }, [level])

    const resetGame = useCallback(() => {
        resetPosition()
        setProgram([])
    }, [resetPosition])

    const addCommand = useCallback((command) => {
        setProgram((current) => [...current, { ...command, id: `${Date.now()}-${Math.random()}` }])
    }, [])

    const removeCommand = useCallback((id) => {
        setProgram((current) => current.filter((command) => command.id !== id))
    }, [])

    const clearProgram = useCallback(() => setProgram([]), [])

    const isValidPosition = useCallback((x, y) => (
        level && x >= 0 && x < level.gridSize && y >= 0 && y < level.gridSize
    ), [level])

    const runProgram = useCallback(async () => {
        if (!level || program.length === 0) return false

        setIsRunning(true)
        setIsComplete(false)
        let currentPosition = { ...level.start }
        setPosition(currentPosition)

        for (const command of program) {
            setCurrentStepId(command.id)
            await new Promise((resolve) => setTimeout(resolve, 350))

            const direction = DIRECTIONS[command.commandId?.replace('move_', '').toUpperCase()]
            if (!direction) continue

            const nextX = currentPosition.x + direction.dx
            const nextY = currentPosition.y + direction.dy
            if (isValidPosition(nextX, nextY)) {
                currentPosition = { x: nextX, y: nextY }
                setPosition(currentPosition)
                if (nextX === level.target.x && nextY === level.target.y) {
                    setIsComplete(true)
                    setIsRunning(false)
                    setCurrentStepId(null)
                    return true
                }
            }
        }

        setIsRunning(false)
        setCurrentStepId(null)
        return false
    }, [isValidPosition, level, program])

    return { position, program, isRunning, isComplete, currentStepId, addCommand, removeCommand, clearProgram, runProgram, resetGame, resetPosition }
}

export default useGameLogic
