import clsx from "clsx"
import { Minus, Plus } from "lucide-react"
import { useState, type ChangeEvent } from "react"

import { get1DIndexFrom2DIndex, getFormattedHintInput } from "@/utils/utils"

import { HINT_QUEUE_SIZE, SUDOKU_DELIMITER, SUDOKU_GRID } from "@/constants/common"

import type { SudokuCellProps } from "./SudokuCell.prop"

const SudokuCell = ({ rowIndex, colIndex, data, onSudokuCellInputHandler, sudokuConfigRef, isPlay }: SudokuCellProps) => {
    const [userHintInput, setUserHintInput] = useState("")

    const [isDoubleClickStateActive, setIsDoubleClickStateActive] = useState(false)

    const onBlurHandler = () => {
        setIsDoubleClickStateActive(false)
    }

    const onHintInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let formattedInputValue = getFormattedHintInput(e.target.value)

        if (formattedInputValue.length > HINT_QUEUE_SIZE) {
            formattedInputValue = formattedInputValue.slice(1)
        }

        setUserHintInput(formattedInputValue)
    }

    return (
        <div
            className={clsx(
                'relative flex justify-center items-center aspect-square',
                { 'border border-red-500': isDoubleClickStateActive }
            )}
        >
            <CellElements rowIndex={rowIndex} colIndex={colIndex} />
            <CellHints data={userHintInput.split('')} />
            {
                sudokuConfigRef.current.puzzle[get1DIndexFrom2DIndex(rowIndex, colIndex)] === SUDOKU_DELIMITER
                    ? isDoubleClickStateActive
                        ? <input
                            inputMode='numeric'
                            value={userHintInput}
                            onBlur={onBlurHandler}
                            onChange={onHintInputChangeHandler}
                            style={{ paddingLeft: 'calc(50%)', paddingRight: 'calc(50%)' }}
                            className='w-full h-full ibm-plex-mono-regular'
                        />
                        : <input
                            inputMode='numeric'
                            style={{ paddingLeft: 'calc(50% - 0.5ch)' }}
                            value={data === SUDOKU_DELIMITER ? '' : data}
                            className='w-full h-full ibm-plex-mono-regular outline-none'
                            onChange={(e) => onSudokuCellInputHandler(e.target.value, rowIndex, colIndex)}
                        />
                    : <div className='ibm-plex-mono-regular'>{data}</div>
            }
        </div>
    )
}

const CellHints = ({ data }: { data: string[] }) => {
    const getClassName = (i: number): string => {
        switch (i) {
            case 1: return 'pos-top-left'
            case 2: return 'pos-top-middle'
            case 3: return 'pos-top-right'
            case 4: return 'pos-right-middle'
            case 5: return 'pos-bottom-right'
            case 6: return 'pos-bottom-middle'
            case 7: return 'pos-bottom-left'
            case 8: return 'pos-left-middle'
            default: return ''
        }
    }

    return <>
        {
            data.map((hint, i) => {
                return <span key={i} className={getClassName(i + 1)}>
                    {hint}
                </span>
            })
        }
    </>
}

const CellElements = ({ rowIndex, colIndex }: { rowIndex: number, colIndex: number }) => {
    const iconColor = SUDOKU_GRID.BORDER_COLOR
    const plusIconSize = SUDOKU_GRID.PLUS_ICON_BORDER_SIZE
    const plusIconStrokeWidth = SUDOKU_GRID.PLUS_ICON_STROKE_WIDTH
    const minusIconSize = SUDOKU_GRID.MINUS_ICON_BORDER_SIZE
    const minusIconStrokeWidth = SUDOKU_GRID.MINUS_ICON_STROKE_WIDTH
    const commonClass = 'flex justify-center items-center absolute'

    return <>
        {/* + icon in all the 4 corners */}
        {(colIndex % 3 === 0 || rowIndex % 3 === 0) && <span className={`${commonClass} pos-top-left`}>
            <Plus
                color={iconColor}
                size={plusIconSize}
                strokeWidth={plusIconStrokeWidth}
            />
        </span>}
        {colIndex + 1 === 9 && <span className={`${commonClass} pos-top-right`}>
            <Plus
                color={iconColor}
                size={plusIconSize}
                strokeWidth={plusIconStrokeWidth}
            />
        </span>}
        {rowIndex + 1 === 9 && colIndex + 1 === 9 && <span className={`${commonClass} pos-bottom-right`}>
            <Plus
                color={iconColor}
                size={plusIconSize}
                strokeWidth={plusIconStrokeWidth}
            />
        </span>}
        {rowIndex + 1 === 9 && <span className={`${commonClass} pos-bottom-left`}>
            <Plus
                color={iconColor}
                size={plusIconSize}
                strokeWidth={plusIconStrokeWidth}
            />
        </span>}
        {/* - icon on all the 4 edges */}
        {rowIndex % 3 === 0 && <span className={`${commonClass} pos-top-middle`}>
            <Minus
                color={iconColor}
                size={minusIconSize}
                strokeWidth={minusIconStrokeWidth}
            />
        </span>}
        {colIndex + 1 === 9 && <span className={`${commonClass} pos-right-middle-rotated`}>
            <Minus
                color={iconColor}
                size={minusIconSize}
                strokeWidth={minusIconStrokeWidth}
            />
        </span>}
        {rowIndex + 1 === 9 && <span className={`${commonClass} pos-bottom-middle`}>
            <Minus
                color={iconColor}
                size={minusIconSize}
                strokeWidth={minusIconStrokeWidth}
            />
        </span>}
        {colIndex % 3 === 0 && <span className={`${commonClass} pos-left-middle-rotated`}>
            <Minus
                color={iconColor}
                size={minusIconSize}
                strokeWidth={minusIconStrokeWidth}
            />
        </span>}
    </>
}

export default SudokuCell
