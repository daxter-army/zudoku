export type TerminalButtonProps = {
    title?: string,
    isDisabled?: boolean
    children: React.ReactNode
    onClickHandler?: () => void
    customButtonClassNames?: string
    customShadowClassNames?: string
    customContainerClassNames?: string
}