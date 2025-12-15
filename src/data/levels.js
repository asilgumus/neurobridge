// Level data for NeuroBridge
// Each level has: gridSize, start position, target position, obstacles, available commands, hint

export const COMMANDS = {
    FORWARD: { id: 'forward', name: 'İLERİ', icon: '↑', color: '#10B981' },
    TURN_LEFT: { id: 'turn_left', name: 'SOLA DÖN', icon: '↺', color: '#06B6D4' },
    TURN_RIGHT: { id: 'turn_right', name: 'SAĞA DÖN', icon: '↻', color: '#F472B6' },
    WAIT: { id: 'wait', name: 'BEKLE', icon: '⏸', color: '#64748B' },
    JUMP: { id: 'jump', name: 'ATLA', icon: '⤴', color: '#A855F7' },
    LOOP: { id: 'loop', name: 'TEKRAR', icon: '🔄', color: '#8B5CF6', hasCount: true },
    CONDITION: { id: 'condition', name: 'EĞER', icon: '❓', color: '#F97316' },
    BACK: { id: 'back', name: 'GERİ', icon: '↓', color: '#EF4444' },
    STOP: { id: 'stop', name: 'DUR', icon: '⏹', color: '#EF4444' }
}

export const DIRECTIONS = {
    UP: { dx: 0, dy: -1 },
    DOWN: { dx: 0, dy: 1 },
    LEFT: { dx: -1, dy: 0 },
    RIGHT: { dx: 1, dy: 0 }
}

