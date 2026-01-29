import clsx from "clsx"
import { Fragment } from "react"

const CellHints = ({ data }: { data: string[] }) => {
    const HOLE_INDEX = 4

    const getClassName = (i: number): string => {
        switch (i) {
            case 1: return ''
            case 2: return 'justify-center'
            case 3: return 'justify-end'
            case 4: return 'items-center'
            case 5: return 'items-center justify-end'
            case 6: return 'items-end'
            case 7: return 'items-end justify-center'
            case 8: return 'items-end justify-end'
            default: return ''
        }
    }

    return <>
        {
            <div className="px-[0.1rem] absolute w-full h-full grid grid-cols-3 grid-rows-3 pointer-events-none">
                {
                    data.map((hint, i) => {
                        const classNames = clsx('text-[0.5rem] text-[#999] flex', getClassName(i + 1))
                        return i === HOLE_INDEX
                            ? <Fragment key={i}>
                                <div></div>
                                <div className={classNames}>
                                    {hint}
                                </div>
                            </Fragment>
                            : <div key={i} className={classNames}>
                                {hint}
                            </div>

                    })
                }
            </div>
        }
    </>
}

export default CellHints