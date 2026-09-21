// Level data for NeuroBridge
// Each level has: gridSize, start position, target position, obstacles, available commands, hint

export const COMMANDS = {
    MOVE_UP: { id: 'move_up', name: 'Yukarı', icon: '↑', color: '#10B981' },
    MOVE_DOWN: { id: 'move_down', name: 'Aşağı', icon: '↓', color: '#EF4444' },
    MOVE_LEFT: { id: 'move_left', name: 'Sol', icon: '←', color: '#06B6D4' },
    MOVE_RIGHT: { id: 'move_right', name: 'Sağ', icon: '→', color: '#F472B6' },
}

export const DIRECTIONS = {
    UP: { dx: 0, dy: -1 },
    DOWN: { dx: 0, dy: 1 },
    LEFT: { dx: -1, dy: 0 },
    RIGHT: { dx: 1, dy: 0 }
}

export const levels = [
    { id: 1, name: 'Bir Adım Sağ', gridSize: 3, start: { x: 0, y: 1 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_right'], optimalMoves: 1, hint: 'Sağ oka bir kez bas.' },
    { id: 2, name: 'Bir Adım Yukarı', gridSize: 3, start: { x: 1, y: 2 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_up'], optimalMoves: 1, hint: 'Yukarı oka bir kez bas.' },
    { id: 3, name: 'Bir Adım Sol', gridSize: 3, start: { x: 2, y: 1 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_left'], optimalMoves: 1, hint: 'Sol oka bir kez bas.' },
    { id: 4, name: 'Bir Adım Aşağı', gridSize: 3, start: { x: 1, y: 0 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_down'], optimalMoves: 1, hint: 'Aşağı oka bir kez bas.' },
    { id: 5, name: 'İki Adım Sağ', gridSize: 3, start: { x: 0, y: 1 }, target: { x: 2, y: 1 }, obstacles: [], commands: ['move_right'], optimalMoves: 2, hint: 'Sağ oku iki kez seç.' },
    { id: 6, name: 'Yukarı Sonra Sağ', gridSize: 3, start: { x: 0, y: 2 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_up', 'move_right'], optimalMoves: 2, hint: 'Önce yukarı, sonra sağ.' },
    { id: 7, name: 'Sağ Sonra Aşağı', gridSize: 3, start: { x: 0, y: 0 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_right', 'move_down'], optimalMoves: 2, hint: 'Önce sağ, sonra aşağı.' },
    { id: 8, name: 'Aşağı Sonra Sol', gridSize: 3, start: { x: 2, y: 0 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_down', 'move_left'], optimalMoves: 2, hint: 'Önce aşağı, sonra sol.' },
    { id: 9, name: 'Sol Sonra Yukarı', gridSize: 3, start: { x: 2, y: 2 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_left', 'move_up'], optimalMoves: 2, hint: 'Önce sol, sonra yukarı.' },
    { id: 10, name: 'Kısa Yol', gridSize: 3, start: { x: 0, y: 2 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_up', 'move_right'], optimalMoves: 2, hint: 'Yukarı ve sağ.' },
    { id: 11, name: 'Küçük Kare', gridSize: 3, start: { x: 0, y: 0 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_right', 'move_down'], optimalMoves: 2, hint: 'Sağ ve aşağı.' },
    { id: 12, name: 'Karşı Köşe', gridSize: 3, start: { x: 2, y: 2 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_left', 'move_up'], optimalMoves: 2, hint: 'Sol ve yukarı.' },
    { id: 13, name: 'Merkeze Git', gridSize: 3, start: { x: 0, y: 1 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_right'], optimalMoves: 1, hint: 'Sağa bir kez git.' },
    { id: 14, name: 'Tekrar Sağ', gridSize: 3, start: { x: 1, y: 0 }, target: { x: 2, y: 0 }, obstacles: [], commands: ['move_right'], optimalMoves: 1, hint: 'Sağ oku seç.' },
    { id: 15, name: 'Son Bir Adım', gridSize: 3, start: { x: 1, y: 2 }, target: { x: 1, y: 1 }, obstacles: [], commands: ['move_up'], optimalMoves: 1, hint: 'Yukarı oku seç.' }
]

export const getCommandById = (id) => {
    return Object.values(COMMANDS).find(cmd => cmd.id === id)
}

export const getLevelById = (id) => {
    return levels.find(level => level.id === parseInt(id))
}
