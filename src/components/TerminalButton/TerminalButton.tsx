import { clsx } from "clsx"
import type { TerminalButtonProps } from "./TerminalButton.props"

const TerminalButton = ({
    title,
    children,
    onClickHandler,
    isDisabled = false,
    customButtonClassNames,
    customShadowClassNames,
    customContainerClassNames,
}: TerminalButtonProps) => {
    return (
        <div className={clsx('relative w-fit flex', customContainerClassNames)}>
            <button
                title={title}
                disabled={isDisabled}
                className={
                    clsx("border py-1 px-2 pt-0.5 border-white",
                        "bg-black text-sm ibm-plex-mono-regular",
                        " active:translate-x-1 active:translate-y-1 will-change-transform",
                        customButtonClassNames)
                }
                onClick={onClickHandler}>{children}</button>
            <div className={clsx("z-[-1] absolute w-full h-full top-1 left-1 bg-white", customShadowClassNames)} />
        </div>
    )
}

export default TerminalButton
