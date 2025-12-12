// Level data for NeuroBridge
// Each level has: gridSize, start position, target position, obstacles, available commands, hint

export const COMMANDS = {
    FORWARD: { id: 'forward', name: 'İLERİ', icon: '↑', color: '#10B981' },
    LEFT: { id: 'left', name: 'SOL', icon: '←', color: '#3B82F6' },
    RIGHT: { id: 'right', name: 'SAĞ', icon: '→', color: '#F59E0B' },
    TURN_LEFT: { id: 'turn_left', name: 'SOLA DÖN', icon: '↺', color: '#06B6D4' },
    TURN_RIGHT: { id: 'turn_right', name: 'SAĞA DÖN', icon: '↻', color: '#F472B6' },
    WAIT: { id: 'wait', name: 'BEKLE', icon: '⏸', color: '#64748B' },
    JUMP: { id: 'jump', name: 'ATLA', icon: '⤴', color: '#A855F7' },
    LOOP: { id: 'loop', name: 'TEKRAR', icon: '🔄', color: '#8B5CF6', hasCount: true },
    CONDITION: { id: 'condition', name: 'EĞER', icon: '❓', color: '#F97316' },
    STOP: { id: 'stop', name: 'DUR', icon: '⏹', color: '#EF4444' }
}

export const DIRECTIONS = {
    UP: { dx: 0, dy: -1 },
    DOWN: { dx: 0, dy: 1 },
    LEFT: { dx: -1, dy: 0 },
    RIGHT: { dx: 1, dy: 0 }
}

