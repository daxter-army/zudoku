import { Minus, Plus } from "lucide-react"

import { SUDOKU_GRID } from "@/constants/common"

import type { CellElementsProps } from "./SudokuCell.prop"

const CellElements = ({ cellMode, focusCellCoords, rowIndex, colIndex }: CellElementsProps) => {
    const iconColor = SUDOKU_GRID.BORDER_COLOR
    const iconFocusColor = SUDOKU_GRID.FOCUSED_BORDER_COLOR
    const plusIconSize = SUDOKU_GRID.PLUS_ICON_BORDER_SIZE
    const plusIconStrokeWidth = SUDOKU_GRID.PLUS_ICON_STROKE_WIDTH
    const minusIconSize = SUDOKU_GRID.MINUS_ICON_BORDER_SIZE
    const minusIconStrokeWidth = SUDOKU_GRID.MINUS_ICON_STROKE_WIDTH
    const commonClass = 'flex justify-center items-center absolute pointer-events-none'

    const [focusRowIndex, focusColumnIndex] = focusCellCoords
    const isRowInFocus = focusRowIndex === rowIndex
    const isColumnInFocus = focusColumnIndex === colIndex

    // console.log(cellMode)
    const isTopLeftElementFocused =
        isRowInFocus || isColumnInFocus || focusRowIndex + 1 === rowIndex || focusColumnIndex + 1 === colIndex

    return <>
        {/* + icon in all the 4 corners */}
        {((rowIndex % 3 === 0 || colIndex % 3 === 0) || isTopLeftElementFocused) && <span className={`${commonClass} pos-top-left`}>
            <Plus
                size={plusIconSize}
                strokeWidth={plusIconStrokeWidth}
                color={focusColumnIndex !== -1 ? isTopLeftElementFocused ? iconFocusColor : iconColor : iconColor}
            />
        </span>}
        {colIndex + 1 === 9 && <span className={`${commonClass} pos-top-right`}>
            <Plus
                color={focusColumnIndex !== -1 ? isRowInFocus || isColumnInFocus || focusRowIndex + 1 === rowIndex ? iconFocusColor : iconColor : iconColor}
                size={plusIconSize}
                strokeWidth={plusIconStrokeWidth}
            />
        </span>}
        {rowIndex + 1 === 9 && colIndex + 1 === 9 && <span className={`${commonClass} pos-bottom-right`}>
            <Plus
                color={isRowInFocus || isColumnInFocus ? iconFocusColor : iconColor}
                size={plusIconSize}
                strokeWidth={plusIconStrokeWidth}
            />
        </span>}
        {rowIndex + 1 === 9 && <span className={`${commonClass} pos-bottom-left`}>
            <Plus
                size={plusIconSize}
                strokeWidth={plusIconStrokeWidth}
                color={focusColumnIndex !== -1 ? isRowInFocus || isColumnInFocus || focusColumnIndex + 1 === colIndex ? iconFocusColor : iconColor : iconColor}
            />
        </span>}
        {/* - icon on all the 4 edges */}
        {(rowIndex % 3 === 0 || isRowInFocus || isColumnInFocus || focusRowIndex + 1 === rowIndex) && <span className={`${commonClass} pos-top-middle`}>
            <Minus
                color={focusRowIndex !== -1 ? isRowInFocus || isColumnInFocus || focusRowIndex + 1 === rowIndex ? iconFocusColor : iconColor : iconColor}
                size={minusIconSize}
                strokeWidth={minusIconStrokeWidth}
            />
        </span>}
        {colIndex + 1 === 9 && <span className={`${commonClass} pos-right-middle-rotated`}>
            <Minus
                color={isRowInFocus || isColumnInFocus ? iconFocusColor : iconColor}
                size={minusIconSize}
                strokeWidth={minusIconStrokeWidth}
            />
        </span>}
        {rowIndex + 1 === 9 && <span className={`${commonClass} pos-bottom-middle`}>
            <Minus
                color={isRowInFocus || isColumnInFocus ? iconFocusColor : iconColor}
                size={minusIconSize}
                strokeWidth={minusIconStrokeWidth}
            />
        </span>}
        {(colIndex % 3 === 0 || isRowInFocus || isColumnInFocus || focusColumnIndex + 1 === colIndex) && <span className={`${commonClass} pos-left-middle-rotated`}>
            <Minus
                color={focusColumnIndex !== -1 ? isRowInFocus || isColumnInFocus || focusColumnIndex + 1 === colIndex ? iconFocusColor : iconColor : iconColor}
                size={minusIconSize}
                strokeWidth={minusIconStrokeWidth}
            />
        </span>}
    </>
}

export default CellElements