import type { GAME_MODE } from "@/constants/common"

export type SudokuGridProps = {
    timer: number
    isPlay: boolean
    gameMode: GAME_MODE
    setTimer: React.Dispatch<React.SetStateAction<number>>
    setIsPlay: React.Dispatch<React.SetStateAction<boolean>>
    setGameMode: React.Dispatch<React.SetStateAction<GAME_MODE | null>>
}