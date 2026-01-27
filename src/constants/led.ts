export const LED_STATE = {
    ON: '11',
    RIGHT_PARTIAL_ON: '01',
    LEFT_PARTIAL_ON: '10',
    OFF: '00'
} as const

export type LED_STATE = (typeof LED_STATE)[keyof typeof LED_STATE];

export type ledMatixItemConfig = {
    state: LED_STATE,
    isPressed?: boolean,
    width: number,
    height: number
    color?: string,
    shadowColor?: string
}

const LED_COLOR = 'white'
const LED_SIZE_WIDTH = 0.9 // this is in rem
const LED_SIZE_HEIGHT = 0.9 // this is in rem
export const LED_SHADOW_LENGTH = 0.4 // this is in rem

const separatorLed: ledMatixItemConfig = {
    state: LED_STATE.OFF,
    width: LED_SIZE_WIDTH,
    height: LED_SIZE_HEIGHT,
}

export const fullLed: ledMatixItemConfig = {
    state: LED_STATE.ON,
    width: LED_SIZE_WIDTH,
    height: LED_SIZE_HEIGHT,
    color: LED_COLOR,
    shadowColor: 'red'
}

export const rightPartialLed = {
    state: LED_STATE.RIGHT_PARTIAL_ON,
    width: LED_SIZE_WIDTH,
    height: LED_SIZE_HEIGHT,
    color: LED_COLOR,
    shadowColor: 'red'
}

export const leftPartialLed = {
    state: LED_STATE.LEFT_PARTIAL_ON,
    width: LED_SIZE_WIDTH,
    height: LED_SIZE_HEIGHT,
    color: LED_COLOR,
    shadowColor: 'red'
}

export const offLed = {
    state: LED_STATE.OFF,
    width: LED_SIZE_WIDTH,
    height: LED_SIZE_HEIGHT,
}

const LED_MATRIX_CONFIG_SU_CONFIG: ledMatixItemConfig[][] = [
    [fullLed, fullLed, fullLed, fullLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [fullLed, offLed, offLed, offLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [fullLed, fullLed, fullLed, fullLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [offLed, offLed, offLed, fullLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [fullLed, fullLed, fullLed, fullLed, separatorLed, rightPartialLed, fullLed, fullLed, leftPartialLed]
]

const LED_MATRIX_CONFIG_DO_CONFIG: ledMatixItemConfig[][] = [
    [fullLed, fullLed, fullLed, leftPartialLed, separatorLed, rightPartialLed, fullLed, fullLed, leftPartialLed],
    [fullLed, offLed, offLed, fullLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [fullLed, offLed, offLed, fullLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [fullLed, offLed, offLed, fullLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [fullLed, fullLed, fullLed, leftPartialLed, separatorLed, rightPartialLed, fullLed, fullLed, leftPartialLed],
]

const LED_MATRIX_CONFIG_KU_CONFIG: ledMatixItemConfig[][] = [
    [fullLed, offLed, offLed, fullLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [fullLed, offLed, fullLed, offLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [fullLed, fullLed, offLed, offLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [fullLed, offLed, fullLed, offLed, separatorLed, fullLed, offLed, offLed, fullLed],
    [fullLed, offLed, offLed, fullLed, separatorLed, rightPartialLed, fullLed, fullLed, leftPartialLed],
]

export const LED_MATRIX_CONFIG: ledMatixItemConfig[][] = [
    [
        ...LED_MATRIX_CONFIG_SU_CONFIG[0],
        separatorLed,
        ...LED_MATRIX_CONFIG_DO_CONFIG[0],
        separatorLed,
        ...LED_MATRIX_CONFIG_KU_CONFIG[0],
    ],
    [
        ...LED_MATRIX_CONFIG_SU_CONFIG[1],
        separatorLed,
        ...LED_MATRIX_CONFIG_DO_CONFIG[1],
        separatorLed,
        ...LED_MATRIX_CONFIG_KU_CONFIG[1],
    ],
    [
        ...LED_MATRIX_CONFIG_SU_CONFIG[2],
        separatorLed,
        ...LED_MATRIX_CONFIG_DO_CONFIG[2],
        separatorLed,
        ...LED_MATRIX_CONFIG_KU_CONFIG[2],
    ],
    [
        ...LED_MATRIX_CONFIG_SU_CONFIG[3],
        separatorLed,
        ...LED_MATRIX_CONFIG_DO_CONFIG[3],
        separatorLed,
        ...LED_MATRIX_CONFIG_KU_CONFIG[3],
    ],
    [
        ...LED_MATRIX_CONFIG_SU_CONFIG[4],
        separatorLed,
        ...LED_MATRIX_CONFIG_DO_CONFIG[4],
        separatorLed,
        ...LED_MATRIX_CONFIG_KU_CONFIG[4],
    ],
]

// this is in rem
export const ARENA_WIDTH = LED_SHADOW_LENGTH + (LED_SIZE_WIDTH * LED_MATRIX_CONFIG[0].length)
