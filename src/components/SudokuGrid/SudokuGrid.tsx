import clsx from 'clsx'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Info, Keyboard, Pause, Pencil, Play, RotateCcw, X } from 'lucide-react'

import { getSudoku } from 'sudoku-gen'
import type { Sudoku } from 'sudoku-gen/dist/types/sudoku.type'

import SudokuCell from '@/components/SudokuCell/SudokuCell'
import GameInfoModal from '@/components/Modal/GameInfo/GameInfoModal'
import TerminalButton from '@/components/TerminalButton/TerminalButton'

import { get1DIndexFrom2DIndex, getDisplayTime, getFormattedCellInput } from '@/utils/utils'

import { AVAILABLE_INPUT_MODES, INPUT_MODE, MODAL_TYPE, NUMPAD_KEYS } from '@/constants/common'

import type { SudokuGridProps } from "./SudokuGrid.props"

const SudokuGrid = ({
    timer,
    gameMode,
    setGameMode,
    setTimer,
    isPlay,
    setIsPlay,
    isSolved,
    setIsSolved
}: SudokuGridProps) => {
    const timerRef = useRef<number>(0)
    const sudokuConfigRef = useRef<Sudoku>(getSudoku(gameMode))

    const [modal, setModal] = useState<MODAL_TYPE | null>(null)

    const [activeInputMode, setActiveInputMode] = useState(0)
    const [focusCellCoords, setFocusCellCoords] = useState<number[]>([-1, -1])
    const [userSudokuPuzzle, setUserSudokuPuzzle] = useState(sudokuConfigRef.current.puzzle)

    const sudokuGrid = useMemo(() => {
        return Array.from({ length: 9 }, (_, i) =>
            userSudokuPuzzle.slice(i * 9, i * 9 + 9).split('')
        )
    }, [userSudokuPuzzle])

    const onInputModeClickHandler = () => {
        if (activeInputMode + 1 >= AVAILABLE_INPUT_MODES.length) {
            setActiveInputMode(0)
            return
        }

        setActiveInputMode(activeInputMode + 1)
    }

    const onGameStopHandler = () => {
        setGameMode(null)

        setIsSolved(false)
        onPauseClickHandler()
    }

    const onInfoClickHandler = () => {
        setModal(!modal ? MODAL_TYPE.INFO : null)
    }

    const onGameResetHandler = () => {
        setUserSudokuPuzzle(sudokuConfigRef.current.puzzle)
        setTimer(0)

        setIsSolved(false)
        onPauseClickHandler()
    }

    const onPlayClickHandler = () => {
        if (isPlay || isSolved) return

        timerRef.current = setInterval(() => {
            setTimer(prev => prev + 1)
        }, 1000)

        setIsPlay(true)
    }

    const onPauseClickHandler = () => {
        if (!isPlay || !timerRef.current) return

        console.log("here", timerRef.current)
        clearInterval(timerRef.current)
        setIsPlay(false)
    }

    const onSudokuCellInputHandler = (value: string, i: number, j: number) => {
        if (!isPlay) return

        const normalizedIndex = get1DIndexFrom2DIndex(i, j)
        const newUserSudokuPuzzle =
            // old sudoku puzzle string
            userSudokuPuzzle.substring(0, normalizedIndex) +
            // new number
            getFormattedCellInput(value) +
            // old sudoku puzzle string
            userSudokuPuzzle.substring(normalizedIndex + 1)

        setUserSudokuPuzzle(newUserSudokuPuzzle)
    }

    const onNumpadKeyClickHandler = (num: string) => {
        const [focusRowIndex, focusColIndex] = focusCellCoords
        if (focusRowIndex == -1 && focusColIndex == -1) return

        onSudokuCellInputHandler(num, focusRowIndex, focusColIndex)
    }

    // this checks whether the sudoku is solved or not
    useEffect(() => {
        if (userSudokuPuzzle !== sudokuConfigRef.current.solution) return

        setIsSolved(true)
        onPauseClickHandler()
    }, [userSudokuPuzzle])

    // for handling timer
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
                    {
                        isPlay
                            ? <TerminalButton
                                title='pause game'
                                customContainerClassNames='mr-1 mb-1'
                                onClickHandler={onPauseClickHandler}
                                customButtonClassNames='!pt-2 !py-2 !px-2'>
                                <Pause size={16} color='white' />
                            </TerminalButton>
                            : <TerminalButton
                                title='resume game'
                                customContainerClassNames='mr-1 mb-1'
                                onClickHandler={onPlayClickHandler}
                                customButtonClassNames='!pt-2 !py-2 !px-2'>
                                <Play size={16} color='white' />
                            </TerminalButton>
                    }
                    <p className='text-sm ibm-plex-mono-regular'>{getDisplayTime(timer)} • {gameMode}</p>
                </div>
                <div className='flex'>
                    <TerminalButton customContainerClassNames='mb-1' onClickHandler={onInfoClickHandler} customButtonClassNames='!pt-2 !py-2 !px-2'>
                        <Info size={16} color='white' />
                    </TerminalButton>
                    <TerminalButton
                        title='pencil/stylus mode'
                        customContainerClassNames='mb-1'
                        customButtonClassNames='!pt-2 !py-2 !px-2'
                        onClickHandler={onInputModeClickHandler}
                    >
                        {INPUT_MODE_TO_ICON_MAP[AVAILABLE_INPUT_MODES[activeInputMode]]}
                    </TerminalButton>
                    <TerminalButton customContainerClassNames='mb-1' onClickHandler={onGameResetHandler} customButtonClassNames='!pt-2 !py-2 !px-2'>
                        <RotateCcw size={16} color='white' />
                    </TerminalButton>
                    <TerminalButton customContainerClassNames='mr-1 mb-1' onClickHandler={onGameStopHandler} customButtonClassNames='!pt-2 !py-2 !px-2'>
                        <X size={16} color='white' />
                    </TerminalButton>
                </div>
            </div>
            {modal && <GameInfoModal onBackdropClickHandler={onInfoClickHandler} />}
            {AVAILABLE_INPUT_MODES[activeInputMode] === INPUT_MODE.NUMPAD && <div className='flex'>
                {NUMPAD_KEYS.map((num, i) => <TerminalButton
                    key={i}
                    onClickHandler={() => onNumpadKeyClickHandler(num)}
                    customButtonClassNames='flex-1 !pt-2 !py-2 !px-2 text-[1.1rem]'
                    customContainerClassNames={clsx('mb-1 flex-1 aspect-square', { 'mr-1': num === '9' })}
                >
                    {num}
                </TerminalButton>)}
            </div>}
            <div className={clsx('grid grid-cols-9 relative', { 'cursor-not-allowed': !isPlay })}>
                {
                    sudokuGrid.map((row, rowIndex) => {
                        return row.map((col, colIndex) => <SudokuCell
                            key={`${rowIndex}${colIndex}`}
                            data={col}
                            isPlay={isPlay}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            activeInputMode={activeInputMode}
                            sudokuConfigRef={sudokuConfigRef}
                            focusCellCoords={focusCellCoords}
                            setFocusCellCoords={setFocusCellCoords}
                            onSudokuCellInputHandler={onSudokuCellInputHandler}
                        />)
                    })
                }
            </div>
        </>
    )
}

const INPUT_MODE_TO_ICON_MAP = {
    [INPUT_MODE.PENCIL]: <Pencil size={16} color='white' />,
    [INPUT_MODE.NUMPAD]: <Keyboard size={16} color='white' />,
}

export default SudokuGrid
