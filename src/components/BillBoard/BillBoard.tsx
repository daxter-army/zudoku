import clsx from "clsx"

import type { BillBoardProps } from "./BillBoard.props"

import {
    LED_SHADOW_LENGTH_TO_TAILWIND_TRANSLATE_CLASS_MAP,
    LED_SHADOW_LENGTH_TO_TAILWIND_ACTIVE_TRANSLATE_CLASS_MAP
} from "@/constants/common"
import { LED_SHADOW_LENGTH, LED_STATE, type ledMatixItemConfig } from "@/constants/led"

const BillBoard = ({ data }: BillBoardProps) => {
    const [shadowTranslateXClass, shadowTranslateYClass] = LED_SHADOW_LENGTH_TO_TAILWIND_TRANSLATE_CLASS_MAP[LED_SHADOW_LENGTH]
    const [shadowActiveTranslateXClass, shadowActiveTranslateYClass] = LED_SHADOW_LENGTH_TO_TAILWIND_ACTIVE_TRANSLATE_CLASS_MAP[LED_SHADOW_LENGTH]

    const ledRenderer = (config: ledMatixItemConfig) => {
        switch (config.state) {
            case LED_STATE.ON:
                return <>
                    <Led color={config.color} customClassNames={`${shadowActiveTranslateXClass} ${shadowActiveTranslateYClass}`} />
                    <LedShadow color={config.shadowColor} customClassNames={`${shadowTranslateXClass} ${shadowTranslateYClass}`} />
                </>
            case LED_STATE.LEFT_PARTIAL_ON:
                return <>
                    <Led color={config.color} customClassNames={`${shadowActiveTranslateXClass} ${shadowActiveTranslateYClass}`} />
                    <Led />
                    <LedShadow color={config.shadowColor} customClassNames={`!w-1/2 ${shadowTranslateXClass} ${shadowTranslateYClass}`} />
                </>
            case LED_STATE.RIGHT_PARTIAL_ON:
                return <>
                    <Led />
                    <Led color={config.color} customClassNames={`${shadowActiveTranslateXClass} ${shadowActiveTranslateYClass}`} />
                    <LedShadow color={config.shadowColor} customClassNames={`right-0 !w-1/2 ${shadowTranslateXClass} ${shadowTranslateYClass}`} />
                </>
            default:
                return <Led />
        }
    }

    return (
        <div style={{
            width: 'max-content',
            margin: `0 ${LED_SHADOW_LENGTH}rem ${LED_SHADOW_LENGTH}rem 0`
        }}>
            {data.map((row, rowIndex) => {
                return <div key={rowIndex} className="flex row">
                    {row.map((config, columnIndex) => {
                        return <div
                            key={`${rowIndex}${columnIndex}`}
                            className="flex relative"
                            style={{
                                width: `${config.width}rem`,
                                height: `${config.height}rem`,
                            }}
                        >
                            {ledRenderer(config)}
                        </div>
                    })}
                </div>
            })}
        </div>
    )
}

const Led = ({ color, customClassNames }: { color?: string, customClassNames?: string }) => <div
    style={{ backgroundColor: color ?? 'transparent' }}
    className={clsx(`flex-1 z-10 transition-transform`, customClassNames)}
/>

const LedShadow = ({ color, customClassNames }: { color?: string, customClassNames?: string }) => <div
    style={{ 'backgroundColor': color ?? 'red' }}
    className={clsx("absolute z-0 w-full h-full", customClassNames)}
/>


export default BillBoard
