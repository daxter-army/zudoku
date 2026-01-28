import { DIGITS_FROM_1_TO_9_ONLY_REGEX, DIGITS_ONLY_REGEX, NO_DUPLICATED_DIGITS_ONLY_REGEX, SUDOKU_DELIMITER } from "@/constants/common";

export const getDisplayTime = (timer: number) => {
    const hours = Math.floor(timer / 3600);
    const minutes = Math.floor((timer % 3600) / 60);
    const seconds = timer % 60;

    return hours > 0
        ? `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        : `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`;
}

export const get1DIndexFrom2DIndex = (rowIndex: number, colIndex: number): number =>
    (rowIndex * 9) + colIndex

export const getFormattedCellInput = (str: string): string => {
    const formattedValue = str.replace(DIGITS_ONLY_REGEX, "")

    return formattedValue.length === 0
        ? SUDOKU_DELIMITER
        : formattedValue.length > 1
            ? formattedValue.slice(0, 1)
            : formattedValue
}

export const getFormattedHintInput = (str: string) => {
    const digits = str.replace(DIGITS_FROM_1_TO_9_ONLY_REGEX, '');

    return digits.replace(NO_DUPLICATED_DIGITS_ONLY_REGEX, '');
}

export const noop = () => { }