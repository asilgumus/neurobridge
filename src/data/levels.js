// Level data for NeuroBridge
// Each level has: gridSize, start position, target position, obstacles, available commands, hint

export const COMMANDS = {
    MOVE_UP: { id: 'move_up', name: 'YUKARI GİT', icon: '↑', color: '#10B981' },
    MOVE_DOWN: { id: 'move_down', name: 'AŞAĞI GİT', icon: '↓', color: '#EF4444' },
    MOVE_LEFT: { id: 'move_left', name: 'SOLA GİT', icon: '←', color: '#06B6D4' },
    MOVE_RIGHT: { id: 'move_right', name: 'SAĞA GİT', icon: '→', color: '#F472B6' },
    WAIT: { id: 'wait', name: 'BEKLE', icon: '⏸', color: '#64748B' },
    JUMP: { id: 'jump', name: 'ATLA', icon: '⤴', color: '#A855F7' },
    LOOP: { id: 'loop', name: 'TEKRAR', icon: '🔄', color: '#8B5CF6', hasCount: true },
}

export const DIRECTIONS = {
    UP: { dx: 0, dy: -1 },
    DOWN: { dx: 0, dy: 1 },
    LEFT: { dx: -1, dy: 0 },
    RIGHT: { dx: 1, dy: 0 }
}

export const levels = [
    {
        id: 1,
        name: 'Sağa Git',
        gridSize: 4,
        start: { x: 0, y: 0 },
        target: { x: 3, y: 0 },
        direction: 'RIGHT',
        obstacles: [],
        commands: ['move_right'],
        optimalMoves: 3,
        hint: 'Sadece sağa git!'
    },
    {
        id: 2,
        name: 'Aşağı ve Sağ',
        gridSize: 4,
        start: { x: 0, y: 0 },
        target: { x: 3, y: 3 },
        direction: 'RIGHT',
        obstacles: [],
        commands: ['move_right', 'move_down'],
        optimalMoves: 6,
        hint: 'Önce sağa, sonra aşağı git.'
    },
    {
        id: 3,
        name: 'Basit Engel',
        gridSize: 4,
        start: { x: 0, y: 0 },
        target: { x: 2, y: 0 },
        direction: 'RIGHT',
        obstacles: [{ x: 1, y: 0 }],
        commands: ['move_right', 'move_down', 'move_up'],
        optimalMoves: 4,
        hint: 'Engelin etrafından dolaş.'
    },
    {
        id: 4,
        name: 'Zikzak Yol',
        gridSize: 5,
        start: { x: 0, y: 4 },
        target: { x: 4, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['move_up', 'move_right'],
        optimalMoves: 8,
        hint: 'Merdiven gibi çık.'
    },
    {
        id: 5,
        name: 'Küçük Labirent',
        gridSize: 5,
        start: { x: 0, y: 0 },
        target: { x: 4, y: 4 },
        direction: 'RIGHT',
        obstacles: [
            { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 },
            { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }
        ],
        commands: ['move_right', 'move_down', 'move_left'],
        optimalMoves: 12,
        hint: 'Yolu bulmaya çalış.'
    },
    {
        id: 6,
        name: 'Döngü Başlangıcı',
        gridSize: 6,
        start: { x: 0, y: 0 },
        target: { x: 5, y: 0 },
        direction: 'RIGHT',
        obstacles: [],
        commands: ['move_right', 'loop'],
        optimalMoves: 2,
        hint: 'Döngü ile sağa git.'
    },
    {
        id: 7,
        name: 'Kare Döngüsü',
        gridSize: 5,
        start: { x: 1, y: 1 },
        target: { x: 2, y: 1 },
        direction: 'RIGHT',
        obstacles: [{ x: 2, y: 2 }],
        commands: ['move_right', 'move_down', 'move_left', 'move_up', 'loop'],
        optimalMoves: 5,
        hint: 'Döngü ile kare çiz.'
    },
    {
        id: 8,
        name: 'Basamaklar',
        gridSize: 6,
        start: { x: 0, y: 5 },
        target: { x: 5, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['move_up', 'move_right', 'loop'],
        optimalMoves: 3,
        hint: 'Yukarı ve sağa gitmeyi tekrarla.'
    },
    {
        id: 9,
        name: 'Düz Hat',
        gridSize: 6,
        start: { x: 0, y: 3 },
        target: { x: 5, y: 3 },
        direction: 'RIGHT',
        obstacles: [],
        commands: ['move_right', 'loop'],
        optimalMoves: 1,
        hint: 'Tek bir döngü yeterli.'
    },
    {
        id: 10,
        name: 'Köşe Dönüşü',
        gridSize: 5,
        start: { x: 0, y: 4 },
        target: { x: 4, y: 0 },
        direction: 'UP',
        obstacles: [{ x: 0, y: 0 }, { x: 4, y: 4 }],
        commands: ['move_up', 'move_right', 'loop'],
        optimalMoves: 2,
        hint: 'Üst köşeye git.'
    },
    {
        id: 11,
        name: 'Atlama Dersi',
        gridSize: 5,
        start: { x: 0, y: 2 },
        target: { x: 4, y: 2 },
        direction: 'RIGHT',
        obstacles: [{ x: 2, y: 2 }],
        commands: ['move_right', 'jump'],
        optimalMoves: 3,
        hint: 'Engelin üzerinden atla.'
    },
    {
        id: 12,
        name: 'Hendek Atlama',
        gridSize: 6,
        start: { x: 0, y: 3 },
        target: { x: 5, y: 3 },
        direction: 'RIGHT',
        obstacles: [{ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }, { x: 2, y: 5 }],
        commands: ['move_right', 'jump', 'loop'],
        optimalMoves: 3,
        hint: 'Duvarın üzerinden atla!'
    },
    {
        id: 13,
        name: 'Yılan Yolu',
        gridSize: 7,
        start: { x: 0, y: 6 },
        target: { x: 6, y: 0 },
        direction: 'UP',
        obstacles: [
            { x: 1, y: 6 }, { x: 1, y: 5 }, { x: 1, y: 4 },
            { x: 3, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 0 }
        ],
        commands: ['move_up', 'move_right', 'move_left', 'move_down', 'loop'],
        optimalMoves: 10,
        hint: 'Yolu takip et.'
    },
    {
        id: 14,
        name: 'Merkezden Çıkış',
        gridSize: 7,
        start: { x: 3, y: 3 },
        target: { x: 6, y: 6 },
        direction: 'DOWN',
        obstacles: [
            { x: 2, y: 2 }, { x: 3, y: 2 }, { x: 4, y: 2 },
            { x: 2, y: 3 }, { x: 4, y: 3 },
            { x: 2, y: 4 }, { x: 4, y: 4 }
        ],
        commands: ['move_down', 'move_right', 'jump', 'loop'],
        optimalMoves: 5,
        hint: 'Kutudan çık.'
    },
    {
        id: 15,
        name: 'Büyük Final',
        gridSize: 8,
        start: { x: 0, y: 7 },
        target: { x: 7, y: 0 },
        direction: 'UP',
        obstacles: [
            { x: 2, y: 7 }, { x: 2, y: 6 },
            { x: 4, y: 3 }, { x: 5, y: 3 },
            { x: 6, y: 1 }
        ],
        commands: ['move_up', 'move_right', 'jump', 'wait', 'loop'],
        optimalMoves: 5,
        hint: 'Hepsini beraber kullan!'
    }
]

export const getCommandById = (id) => {
    return Object.values(COMMANDS).find(cmd => cmd.id === id)
}

export const getLevelById = (id) => {
    return levels.find(level => level.id === parseInt(id))
}
