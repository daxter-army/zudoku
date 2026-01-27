import { useEffect, useMemo, useRef, useState } from 'react'
import { Keyboard, Minus, Pause, Pencil, Play, Plus, RotateCcw, X } from 'lucide-react'

import { getSudoku } from 'sudoku-gen'
import type { Sudoku } from 'sudoku-gen/dist/types/sudoku.type'

import TerminalButton from '../TerminalButton/TerminalButton'

import { getDisplayTime } from '@/utils/utils'

import { DIGITS_ONLY_REGEX, INPUT_MODE, SUDOKU_GRID } from '@/constants/common'

import type { SudokuGridProps } from "./SudokuGrid.props"

const SudokuGrid = ({ gameMode, timer, setGameMode, setTimer, isPlay, setIsPlay }: SudokuGridProps) => {
    const timerRef = useRef<number>(0)
    const sudokuConfigRef = useRef<Sudoku>(getSudoku(gameMode))

    const [inputMode, setInputMode] = useState<INPUT_MODE>(INPUT_MODE.PENCIL)
    const [userSudokuPuzzle, setUserSudokuPuzzle] = useState(sudokuConfigRef.current.puzzle)

    const sudokuGrid = useMemo(() => {
        return Array.from({ length: 9 }, (_, i) =>
            userSudokuPuzzle.slice(i * 9, i * 9 + 9).split('')
        )
    }, [userSudokuPuzzle])

    const onGameStopHandler = () => {
        setGameMode(null)
        setIsPlay(false)
    }

    const onGameResetHandler = () => {
        setUserSudokuPuzzle(sudokuConfigRef.current.puzzle)
        setTimer(0)
        setIsPlay(true)
    }

    const onPlayPauseClickHandler = () => {
        if (isPlay && timerRef.current) {
            clearInterval(timerRef.current)
            setIsPlay(false)

            return
        }

        timerRef.current = setInterval(() => {
            setTimer(prev => prev + 1)
        }, 1000)
        setIsPlay(true)
    }

    const onSudokuCellInputHandler = (value: string, i: number, j: number) => {
        if (!DIGITS_ONLY_REGEX.test(value)) return

        const normalizedIndex = (i * 9) + j
        const formattedValue =
            value.length === 0
                ? "-"
                : value.length > 1
                    ? value.slice(0, 1)
                    : value

        const newUserSudokuPuzzle =
            userSudokuPuzzle.substring(0, normalizedIndex) +
            formattedValue +
            userSudokuPuzzle.substring(normalizedIndex + 1)

        console.log(normalizedIndex, value)
        // console.log(userSudokuPuzzle)
        // console.log(newUserSudokuPuzzle)

        setUserSudokuPuzzle(newUserSudokuPuzzle)
    }

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTimer(prev => prev + 1)
        }, 1000)

        return () => {
            if (!timerRef.current) return
            clearInterval(timerRef.current)
            setTimer(0)
        }
    }, [])

    return (
        <>
            <div className='flex flex-1 justify-between'>
                <div className='flex items-center gap-2'>
                    <TerminalButton title={isPlay ? 'pause game' : 'resume game'} customContainerClassNames='mr-1 mb-1' onClickHandler={onPlayPauseClickHandler} customButtonClassNames='!pt-2 !py-2 !px-2' customShadowClassNames=' bg'>
                        {
                            isPlay
                                ? <Pause size={16} color='white' />
                                : <Play size={16} color='white' />
                        }
                    </TerminalButton>
                    <p className='text-sm ibm-plex-mono-regular'>{getDisplayTime(timer)} • {gameMode}</p>
                </div>
                <div className='flex'>
                    {
                        inputMode === INPUT_MODE.PENCIL
                            ? <TerminalButton title='pencil/stylus mode' customContainerClassNames='mb-1' onClickHandler={() => setInputMode(INPUT_MODE.NUMPAD)} customButtonClassNames='!pt-2 !py-2 !px-2'>
                                <Pencil size={16} color='white' />
                            </TerminalButton>
                            : <TerminalButton title='numpad mode' customContainerClassNames='mb-1' onClickHandler={() => setInputMode(INPUT_MODE.PENCIL)} customButtonClassNames='!pt-2 !py-2 !px-2'>
                                <Keyboard size={16} color='white' />
                            </TerminalButton>
                    }
                    <TerminalButton customContainerClassNames='mb-1' onClickHandler={onGameResetHandler} customButtonClassNames='!pt-2 !py-2 !px-2'>
                        <RotateCcw size={16} color='white' />
                    </TerminalButton>
                    <TerminalButton customContainerClassNames='mr-1 mb-1' onClickHandler={onGameStopHandler} customButtonClassNames='!pt-2 !py-2 !px-2'>
                        <X size={16} color='white' />
                    </TerminalButton>
                </div>
            </div>
            <div className='grid grid-cols-9 relative'>
                {
                    sudokuGrid.map((row, rowIndex) => {
                        return row.map((col, colIndex) => {
                            return <div className='relative flex justify-center items-center aspect-square' key={`${rowIndex}${colIndex}`}>
                                <CellElements rowIndex={rowIndex} colIndex={colIndex} />
                                {
                                    sudokuConfigRef.current.puzzle[(rowIndex * 9) + colIndex] === '-'
                                        ? <input
                                            inputMode='numeric'
                                            value={col === '-' ? '' : col}
                                            style={{ paddingLeft: 'calc(50% - 0.5ch)' }}
                                            className='w-full h-full ibm-plex-mono-regular'
                                            onChange={(e) => onSudokuCellInputHandler(e.target.value, rowIndex, colIndex)}
                                        />
                                        : <div className='ibm-plex-mono-regular'>{col}</div>
                                }
                            </div>
                        })
                    })
                }
            </div>
        </>
    )
}

