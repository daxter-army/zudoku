import type { ReactNode } from "react"
import { createPortal } from "react-dom"

type BackdropProps = {
    children: ReactNode
    onBackdropClickHandler: () => void
}

const Backdrop = ({ children, onBackdropClickHandler }: BackdropProps) => {
    return createPortal(
        <div
            onClick={onBackdropClickHandler}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            className="absolute top-0 left-0 z-9999 w-full h-full"
        >
            {children}
        </div>,
        document.getElementById("modalRoot")!
    )
}

export default Backdrop
