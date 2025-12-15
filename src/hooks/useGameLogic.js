import { useState, useCallback } from 'react'
import { DIRECTIONS } from '../data/levels'

export function useGameLogic(level) {
    const [position, setPosition] = useState(level?.start || { x: 0, y: 0 })
    // Store rotation in degrees (0 = UP, 90 = RIGHT, 180 = DOWN, 270 = LEFT)
    const [rotation, setRotation] = useState(() => {
        const dir = level?.direction || 'UP'
        const map = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 }
        return map[dir] || 0
    })

    // Derived direction string for logic checks
    const getDirectionFromRotation = (rot) => {
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
    const [currentStepId, setCurrentStepId] = useState(null) // Using ID for nested tracking
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
        setCurrentStepId(null)
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
        setCurrentStepId(null)
        setMoveHistory([])
    }, [level])

    // Helper to find a node by ID and its parent array
    const findNodeAndParent = (items, id, parent = null) => {
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                return { node: items[i], index: i, parentArray: items, parentNode: parent }
            }
            if (items[i].children) {
                const result = findNodeAndParent(items[i].children, id, items[i])
                if (result) return result
            }
        }
        return null
    }

    // Add command to program (root or nested)
    const addCommand = useCallback((command, parentId = null) => {
        const newCmd = {
            ...command,
            id: Date.now() + Math.random(),
            children: (command.id === 'loop' || command.commandId === 'loop') ? [] : undefined
        }

        setProgram(prev => {
            if (!parentId) {
                return [...prev, newCmd]
            }

            // Deep clone to avoid mutation
            const clone = JSON.parse(JSON.stringify(prev))

            // Find parent
            const findAndPush = (items) => {
                for (let item of items) {
                    if (item.id === parentId) {
                        if (!item.children) item.children = []
                        item.children.push(newCmd)
                        return true
                    }
                    if (item.children) {
                        if (findAndPush(item.children)) return true
                    }
                }
                return false
            }

            findAndPush(clone)
            return clone
        })
    }, [])

    // Remove command from program
    const removeCommand = useCallback((id) => {
        setProgram(prev => {
            const clone = JSON.parse(JSON.stringify(prev))

            const removeRecursive = (items) => {
                const index = items.findIndex(item => item.id === id)
                if (index !== -1) {
                    items.splice(index, 1)
                    return true
                }
                for (let item of items) {
                    if (item.children) {
                        if (removeRecursive(item.children)) return true
                    }
                }
                return false
            }

            removeRecursive(clone)
            return clone
        })
    }, [])

    // Clear all commands
    const clearProgram = useCallback(() => {
        setProgram([])
    }, [])

    // Check if position is valid
    const isValidPosition = useCallback((x, y) => {
        if (!level) return false
        if (x < 0 || x >= level.gridSize || y < 0 || y >= level.gridSize) return false
        const isObstacle = level.obstacles.some(obs => obs.x === x && obs.y === y)
        return !isObstacle
    }, [level])

    // Check if target reached
    const checkWin = useCallback((x, y) => {
        if (!level) return false
        return x === level.target.x && y === level.target.y
    }, [level])

    // Expand program recursively for execution
    const expandProgram = (cmds) => {
        let expanded = []
        for (let cmd of cmds) {
            if ((cmd.id === 'loop' || cmd.commandId === 'loop') && cmd.children && cmd.children.length > 0) {
                const repeatCount = cmd.repeatCount || 3
                // Loop itself executes (highlight loop block)
                expanded.push({ ...cmd, isLoopStart: true })

                // Then children execute N times
                for (let i = 0; i < repeatCount; i++) {
                    const childrenExpanded = expandProgram(cmd.children)
                    expanded.push(...childrenExpanded)
                }
            } else {
                expanded.push(cmd)
            }
        }
        return expanded
    }

    // Execute program step by step
    const runProgram = useCallback(async () => {
        if (program.length === 0 || !level) return

        setIsRunning(true)
        resetPosition()

        let currentPos = { ...level.start }
        const map = { UP: 0, RIGHT: 90, DOWN: 180, LEFT: 270 }
        let currentRot = map[level.direction] || 0;

        const history = [{ ...currentPos, rotation: currentRot }]

        // Flatten the nested structure for execution
        const expandedProgram = expandProgram(program)

        // Execute
        for (let step = 0; step < expandedProgram.length; step++) {
            const cmd = expandedProgram[step]
            const commandId = cmd.commandId || cmd.id

            // If it's a loop start marker, just highlight it briefly
            if (cmd.isLoopStart) {
                setCurrentStepId(cmd.id)
                await new Promise(resolve => setTimeout(resolve, 500))
                continue // Don't verify position logic for the loop container itself
            }

            setCurrentStepId(cmd.id)
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
                case 'back': {
                    const dir = DIRECTIONS[currentDir]
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
                    currentRot -= 90
                    setRotation(currentRot)
                    history.push({ ...currentPos, rotation: currentRot, action: 'turn' })
                    break
                }
                case 'turn_right': {
                    currentRot += 90
                    setRotation(currentRot)
                    history.push({ ...currentPos, rotation: currentRot, action: 'turn' })
                    break
                }
                case 'wait': {
                    history.push({ ...currentPos, rotation: currentRot, action: 'wait' })
                    break
                }
                case 'jump': {
                    const dir = DIRECTIONS[currentDir]
                    const jumpX = currentPos.x + dir.dx * 2
                    const jumpY = currentPos.y + dir.dy * 2
                    if (jumpX >= 0 && jumpX < level.gridSize && jumpY >= 0 && jumpY < level.gridSize) {
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
            }
        }

        setIsRunning(false)
        setCurrentStepId(null)
        setMoveHistory(history)
        return checkWin(currentPos.x, currentPos.y)
    }, [program, level, resetPosition, isValidPosition, checkWin])

    return {
        position,
        rotation,
        program,
        isRunning,
        isComplete,
        currentStepId,
        moveHistory,
        addCommand,
        removeCommand,
        clearProgram,
        runProgram,
        resetGame,
        resetPosition
    }
}

export default useGameLogic
