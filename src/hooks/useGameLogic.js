import { useState, useCallback } from 'react'
import { DIRECTIONS } from '../data/levels'

export function useGameLogic(level) {
    const [position, setPosition] = useState(level?.start || { x: 0, y: 0 })
    const [direction, setDirection] = useState(level?.direction || 'UP')
    const [program, setProgram] = useState([])
    const [isRunning, setIsRunning] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [currentStep, setCurrentStep] = useState(-1)
    const [moveHistory, setMoveHistory] = useState([])

    // Reset game state
    const resetGame = useCallback(() => {
        if (level) {
            setPosition(level.start)
            setDirection(level.direction)
        }
        setProgram([])
        setIsRunning(false)
        setIsComplete(false)
        setCurrentStep(-1)
        setMoveHistory([])
    }, [level])

    // Reset position only (keep program)
    const resetPosition = useCallback(() => {
        if (level) {
            setPosition(level.start)
            setDirection(level.direction)
        }
        setIsRunning(false)
        setIsComplete(false)
        setCurrentStep(-1)
        setMoveHistory([])
    }, [level])

    // Add command to program
    const addCommand = useCallback((command) => {
        setProgram(prev => [...prev, { ...command, id: Date.now() + Math.random() }])
    }, [])

    // Remove command from program
    const removeCommand = useCallback((index) => {
        setProgram(prev => prev.filter((_, i) => i !== index))
    }, [])

    // Clear all commands
    const clearProgram = useCallback(() => {
        setProgram([])
    }, [])

    // Reorder commands
    const reorderCommands = useCallback((fromIndex, toIndex) => {
        setProgram(prev => {
            const newProgram = [...prev]
            const [removed] = newProgram.splice(fromIndex, 1)
            newProgram.splice(toIndex, 0, removed)
            return newProgram
        })
    }, [])

    // Turn left
    const turnLeft = useCallback((currentDir) => {
        const turns = { UP: 'LEFT', LEFT: 'DOWN', DOWN: 'RIGHT', RIGHT: 'UP' }
        return turns[currentDir]
    }, [])

    // Turn right
    const turnRight = useCallback((currentDir) => {
        const turns = { UP: 'RIGHT', RIGHT: 'DOWN', DOWN: 'LEFT', LEFT: 'UP' }
        return turns[currentDir]
    }, [])

    // Check if position is valid
    const isValidPosition = useCallback((x, y) => {
        if (!level) return false

        // Check bounds
        if (x < 0 || x >= level.gridSize || y < 0 || y >= level.gridSize) {
            return false
        }

        // Check obstacles
        const isObstacle = level.obstacles.some(obs => obs.x === x && obs.y === y)
        return !isObstacle
    }, [level])

    // Check if target reached
    const checkWin = useCallback((x, y) => {
        if (!level) return false
        return x === level.target.x && y === level.target.y
    }, [level])

    // Execute program step by step
    const runProgram = useCallback(async () => {
        if (program.length === 0 || !level) return

        setIsRunning(true)
        resetPosition()

        let currentPos = { ...level.start }
        let currentDir = level.direction
        const history = [{ ...currentPos, direction: currentDir }]

        // Expand loops with configurable repeat count
        const expandedProgram = []
        let i = 0
        while (i < program.length) {
            const cmd = program[i]
            if (cmd.id === 'loop' || cmd.commandId === 'loop') {
                // Get repeat count from command (default 3)
                const repeatCount = cmd.repeatCount || 3
                // Repeat previous 2 commands
                const loopCommands = expandedProgram.slice(-2)
                for (let j = 0; j < repeatCount - 1; j++) {
                    expandedProgram.push(...loopCommands.map(c => ({ ...c })))
                }
            } else {
                expandedProgram.push(cmd)
            }
            i++
        }

        // Execute each command with animation delay
        for (let step = 0; step < expandedProgram.length; step++) {
            const cmd = expandedProgram[step]
            const commandId = cmd.commandId || cmd.id

            setCurrentStep(step)

            await new Promise(resolve => setTimeout(resolve, 500))

            switch (commandId) {
                case 'forward': {
                    const dir = DIRECTIONS[currentDir]
                    const newX = currentPos.x + dir.dx
                    const newY = currentPos.y + dir.dy

                    if (isValidPosition(newX, newY)) {
                        currentPos = { x: newX, y: newY }
                        setPosition({ ...currentPos })
                        history.push({ ...currentPos, direction: currentDir })

                        if (checkWin(newX, newY)) {
                            setIsComplete(true)
                            setIsRunning(false)
                            setMoveHistory(history)
                            return true
                        }
                    }
                    break
                }
                case 'left': {
                    // Move directly left (x - 1)
                    const newX = currentPos.x - 1
                    const newY = currentPos.y

                    if (isValidPosition(newX, newY)) {
                        currentPos = { x: newX, y: newY }
                        currentDir = 'LEFT'
                        setPosition({ ...currentPos })
                        setDirection(currentDir)
                        history.push({ ...currentPos, direction: currentDir })

                        if (checkWin(newX, newY)) {
                            setIsComplete(true)
                            setIsRunning(false)
                            setMoveHistory(history)
                            return true
                        }
                    }
                    break
                }
                case 'right': {
                    // Move directly right (x + 1)
                    const newX = currentPos.x + 1
                    const newY = currentPos.y

                    if (isValidPosition(newX, newY)) {
                        currentPos = { x: newX, y: newY }
                        currentDir = 'RIGHT'
                        setPosition({ ...currentPos })
                        setDirection(currentDir)
                        history.push({ ...currentPos, direction: currentDir })

                        if (checkWin(newX, newY)) {
                            setIsComplete(true)
                            setIsRunning(false)
                            setMoveHistory(history)
                            return true
                        }
                    }
                    break
                }
                case 'turn_left': {
                    // Rotate left 90 degrees (no movement)
                    currentDir = turnLeft(currentDir)
                    setDirection(currentDir)
                    history.push({ ...currentPos, direction: currentDir, action: 'turn' })
                    break
                }
                case 'turn_right': {
                    // Rotate right 90 degrees (no movement)
                    currentDir = turnRight(currentDir)
                    setDirection(currentDir)
                    history.push({ ...currentPos, direction: currentDir, action: 'turn' })
                    break
                }
                case 'wait': {
                    // Wait one turn (no action)
                    history.push({ ...currentPos, direction: currentDir, action: 'wait' })
                    break
                }
                case 'jump': {
                    // Jump over one cell in current direction
                    const dir = DIRECTIONS[currentDir]
                    const jumpX = currentPos.x + dir.dx * 2
                    const jumpY = currentPos.y + dir.dy * 2

                    if (jumpX >= 0 && jumpX < level.gridSize && jumpY >= 0 && jumpY < level.gridSize) {
                        // Check if landing position is valid (not an obstacle)
                        const landingObstacle = level.obstacles.some(obs => obs.x === jumpX && obs.y === jumpY)
                        if (!landingObstacle) {
                            currentPos = { x: jumpX, y: jumpY }
                            setPosition({ ...currentPos })
                            history.push({ ...currentPos, direction: currentDir, action: 'jump' })

                            if (checkWin(jumpX, jumpY)) {
                                setIsComplete(true)
                                setIsRunning(false)
                                setMoveHistory(history)
                                return true
                            }
                        }
                    }
                    break
                }
                case 'stop':
                    setIsRunning(false)
                    setMoveHistory(history)
                    return false
                default:
                    break
            }
        }

        setIsRunning(false)
        setCurrentStep(-1)
        setMoveHistory(history)
        return checkWin(currentPos.x, currentPos.y)
    }, [program, level, resetPosition, isValidPosition, checkWin])

    return {
        position,
        direction,
        program,
        isRunning,
        isComplete,
        currentStep,
        moveHistory,
        addCommand,
        removeCommand,
        clearProgram,
        reorderCommands,
        runProgram,
        resetGame,
        resetPosition
    }
}

export default useGameLogic
