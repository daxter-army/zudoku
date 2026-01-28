import type { Sudoku } from "sudoku-gen/dist/types/sudoku.type"

export type SudokuCellProps = {
    data: string
    isPlay: boolean
    rowIndex: number
    colIndex: number
    sudokuConfigRef: React.RefObject<Sudoku>
    onSudokuCellInputHandler: (value: string, rowIndex: number, colIndex: number) => void
}