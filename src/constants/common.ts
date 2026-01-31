export const INPUT_MODE = {
    PENCIL: 'PENCIL',
    NUMPAD: 'NUMPAD',
} as const
export type INPUT_MODE = (typeof INPUT_MODE)[keyof typeof INPUT_MODE];

export const GAME_MODE = {
    EASY: 'easy',
    MEDIUM: 'medium',
    HARD: 'hard',
} as const
export type GAME_MODE = (typeof GAME_MODE)[keyof typeof GAME_MODE];

export const ID_TYPE = {
    INTERVAL: 'INTERVAL',
    TIMEOUT: 'TIMEOUT',
} as const
export type ID_TYPE = (typeof ID_TYPE)[keyof typeof ID_TYPE];

export const CELL_MODE = {
    HINT: 'HINT',
    SOLUTION: 'SOLUTION'
} as const
export type CELL_MODE = (typeof CELL_MODE)[keyof typeof CELL_MODE];

export const MODAL_TYPE = {
    INFO: 'INFO',
}
export type MODAL_TYPE = (typeof MODAL_TYPE)[keyof typeof MODAL_TYPE];

export const AVAILABLE_INPUT_MODES = [
    INPUT_MODE.PENCIL, // apple pencil input
    INPUT_MODE.NUMPAD, // on screen numpad (e.g mobile)
]

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

export const SUDOKU_DELIMITER = "-"

export const SUDOKU_GRID = Object.freeze({
    BORDER_COLOR: '#444',
    HINT_BORDER_COLOR: '#FFEA00',
    FOCUSED_BORDER_COLOR: '#777',
    PLUS_ICON_BORDER_SIZE: 15,
    PLUS_ICON_STROKE_WIDTH: 1.5,
    MINUS_ICON_BORDER_SIZE: 15,
    MINUS_ICON_STROKE_WIDTH: 1.5,
})

export const DIGITS_ONLY_REGEX = /\D/g
export const DIGITS_FROM_1_TO_9_ONLY_REGEX = /[^1-9]/g
export const NO_DUPLICATED_DIGITS_ONLY_REGEX = /(.)(?=.*\1)/g

export const NUMPAD_KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

export const HINT_QUEUE_SIZE = 8
export const KEY_NAMES = {
    BACKSPACE: 'backspace'
}