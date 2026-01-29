import clsx from "clsx"
import { useState } from "react"
import { Lightbulb } from "lucide-react"

import CellHints from "./CellHints"
import CellElements from "./CellElements"

import { get1DIndexFrom2DIndex, getFormattedHintInput } from "@/utils/utils"

import {
    CELL_MODE,
    KEY_NAMES,
    INPUT_MODE,
    HINT_QUEUE_SIZE,
    SUDOKU_DELIMITER,
    AVAILABLE_INPUT_MODES,
} from "@/constants/common"

import type { SudokuCellProps } from "./SudokuCell.prop"

const SudokuCell = ({
    data,
    rowIndex,
    colIndex,
    isPlay,
    activeInputMode,
    focusCellCoords,
    sudokuConfigRef,
    setFocusCellCoords,
    onSudokuCellInputHandler,
}: SudokuCellProps) => {
    const [userHintInput, setUserHintInput] = useState("")
    const [cellMode, setCellMode] = useState<CELL_MODE>(CELL_MODE.SOLUTION)

    const onDoubleClickHandler = () => {
        if (!isPlay || AVAILABLE_INPUT_MODES[activeInputMode] === INPUT_MODE.NUMPAD || sudokuConfigRef.current.puzzle[get1DIndexFrom2DIndex(rowIndex, colIndex)] !== SUDOKU_DELIMITER) return

        setCellMode(cellMode === CELL_MODE.SOLUTION ? CELL_MODE.HINT : CELL_MODE.SOLUTION)
        setFocusCellCoords([rowIndex, colIndex])
    }

    const onHintInputFocusHandler = () => {
        setFocusCellCoords([rowIndex, colIndex])
    }

    const onHintInputBlurHandler = () => {
        setCellMode(CELL_MODE.SOLUTION)
        setFocusCellCoords([-1, -1])
    }

    const onSolutionInputFocusHandler = () => {
        setCellMode(CELL_MODE.SOLUTION)
        setFocusCellCoords([rowIndex, colIndex])
    }

    const onSolutionInputBlurHandler = () => {
        setFocusCellCoords([-1, -1])
    }

    const onHintInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawNewHintInput = userHintInput + e.target.value
        if (rawNewHintInput.length > HINT_QUEUE_SIZE) {
            return
        }

        const sorted = getFormattedHintInput(userHintInput + e.target.value).split('').sort().join('');
        setUserHintInput(sorted)
    }

    const onHintInputKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key.toLowerCase() !== KEY_NAMES.BACKSPACE) return

        setUserHintInput(userHintInput.slice(0, -1))
    }

    return (
        <div
            onDoubleClick={onDoubleClickHandler}
            className={clsx(
                'relative flex justify-center items-center aspect-square',
                { 'bg-[#222]': cellMode === CELL_MODE.HINT }
            )}
        >
            {
                cellMode === CELL_MODE.HINT &&
                userHintInput.length === 0 &&
                data === SUDOKU_DELIMITER &&
                <Lightbulb className="absolute opacity-30 pointer-events-none" size={18} color='white' />
            }
            <CellElements
                rowIndex={rowIndex}
                colIndex={colIndex}
                cellMode={cellMode}
                focusCellCoords={focusCellCoords}
            />
            <CellHints data={userHintInput.split('')} />
            {
                sudokuConfigRef.current.puzzle[get1DIndexFrom2DIndex(rowIndex, colIndex)] === SUDOKU_DELIMITER
                    ? isPlay
                        ? AVAILABLE_INPUT_MODES[activeInputMode] === INPUT_MODE.PENCIL
                            ? cellMode === CELL_MODE.HINT
                                ? <input
                                    value=''
                                    inputMode='numeric'
                                    onFocus={onHintInputFocusHandler}
                                    onBlur={onHintInputBlurHandler}
                                    onKeyDown={onHintInputKeyDownHandler}
                                    onChange={onHintInputChangeHandler}
                                    placeholder={data === SUDOKU_DELIMITER ? '' : data}
                                    style={{ caretColor: 'transparent', paddingLeft: 'calc(50% - 0.5ch)' }}
                                    className='w-full h-full ibm-plex-mono-regular bg-transparent outline-none'
                                />
                                : <input
                                    inputMode='numeric'
                                    onFocus={onSolutionInputFocusHandler}
                                    onBlur={onSolutionInputBlurHandler}
                                    style={{ paddingLeft: 'calc(50% - 0.5ch)' }}
                                    value={data === SUDOKU_DELIMITER ? '' : data}
                                    className='w-full h-full ibm-plex-mono-regular outline-none'
                                    onChange={(e) => onSudokuCellInputHandler(e.target.value, rowIndex, colIndex)}
                                />
                            : <div onClick={onSolutionInputFocusHandler} className='w-full h-full flex justify-center items-center ibm-plex-mono-regular'>{data === SUDOKU_DELIMITER ? '' : data}</div>
                        : <div className='w-full h-full flex justify-center items-center ibm-plex-mono-regular'>{data === SUDOKU_DELIMITER ? '' : data}</div>
                    : <div className='w-full h-full flex justify-center items-center ibm-plex-mono-regular'>{data}</div>
            }
        </div>
    )
}

export default SudokuCell