export const levels = [
    // Level 1-5: Only Forward (Sequential Thinking)
    {
        id: 1,
        name: 'İlk Adım',
        gridSize: 5,
        start: { x: 2, y: 4 },
        target: { x: 2, y: 2 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward'],
        optimalMoves: 2,
        hint: 'Robotu 2 adım ileri götür!'
    },
    {
        id: 2,
        name: 'Biraz Daha',
        gridSize: 5,
        start: { x: 2, y: 4 },
        target: { x: 2, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward'],
        optimalMoves: 4,
        hint: 'Hedefe ulaşmak için 4 adım gerekiyor.'
    },
    {
        id: 3,
        name: 'Köşeden Köşeye',
        gridSize: 5,
        start: { x: 0, y: 4 },
        target: { x: 0, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward'],
        optimalMoves: 4,
        hint: 'Düz bir yol, sadece ileri!'
    },
    {
        id: 4,
        name: 'Uzun Yol',
        gridSize: 6,
        start: { x: 2, y: 5 },
        target: { x: 2, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward'],
        optimalMoves: 5,
        hint: '5 adım ileri git.'
    },
    {
        id: 5,
        name: 'Yatay Yolculuk',
        gridSize: 5,
        start: { x: 0, y: 2 },
        target: { x: 4, y: 2 },
        direction: 'RIGHT',
        obstacles: [],
        commands: ['forward'],
        optimalMoves: 4,
        hint: 'Robot sağa bakıyor, ileri git!'
    },

    // Level 6-10: Forward + Turn (Direction Concept)
    {
        id: 6,
        name: 'İlk Dönüş',
        gridSize: 5,
        start: { x: 0, y: 4 },
        target: { x: 2, y: 4 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'right'],
        optimalMoves: 2,
        hint: 'Sağa 2 adım git!'
    },
    {
        id: 7,
        name: 'L Şekli',
        gridSize: 5,
        start: { x: 0, y: 4 },
        target: { x: 2, y: 2 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'right'],
        optimalMoves: 4,
        hint: 'Yukarı 2, sağa 2 adım git.'
    },
    {
        id: 8,
        name: 'Ters L',
        gridSize: 5,
        start: { x: 4, y: 4 },
        target: { x: 2, y: 2 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'left'],
        optimalMoves: 4,
        hint: 'Yukarı 2, sola 2 adım git.'
    },
    {
        id: 9,
        name: 'Zigzag',
        gridSize: 5,
        start: { x: 0, y: 4 },
        target: { x: 4, y: 2 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'left', 'right'],
        optimalMoves: 6,
        hint: 'Yukarı 2, sağa 4 adım git.'
    },
    {
        id: 10,
        name: 'Kare Yolculuk',
        gridSize: 5,
        start: { x: 1, y: 3 },
        target: { x: 3, y: 1 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'left', 'right'],
        optimalMoves: 4,
        hint: 'Yukarı 2, sağa 2 adım git.'
    },

    // Level 11-15: With Loop (Loop Logic)
    {
        id: 11,
        name: 'Tekrar Gücü',
        gridSize: 6,
        start: { x: 2, y: 5 },
        target: { x: 2, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'turn_left', 'turn_right', 'loop'],
        optimalMoves: 2,
        hint: 'Döngü kullanarak 5 adımı 2 komutla yap!'
    },
    {
        id: 12,
        name: 'Tekrarlayan Dönüş',
        gridSize: 5,
        start: { x: 0, y: 4 },
        target: { x: 4, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'right', 'loop'],
        optimalMoves: 4,
        hint: 'İleri-sağ-ileri tekrarla.'
    },
    {
        id: 13,
        name: 'Spiral',
        gridSize: 6,
        start: { x: 0, y: 5 },
        target: { x: 3, y: 2 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'left', 'right', 'turn_left', 'turn_right', 'loop'],
        optimalMoves: 6,
        hint: 'Döngüleri ve dönmeleri akıllıca kullan.'
    },
    {
        id: 14,
        name: 'Merdiven',
        gridSize: 6,
        start: { x: 0, y: 5 },
        target: { x: 5, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'right', 'loop'],
        optimalMoves: 4,
        hint: 'İleri-sağ-ileri tekrarla, 5 kez.'
    },
    {
        id: 15,
        name: 'Döngü Ustası',
        gridSize: 7,
        start: { x: 0, y: 6 },
        target: { x: 6, y: 0 },
        direction: 'UP',
        obstacles: [],
        commands: ['forward', 'left', 'right', 'loop'],
        optimalMoves: 5,
        hint: 'En verimli yolu bul!'
    },

    // Level 16-20: With Conditions (Conditional Logic)
    {
        id: 16,
        name: 'Engelden Kaçın',
        gridSize: 5,
        start: { x: 2, y: 4 },
        target: { x: 2, y: 0 },
        direction: 'UP',
        obstacles: [{ x: 2, y: 2 }],
        commands: ['forward', 'left', 'right'],
        optimalMoves: 6,
        hint: 'Engeli aşmak için etrafından dolan.'
    },
    {
        id: 17,
        name: 'Labirent Başlangıç',
        gridSize: 6,
        start: { x: 0, y: 5 },
        target: { x: 5, y: 0 },
        direction: 'UP',
        obstacles: [{ x: 2, y: 3 }, { x: 3, y: 2 }],
        commands: ['forward', 'left', 'right', 'turn_left', 'turn_right', 'jump'],
        optimalMoves: 10,
        hint: 'Dönme ve atlama kullanarak engellerden kaçın!'
    },
    {
        id: 18,
        name: 'Duvar',
        gridSize: 6,
        start: { x: 0, y: 3 },
        target: { x: 5, y: 3 },
        direction: 'RIGHT',
        obstacles: [{ x: 2, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }],
        commands: ['forward', 'left', 'right'],
        optimalMoves: 8,
        hint: 'Duvarın üstünden veya altından geç.'
    },
    {
        id: 19,
        name: 'Karmaşık Yol',
        gridSize: 7,
        start: { x: 0, y: 6 },
        target: { x: 6, y: 0 },
        direction: 'UP',
        obstacles: [{ x: 2, y: 4 }, { x: 3, y: 3 }, { x: 4, y: 2 }, { x: 5, y: 1 }],
        commands: ['forward', 'left', 'right', 'turn_left', 'turn_right', 'jump', 'wait', 'loop'],
        optimalMoves: 12,
        hint: 'Tüm komutları akıllıca kullan.'
    },
    {
        id: 20,
        name: 'Final Challenge',
        gridSize: 8,
        start: { x: 0, y: 7 },
        target: { x: 7, y: 0 },
        direction: 'UP',
        obstacles: [
            { x: 2, y: 5 }, { x: 2, y: 4 },
            { x: 4, y: 6 }, { x: 4, y: 5 }, { x: 4, y: 4 },
            { x: 6, y: 3 }, { x: 6, y: 2 }
        ],
        commands: ['forward', 'left', 'right', 'turn_left', 'turn_right', 'jump', 'wait', 'loop'],
        optimalMoves: 15,
        hint: 'Tüm becerileri kullan ve hedefe ulaş!'
    }
]

export const getCommandById = (id) => {
    return Object.values(COMMANDS).find(cmd => cmd.id === id)
}

export const getLevelById = (id) => {
    return levels.find(level => level.id === parseInt(id))
}
