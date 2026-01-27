export const LED_SHADOW_LENGTH_TO_TAILWIND_ACTIVE_TRANSLATE_CLASS_MAP = {
    0.1: ['active:translate-x-[0.1rem]', 'active:translate-y-[0.1rem]'],
    0.2: ['active:translate-x-[0.2rem]', 'active:translate-y-[0.2rem]'],
    0.3: ['active:translate-x-[0.3rem]', 'active:translate-y-[0.3rem]'],
    0.4: ['active:translate-x-[0.4rem]', 'active:translate-y-[0.4rem]'],
    0.5: ['active:translate-x-[0.5rem]', 'active:translate-y-[0.5rem]'],
    0.6: ['active:translate-x-[0.6rem]', 'active:translate-y-[0.6rem]'],
    0.7: ['active:translate-x-[0.7rem]', 'active:translate-y-[0.7rem]'],
    0.8: ['active:translate-x-[0.8rem]', 'active:translate-y-[0.8rem]'],
    0.9: ['active:translate-x-[0.9rem]', 'active:translate-y-[0.9rem]'],
    1: ['active:translate-x-[1rem]', 'active:translate-y-[1rem]']
}

export const LED_SHADOW_LENGTH_TO_TAILWIND_TRANSLATE_CLASS_MAP = {
    0.1: ['translate-x-[0.1rem]', 'translate-y-[0.1rem]'],
    0.2: ['translate-x-[0.2rem]', 'translate-y-[0.2rem]'],
    0.3: ['translate-x-[0.3rem]', 'translate-y-[0.3rem]'],
    0.4: ['translate-x-[0.4rem]', 'translate-y-[0.4rem]'],
    0.5: ['translate-x-[0.5rem]', 'translate-y-[0.5rem]'],
    0.6: ['translate-x-[0.6rem]', 'translate-y-[0.6rem]'],
    0.7: ['translate-x-[0.7rem]', 'translate-y-[0.7rem]'],
    0.8: ['translate-x-[0.8rem]', 'translate-y-[0.8rem]'],
    0.9: ['translate-x-[0.9rem]', 'translate-y-[0.9rem]'],
    1: ['translate-x-[1rem]', 'translate-y-[1rem]']
}

export const SUDOKU_GRID = Object.freeze({
    BORDER_COLOR: '#777',
    PLUS_ICON_BORDER_SIZE: 16,
    PLUS_ICON_STROKE_WIDTH: 1.5,
    MINUS_ICON_BORDER_SIZE: 16,
    MINUS_ICON_STROKE_WIDTH: 1.5,
})

export const INPUT_MODE = {
    PENCIL: 'PENCIL',
    NUMPAD: 'NUMPAD'
} as const

export type INPUT_MODE = (typeof INPUT_MODE)[keyof typeof INPUT_MODE];

export const GAME_MODE = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
} as const

export type GAME_MODE = (typeof GAME_MODE)[keyof typeof GAME_MODE];

export const DIGITS_ONLY_REGEX = /^\d*$/