export const levels = [
    // Level 1-5: Basic Movement (Forward + Turn)
    {
        id: 1,
        name: 'İlk Dönüş',
        gridSize: 5,
        start: { x: 2, y: 4 },
        target: { x: 4, y: 4 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'turn_right', 'back'],
        optimalMoves: 3,
        hint: 'Sağa dön ve ilerle!'
    },
    {
        id: 2,
        name: 'Köşe Kapmaca',
        gridSize: 5,
        start: { x: 1, y: 4 },
        target: { x: 4, y: 1 },
        direction: 'UP',
        obstacles: [{ x: 4, y: 4 }, { x: 1, y: 1 }],
        commands: ['forward', 'turn_right', 'turn_left', 'back'],
        optimalMoves: 6,
        hint: 'Köşeleri dönerek hedefe ulaş.'
    },
    {
        id: 3,
        name: 'U Dönüşü',
        gridSize: 5,
        start: { x: 1, y: 4 },
        target: { x: 3, y: 4 },
        direction: 'UP',
        obstacles: [{ x: 2, y: 4 }, { x: 2, y: 3 }, { x: 2, y: 2 }],
        commands: ['forward', 'turn_right'],
        optimalMoves: 6,
        hint: 'Engelin etrafından dolaş.'
    },
    {
        id: 4,
        name: 'Zikzak Dönüşler',
        gridSize: 6,
        start: { x: 1, y: 5 },
        target: { x: 4, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'turn_left', 'turn_right'],
        optimalMoves: 8,
        hint: 'Sağlı sollu ilerle.'
    },
    {
        id: 5,
        name: 'Labirent Giriş',
        gridSize: 6,
        start: { x: 0, y: 5 },
        target: { x: 5, y: 5 },
        direction: 'UP',
        obstacles: [
            { x: 1, y: 5 }, { x: 1, y: 4 },
            { x: 3, y: 5 }, { x: 3, y: 4 }, { x: 3, y: 3 }
        ],
        commands: ['forward', 'turn_right', 'turn_left'],
        optimalMoves: 10,
        hint: 'Labirentin içinden yolunu bul.'
    },

    // Level 6-10: Loops Helper (Introduction to Loops)
    {
        id: 6,
        name: 'Döngü Zamanı',
        gridSize: 6,
        start: { x: 0, y: 5 },
        target: { x: 5, y: 5 },
        direction: 'RIGHT',
        obstacles: [],
        commands: ['forward', 'loop'],
        optimalMoves: 2,
        hint: 'Tek bir komutla ve döngüyle sona git.'
    },
    {
        id: 7,
        name: 'Kare Çiz',
        gridSize: 5,
        start: { x: 1, y: 4 },
        target: { x: 2, y: 4 },
        direction: 'UP',
        obstacles: [{ x: 2, y: 2 }],
        commands: ['forward', 'turn_right', 'loop'],
        optimalMoves: 8,
        hint: 'Kare çizerek hedefe yaklaş.'
    },
    {
        id: 8,
        name: 'Merdiven Tırmanış',
        gridSize: 6,
        start: { x: 0, y: 5 },
        target: { x: 5, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'turn_right', 'turn_left', 'loop'],
        optimalMoves: 4,
        hint: 'İleri, sağa dön, ileri, sola dön... Bunu tekrarla.'
    },
    {
        id: 9,
        name: 'Tekrar Gücü',
        gridSize: 6,
        start: { x: 2, y: 5 },
        target: { x: 2, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'turn_left', 'turn_right', 'loop'],
        optimalMoves: 2,
        hint: 'Döngü kullanarak düz git!'
    },
    {
        id: 10,
        name: 'Geniş Spiral',
        gridSize: 7,
        start: { x: 3, y: 3 },
        target: { x: 0, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'turn_left', 'loop'],
        optimalMoves: 6,
        hint: 'İçeriden dışarıya doğru açıl.'
    },

    // Level 11-15: Advanced Conditions & Jumps
    {
        id: 11,
        name: 'Atlama Taşı',
        gridSize: 6,
        start: { x: 0, y: 5 },
        target: { x: 5, y: 0 },
        direction: 'UP',
        obstacles: [{ x: 2, y: 3 }, { x: 3, y: 2 }],
        commands: ['forward', 'turn_left', 'turn_right', 'jump'],
        optimalMoves: 10,
        hint: 'Engellerin üzerinden atla.'
    },
    {
        id: 12,
        name: 'Hendek',
        gridSize: 7,
        start: { x: 0, y: 3 },
        target: { x: 6, y: 3 },
        direction: 'RIGHT',
        obstacles: [{ x: 3, y: 0 }, { x: 3, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 3 }, { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }],
        commands: ['forward', 'jump', 'loop'],
        optimalMoves: 4,
        hint: 'Duvarın üzerinden atla!'
    },

    // New Stages
    {
        id: 13,
        name: 'Labirent Ustası',
        gridSize: 8,
        start: { x: 0, y: 7 },
        target: { x: 7, y: 0 },
        direction: 'UP',
        obstacles: [
            { x: 1, y: 7 }, { x: 1, y: 6 }, { x: 1, y: 5 },
            { x: 3, y: 7 }, { x: 3, y: 6 }, { x: 3, y: 5 }, { x: 3, y: 4 },
            { x: 5, y: 3 }, { x: 5, y: 2 }, { x: 5, y: 1 }, { x: 5, y: 0 },
            { x: 6, y: 5 }
        ],
        commands: ['forward', 'turn_left', 'turn_right', 'back', 'loop'],
        optimalMoves: 12,
        hint: 'Yolu takip et.'
    },
    {
        id: 14,
        name: 'Dört Köşe',
        gridSize: 9,
        start: { x: 4, y: 4 },
        target: { x: 8, y: 0 },
        direction: 'UP',
        obstacles: [
            { x: 4, y: 3 }, { x: 4, y: 5 }, { x: 3, y: 4 }, { x: 5, y: 4 }
        ],
        commands: ['forward', 'turn_left', 'turn_right', 'jump', 'back', 'loop'],
        optimalMoves: 8,
        hint: 'Önce kutudan çıkmalısın.'
    },
    {
        id: 15,
        name: 'Büyük Final',
        gridSize: 10,
        start: { x: 0, y: 9 },
        target: { x: 9, y: 0 },
        direction: 'UP',
        obstacles: [
            { x: 2, y: 9 }, { x: 2, y: 8 }, { x: 2, y: 7 },
            { x: 4, y: 5 }, { x: 5, y: 5 }, { x: 6, y: 5 },
            { x: 7, y: 2 }, { x: 8, y: 2 }
        ],
        commands: ['forward', 'turn_left', 'turn_right', 'jump', 'back', 'wait', 'loop'],
        optimalMoves: 20,
        hint: 'Tüm yeteneklerini sergile!'
    }
]

export const getCommandById = (id) => {
    return Object.values(COMMANDS).find(cmd => cmd.id === id)
}

export const getLevelById = (id) => {
    return levels.find(level => level.id === parseInt(id))
}
