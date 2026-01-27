export type TerminalButtonProps = {
    title?: string,
    children: React.ReactNode
    onClickHandler?: () => void
    customContainerClassNames?: string
    customButtonClassNames?: string
    customShadowClassNames?: string
}