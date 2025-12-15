import { useState, useCallback } from 'react'
import { DIRECTIONS } from '../data/levels'

export function useGameLogic(level) {
    const [position, setPosition] = useState(level?.start || { x: 0, y: 0 })
    // Store rotation in degrees (0 = UP, 90 = RIGHT, 180 = DOWN, 270 = LEFT)
    // We start with the level direction converted to degrees
    const [rotation, setRotation] = useState(() => {
        const dir = level?.direction || 'UP'
        const map = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 }
        return map[dir] || 0
    })

    // Derived direction string for logic checks
    const getDirectionFromRotation = (rot) => {
        // Normalize rotation to 0-360 for logic
        let normalized = rot % 360
        if (normalized < 0) normalized += 360

        if (normalized === 0) return 'UP'
        if (normalized === 90) return 'RIGHT'
        if (normalized === 180) return 'DOWN'
        if (normalized === 270) return 'LEFT'
        return 'UP' // Default
    }

    const [program, setProgram] = useState([])
    const [isRunning, setIsRunning] = useState(false)
    const [isComplete, setIsComplete] = useState(false)
    const [currentStep, setCurrentStep] = useState(-1)
    const [moveHistory, setMoveHistory] = useState([])

    // Reset game state
    const resetGame = useCallback(() => {
        if (level) {
            setPosition(level.start)
            const map = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 }
            setRotation(map[level.direction] || 0)
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
            const map = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 }
            setRotation(map[level.direction] || 0)
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

        // Initial rotation
        const map = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 }
        let currentRot = map[level.direction] || 0;

        const history = [{ ...currentPos, rotation: currentRot }]

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

            const currentDir = getDirectionFromRotation(currentRot);

            switch (commandId) {
                case 'forward': {
                    const dir = DIRECTIONS[currentDir]
                    const newX = currentPos.x + dir.dx
                    const newY = currentPos.y + dir.dy

                    if (isValidPosition(newX, newY)) {
                        currentPos = { x: newX, y: newY }
                        setPosition({ ...currentPos })
                        history.push({ ...currentPos, rotation: currentRot }) // Keep rotation

                        if (checkWin(newX, newY)) {
                            setIsComplete(true)
                            setIsRunning(false)
                            setMoveHistory(history)
                            return true
                        }
                    } else {
                        // Hit wall, stop? For now just don't move
                    }
                    break
                }
                case 'back': {
                    const dir = DIRECTIONS[currentDir]
                    // Opposite direction
                    const newX = currentPos.x - dir.dx
                    const newY = currentPos.y - dir.dy

                    if (isValidPosition(newX, newY)) {
                        currentPos = { x: newX, y: newY }
                        setPosition({ ...currentPos })
                        history.push({ ...currentPos, rotation: currentRot })

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
                    // Rotate left 90 degrees (subtract 90)
                    currentRot -= 90
                    setRotation(currentRot)
                    history.push({ ...currentPos, rotation: currentRot, action: 'turn' })
                    break
                }
                case 'turn_right': {
                    // Rotate right 90 degrees (add 90)
                    currentRot += 90
                    setRotation(currentRot)
                    history.push({ ...currentPos, rotation: currentRot, action: 'turn' })
                    break
                }
                case 'wait': {
                    // Wait one turn (no action)
                    history.push({ ...currentPos, rotation: currentRot, action: 'wait' })
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
                            history.push({ ...currentPos, rotation: currentRot, action: 'jump' })

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
        rotation, // Expose rotation instead of direction
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
