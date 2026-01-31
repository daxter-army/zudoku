import Backdrop from "@/components/Modal/Backdrop"
import TerminalButton from "@/components/TerminalButton/TerminalButton"

import type { GameInfoModalProps } from "./GameInfoModal.props"

const GameInfoModal = ({
    onCloseClickHandler,
    onBackdropClickHandler,
}: GameInfoModalProps) => {
    return (
        <Backdrop onBackdropClickHandler={onBackdropClickHandler}>
            <div className="gameInfoModalContainer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <TerminalButton
                    onClickHandler={onCloseClickHandler}
                    customButtonClassNames='text-left'
                >
                    <p>Welcome to zudoku (sudoku for enthusiasts)</p>
                    <br />
                    <p className="text-xs">There are 2 ways to input numbers:</p>
                    <p className="text-xs">1. First is <b>pencil mode</b> which is specially designed for iPad + Apple pencil users, it provides near paper-pencil experience. You can double tap on any cell to input hint numbers. People using laptop/physical keyboards can also play in this mode.</p>
                    <p className="text-xs">2. Other one is <b>numpad mode</b> which provides a numpad on the screen, on which user can click to fill number in the focused cell</p>
                </TerminalButton>
            </div>
        </Backdrop>
    )
}

export default GameInfoModal
