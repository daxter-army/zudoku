import type { Sudoku } from "sudoku-gen/dist/types/sudoku.type"

import type { CELL_MODE } from "@/constants/common"

export type CellElementsProps = { cellMode: CELL_MODE, focusCellCoords: number[], rowIndex: number, colIndex: number }

export type SudokuCellProps = {
    data: string
    isPlay: boolean
    rowIndex: number
    colIndex: number
    activeInputMode: number
    focusCellCoords: number[]
    setFocusCellCoords: React.Dispatch<React.SetStateAction<number[]>>
    sudokuConfigRef: React.RefObject<Sudoku>
    onSudokuCellInputHandler: (value: string, rowIndex: number, colIndex: number) => void
}