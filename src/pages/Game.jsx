import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { levels, getCommandById, getLevelById, COMMANDS } from '../data/levels'
import useGameLogic from '../hooks/useGameLogic'
import './Game.css'

function Game() {
    const { level: levelParam } = useParams()
    const navigate = useNavigate()
    const currentLevelId = parseInt(levelParam) || 1
    const level = getLevelById(currentLevelId) || levels[0]

    const {
        position,
        rotation,
        program,
        isRunning,
        isComplete,
        currentStep,
        addCommand,
        removeCommand,
        clearProgram,
        runProgram,
        resetGame,
        resetPosition
    } = useGameLogic(level)

    const [showSuccess, setShowSuccess] = useState(false)
    const [draggedCommand, setDraggedCommand] = useState(null)
    const [showLoopModal, setShowLoopModal] = useState(false)
    const [pendingLoopCommand, setPendingLoopCommand] = useState(null)

    // Reset when level changes
    useEffect(() => {
        resetGame()
        setShowSuccess(false)
    }, [currentLevelId, resetGame])

    // Show success modal when complete
    useEffect(() => {
        if (isComplete) {
            setTimeout(() => setShowSuccess(true), 500)
        }
    }, [isComplete])

    // Available commands for current level
    const availableCommands = level.commands.map(cmdId => ({
        ...getCommandById(cmdId),
        commandId: cmdId
    }))

    // Handle drag start
    const handleDragStart = (e, command) => {
        setDraggedCommand(command)
        e.dataTransfer.effectAllowed = 'copy'
    }

    // Handle drop on program area
    const handleDrop = (e) => {
        e.preventDefault()
        if (draggedCommand && !isRunning) {
            // If it's a loop command with hasCount, show the modal
            if (draggedCommand.hasCount || draggedCommand.id === 'loop' || draggedCommand.commandId === 'loop') {
                setPendingLoopCommand(draggedCommand)
                setShowLoopModal(true)
            } else {
                addCommand(draggedCommand)
            }
        }
        setDraggedCommand(null)
    }

    // Handle loop count selection
    const handleLoopCountSelect = (count) => {
        if (pendingLoopCommand) {
            addCommand({ ...pendingLoopCommand, repeatCount: count })
        }
        setShowLoopModal(false)
        setPendingLoopCommand(null)
    }

    // Handle drag over
    const handleDragOver = (e) => {
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
    }

    // Next level
    const goToNextLevel = () => {
        const nextLevel = currentLevelId + 1
        if (nextLevel <= levels.length) {
            navigate(`/game/${nextLevel}`)
        }
        setShowSuccess(false)
    }

    // Retry level
    const retryLevel = () => {
        resetGame()
        setShowSuccess(false)
    }

    // Generate grid cells
    const renderGrid = () => {
        const cells = []
        for (let y = 0; y < level.gridSize; y++) {
            for (let x = 0; x < level.gridSize; x++) {
                const isStart = level.start.x === x && level.start.y === y
                const isTarget = level.target.x === x && level.target.y === y
                const isRobot = position.x === x && position.y === y
                const isObstacle = level.obstacles.some(obs => obs.x === x && obs.y === y)

                cells.push(
                    <div
                        key={`${x}-${y}`}
                        className={`grid-cell ${isStart ? 'start' : ''} ${isTarget ? 'target' : ''} ${isObstacle ? 'obstacle' : ''}`}
                    >
                        {isRobot && (
                            <motion.div
                                layoutId="robot"
                                className="robot"
                                initial={false}
                                style={{ transformOrigin: 'center center' }}
                                animate={{
                                    rotate: rotation,
                                    scale: isRunning ? [1, 1.1, 1] : 1
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            >
                                🤖
                            </motion.div>
                        )}
                        {isTarget && !isRobot && <span className="target-icon">🎯</span>}
                        {isObstacle && <span className="obstacle-icon">🧱</span>}
                    </div>
                )
            }
        }
        return cells
    }

    return (
        <div className="game-page">
            <div className="game-container container">
                {/* Level Header */}
                <div className="game-header glass">
                    <div className="level-info">
                        <span className="level-badge">Seviye {currentLevelId}</span>
                        <h2>{level.name}</h2>
                    </div>
                    <div className="level-nav">
                        <button
                            className="btn btn-secondary btn-icon"
                            disabled={currentLevelId <= 1}
                            onClick={() => navigate(`/game/${currentLevelId - 1}`)}
                        >
                            ◀
                        </button>
                        <span className="level-progress">{currentLevelId} / {levels.length}</span>
                        <button
                            className="btn btn-secondary btn-icon"
                            disabled={currentLevelId >= levels.length}
                            onClick={() => navigate(`/game/${currentLevelId + 1}`)}
                        >
                            ▶
                        </button>
                    </div>
                </div>

                <div className="game-layout">
                    {/* Command Palette */}
                    <div className="command-palette glass">
                        <h3>Komutlar</h3>
                        <p className="palette-hint">Blokları sürükleyip program alanına bırak</p>
                        <div className="command-list">
                            {availableCommands.map((cmd, i) => (
                                <motion.div
                                    key={cmd.id}
                                    className="command-block"
                                    style={{ backgroundColor: cmd.color }}
                                    draggable={!isRunning}
                                    onDragStart={(e) => handleDragStart(e, cmd)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <span className="command-icon">{cmd.icon}</span>
                                    <span className="command-name">{cmd.name}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Game Board */}
                    <div className="game-board-wrapper">
                        <div
                            className="game-board glass"
                            style={{
                                '--grid-size': level.gridSize,
                                gridTemplateColumns: `repeat(${level.gridSize}, 1fr)`
                            }}
                        >
                            {renderGrid()}
                        </div>

                        {/* Hint */}
                        <div className="hint-box">
                            <span className="hint-icon">💡</span>
                            <span className="hint-text">{level.hint}</span>
                        </div>
                    </div>

                    {/* Program Area */}
                    <div className="program-area glass">
                        <div className="program-header">
                            <h3>Program</h3>
                            <button
                                className="btn-clear"
                                onClick={clearProgram}
                                disabled={isRunning || program.length === 0}
                            >
                                Temizle
                            </button>
                        </div>

                        <div
                            className={`program-drop-zone ${draggedCommand ? 'active' : ''}`}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            {program.length === 0 ? (
                                <p className="drop-hint">Komutları buraya sürükle</p>
                            ) : (
                                <div className="program-list">
                                    <AnimatePresence>
                                        {program.map((cmd, index) => (
                                            <motion.div
                                                key={cmd.id}
                                                className={`program-block ${currentStep === index ? 'executing' : ''} ${cmd.commandId === 'loop' || cmd.id === 'loop' ? 'loop-block' : ''}`}
                                                style={{ backgroundColor: cmd.color }}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                layout
                                            >
                                                <span className="program-index">{index + 1}</span>
                                                <span className="program-icon">{cmd.icon}</span>
                                                {(cmd.commandId === 'loop' || cmd.id === 'loop') && cmd.repeatCount && (
                                                    <span className="repeat-count">×{cmd.repeatCount}</span>
                                                )}
                                                <button
                                                    className="program-remove"
                                                    onClick={() => removeCommand(index)}
                                                    disabled={isRunning}
                                                >
                                                    ×
                                                </button>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        <div className="program-controls">
                            <button
                                className="btn btn-primary control-btn"
                                onClick={runProgram}
                                disabled={isRunning || program.length === 0}
                            >
                                <span>▶</span>
                                <span>Çalıştır</span>
                            </button>
                            <button
                                className="btn btn-secondary control-btn"
                                onClick={resetPosition}
                                disabled={isRunning}
                            >
                                <span>↺</span>
                                <span>Sıfırla</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        className="success-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="success-modal glass"
                            initial={{ scale: 0.8, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 50 }}
                        >
                            <div className="success-confetti">
                                {[...Array(20)].map((_, i) => (
                                    <motion.span
                                        key={i}
                                        className="confetti-piece"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#8B5CF6', '#F97316'][Math.floor(Math.random() * 5)]
                                        }}
                                        initial={{ y: 0, opacity: 1, rotate: 0 }}
                                        animate={{
                                            y: -300,
                                            opacity: 0,
                                            rotate: Math.random() * 360
                                        }}
                                        transition={{
                                            duration: 2,
                                            delay: Math.random() * 0.5,
                                            repeat: Infinity
                                        }}
                                    />
                                ))}
                            </div>

                            <div className="success-icon">🎉</div>
                            <h2>Tebrikler!</h2>
                            <p>Seviye {currentLevelId} tamamlandı!</p>

                            <div className="success-stats">
                                <div className="stat">
                                    <span className="stat-value">{program.length}</span>
                                    <span className="stat-label">Komut</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-value">{level.optimalMoves}</span>
                                    <span className="stat-label">Optimal</span>
                                </div>
                                <div className="stat stars">
                                    {[1, 2, 3].map((star) => (
                                        <span
                                            key={star}
                                            className={`star ${program.length <= level.optimalMoves + star - 1 ? 'filled' : ''}`}
                                        >
                                            ⭐
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="success-actions">
                                <button className="btn btn-secondary" onClick={retryLevel}>
                                    Tekrar Dene
                                </button>
                                {currentLevelId < levels.length ? (
                                    <button className="btn btn-primary" onClick={goToNextLevel}>
                                        Sonraki Seviye
                                    </button>
                                ) : (
                                    <Link to="/" className="btn btn-primary">
                                        Ana Sayfa
                                    </Link>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Loop Count Selection Modal */}
            <AnimatePresence>
                {showLoopModal && (
                    <motion.div
                        className="loop-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => {
                            setShowLoopModal(false)
                            setPendingLoopCommand(null)
                        }}
                    >
                        <motion.div
                            className="loop-modal glass"
                            initial={{ scale: 0.8, y: 30 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="loop-modal-header">
                                <span className="loop-modal-icon">🔄</span>
                                <h3>Kaç Kez Tekrar?</h3>
                            </div>
                            <p className="loop-modal-hint">Son 2 komutu kaç kez tekrarlamak istiyorsun?</p>
                            <div className="loop-count-options">
                                {[2, 3, 4, 5].map((count) => (
                                    <motion.button
                                        key={count}
                                        className="loop-count-btn"
                                        onClick={() => handleLoopCountSelect(count)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span className="count-number">{count}</span>
                                        <span className="count-label">kez</span>
                                    </motion.button>
                                ))}
                            </div>
                            <button
                                className="loop-cancel-btn"
                                onClick={() => {
                                    setShowLoopModal(false)
                                    setPendingLoopCommand(null)
                                }}
                            >
                                İptal
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Game