const CellElements = ({ rowIndex, colIndex }: { rowIndex: number, colIndex: number }) => {
    return <>
        {/* + icon in all the 4 corners */}
        {(colIndex % 3 === 0 || rowIndex % 3 === 0) && <div className='flex justify-center items-center absolute pos-top-left'>
            <Plus color={SUDOKU_GRID.BORDER_COLOR} size={SUDOKU_GRID.PLUS_ICON_BORDER_SIZE} strokeWidth={SUDOKU_GRID.PLUS_ICON_STROKE_WIDTH} />
        </div>}
        {colIndex + 1 === 9 && <div className='flex justify-center items-center absolute pos-top-right'>
            <Plus color={SUDOKU_GRID.BORDER_COLOR} size={SUDOKU_GRID.PLUS_ICON_BORDER_SIZE} strokeWidth={SUDOKU_GRID.PLUS_ICON_STROKE_WIDTH} />
        </div>}
        {rowIndex + 1 === 9 && colIndex + 1 === 9 && <div className='flex justify-center items-center absolute pos-bottom-right'>
            <Plus color={SUDOKU_GRID.BORDER_COLOR} size={SUDOKU_GRID.PLUS_ICON_BORDER_SIZE} strokeWidth={SUDOKU_GRID.PLUS_ICON_STROKE_WIDTH} />
        </div>}
        {rowIndex + 1 === 9 && <div className='flex justify-center items-center absolute pos-bottom-left' >
            <Plus color={SUDOKU_GRID.BORDER_COLOR} size={SUDOKU_GRID.PLUS_ICON_BORDER_SIZE} strokeWidth={SUDOKU_GRID.PLUS_ICON_STROKE_WIDTH} />
        </div>}
        {/* - icon on all the 4 edges */}
        {rowIndex % 3 === 0 && <div className='flex justify-center items-center absolute pos-top-middle'>
            <Minus color={SUDOKU_GRID.BORDER_COLOR} size={SUDOKU_GRID.MINUS_ICON_BORDER_SIZE} strokeWidth={SUDOKU_GRID.MINUS_ICON_STROKE_WIDTH} />
        </div>}
        {rowIndex + 1 === 9 && <div className='flex justify-center items-center absolute pos-bottom-middle'>
            <Minus color={SUDOKU_GRID.BORDER_COLOR} size={SUDOKU_GRID.MINUS_ICON_BORDER_SIZE} strokeWidth={SUDOKU_GRID.MINUS_ICON_STROKE_WIDTH} />
        </div>}
        {colIndex % 3 === 0 && <div className='flex justify-center items-center absolute pos-left-middle'>
            <Minus color={SUDOKU_GRID.BORDER_COLOR} size={SUDOKU_GRID.MINUS_ICON_BORDER_SIZE} strokeWidth={SUDOKU_GRID.MINUS_ICON_STROKE_WIDTH} />
        </div>}
        {colIndex + 1 === 9 && <div className='flex justify-center items-center absolute pos-right-middle'>
            <Minus color={SUDOKU_GRID.BORDER_COLOR} size={SUDOKU_GRID.MINUS_ICON_BORDER_SIZE} strokeWidth={SUDOKU_GRID.MINUS_ICON_STROKE_WIDTH} />
        </div>}
    </>
}

export default SudokuGrid
