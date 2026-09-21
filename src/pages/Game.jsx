import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { getCommandById, getLevelById, levels } from '../data/levels'
import useGameLogic from '../hooks/useGameLogic'
import robotImage from '../assets/neurobridge-robot.png'
import './Game.css'

function Game() {
    const { level: levelParam } = useParams()
    const navigate = useNavigate()
    const currentLevelId = Number.parseInt(levelParam, 10) || 1
    const level = getLevelById(currentLevelId) || levels[0]
    const { position, program, isRunning, isComplete, currentStepId, addCommand, removeCommand, clearProgram, runProgram, resetGame, resetPosition } = useGameLogic(level)
    const availableCommands = level.commands.map((id) => ({ ...getCommandById(id), commandId: id }))

    useEffect(() => {
        resetGame()
    }, [currentLevelId, resetGame])

    const nextLevel = () => {
        if (currentLevelId < levels.length) navigate(`/game/${currentLevelId + 1}`)
    }

    const renderGrid = () => {
        const cells = []
        for (let y = 0; y < level.gridSize; y++) {
            for (let x = 0; x < level.gridSize; x++) {
                const isStart = level.start.x === x && level.start.y === y
                const isTarget = level.target.x === x && level.target.y === y
                const isRobot = position.x === x && position.y === y
                cells.push(
                    <div key={`${x}-${y}`} className={`grid-cell ${isStart ? 'start' : ''} ${isTarget ? 'target' : ''}`}>
                        {isRobot && <motion.img layoutId="robot" className="robot" src={robotImage} alt="NeuroBridge robotu" initial={false} animate={{ scale: isRunning ? [1, 1.08, 1] : 1 }} />}
                        {isTarget && !isRobot && <span className="target-icon">★</span>}
                    </div>
                )
            }
        }
        return cells
    }

    return (
        <main className="game-page">
            <div className="game-container container">
                <header className="game-header">
                    <div>
                        <p className="eyebrow">SEVİYE {currentLevelId} / {levels.length}</p>
                        <h1>{level.name}</h1>
                    </div>
                    <div className="level-nav" aria-label="Seviye gezintisi">
                        <button className="btn btn-secondary btn-icon" aria-label="Önceki seviye" disabled={currentLevelId === 1} onClick={() => navigate(`/game/${currentLevelId - 1}`)}>←</button>
                        <button className="btn btn-secondary btn-icon" aria-label="Sonraki seviye" disabled={currentLevelId === levels.length} onClick={() => navigate(`/game/${currentLevelId + 1}`)}>→</button>
                    </div>
                </header>

                <div className="game-layout">
                    <section className="game-board-wrapper" aria-label="Oyun tahtası">
                        <div className="game-board" style={{ gridTemplateColumns: `repeat(${level.gridSize}, 1fr)` }}>{renderGrid()}</div>
                        <p className="hint-box">İpucu: {level.hint}</p>
                    </section>

                    <section className="command-palette" aria-label="Yön komutları">
                        <div className="section-label">
                            <p className="eyebrow">1. YÖN SEÇ</p>
                            <h2>Hareketler</h2>
                        </div>
                        <div className="command-list">
                            {availableCommands.map((command) => (
                                <button key={command.id} className="command-block" style={{ '--command-color': command.color }} disabled={isRunning} onClick={() => addCommand(command)}>
                                    <span aria-hidden="true">{command.icon}</span>{command.name}
                                </button>
                            ))}
                        </div>
                    </section>

                    <section className="program-area" aria-label="Seçilen hareketler">
                        <div className="program-header">
                            <div>
                                <p className="eyebrow">2. SIRALA</p>
                                <h2>Senin yolun</h2>
                            </div>
                            <button className="btn-clear" onClick={clearProgram} disabled={isRunning || !program.length}>Temizle</button>
                        </div>
                        <div className="program-drop-zone">
                            {program.length === 0 ? <p className="drop-hint">Soldaki oka dokun.</p> : <div className="program-list">{program.map((command, index) => (
                                <div key={command.id} className={`program-block ${currentStepId === command.id ? 'executing' : ''}`} style={{ '--command-color': command.color }}>
                                    <span className="program-index">{index + 1}</span><span>{command.icon}</span><span>{command.name}</span>
                                    <button aria-label={`${command.name} komutunu sil`} disabled={isRunning} onClick={() => removeCommand(command.id)}>×</button>
                                </div>
                            ))}</div>}
                        </div>
                        <div className="program-controls">
                            <button className="btn btn-primary control-btn" disabled={isRunning || !program.length} onClick={runProgram}>Yolu çalıştır</button>
                            <button className="btn btn-secondary control-btn" disabled={isRunning} onClick={resetPosition}>Başa dön</button>
                        </div>
                    </section>
                </div>
            </div>

            <AnimatePresence>
                {isComplete && <motion.div className="success-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <motion.div className="success-modal" initial={{ scale: 0.96, y: 12 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 12 }}>
                        <p className="eyebrow">TAMAMLANDI</p><div className="success-icon">✓</div><h2>Harika iş!</h2><p>Hedefe ulaştın.</p>
                        <div className="success-actions">
                            <button className="btn btn-secondary" onClick={resetGame}>Tekrar oyna</button>
                            {currentLevelId < levels.length ? <button className="btn btn-primary" onClick={nextLevel}>Sonraki seviye</button> : <Link className="btn btn-primary" to="/">Ana sayfa</Link>}
                        </div>
                    </motion.div>
                </motion.div>}
            </AnimatePresence>
        </main>
    )
}

export default Game
