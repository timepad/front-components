import {getFormattedPhone} from './getFormattedPhone';
import {Mask} from '../../hooks';

interface IGetNewValueParams {
    inputValue: string;
    oldValue: string;
    maskedValue: string;
    mask: Mask;
    isPhoneMode: boolean;
    prefix: string;
    caretMaskIndex?: number;
    action?: 'insert' | 'delete' | 'paste' | 'move';
    deleteDirection?: 'backward' | 'forward';
}

export function getNewValue({
    inputValue,
    oldValue,
    maskedValue,
    mask,
    isPhoneMode,
    prefix,
    caretMaskIndex,
    action,
    deleteDirection,
}: IGetNewValueParams): string {
    const totalPatternSlots = mask.reduce((acc, item) => (item instanceof RegExp ? acc + 1 : acc), 0);
    let rawDigits = isPhoneMode ? getFormattedPhone(inputValue, prefix) : (inputValue.match(/\d/g) || []).join('');
    const oldDigitsCount = (oldValue.match(/\d/g) || []).length;
    const newDigitsCount = rawDigits.length;
    const isComplete = oldDigitsCount >= totalPatternSlots;
    const isInserting = action === 'insert' || action === 'paste';

    if (isComplete && isInserting && newDigitsCount > oldDigitsCount) {
        rawDigits = oldValue;
    }

    if (isPhoneMode && rawDigits.length > 0) {
        const hasPrefix = rawDigits.startsWith('7') || rawDigits.startsWith('8');
        const inputHasPrefix = inputValue.includes('+7') || inputValue.includes('+8');

        if (inputHasPrefix && hasPrefix) {
            rawDigits = rawDigits.slice(1);
        }
    }

    if (action === 'delete' && typeof caretMaskIndex === 'number') {
        const oldDigits = oldValue;
        const leftDigitsCount = (maskedValue.slice(0, Math.max(0, caretMaskIndex)).match(/\d/g) || []).length;
        if (oldDigits.length > 0 && rawDigits.length === oldDigits.length) {
            if (deleteDirection === 'forward') {
                rawDigits = `${oldDigits.slice(0, leftDigitsCount)}${oldDigits.slice(leftDigitsCount + 1)}`;
            } else {
                rawDigits = `${oldDigits.slice(0, Math.max(0, leftDigitsCount - 1))}${oldDigits.slice(
                    leftDigitsCount,
                )}`;
            }
        }
    }

    if ((!action || action === 'move') && typeof caretMaskIndex === 'number') {
        const inputDigits = (inputValue.match(/\d/g) || []).join('');
        const oldDigits = oldValue;
        if (inputDigits.length === oldDigits.length && inputValue === maskedValue) {
            let prevPatternIndex = caretMaskIndex - 1;
            while (prevPatternIndex >= 0 && !(mask[prevPatternIndex] instanceof RegExp)) {
                prevPatternIndex -= 1;
            }
            if (prevPatternIndex >= 0) {
                const leftDigitsCount = (maskedValue.slice(0, prevPatternIndex + 1).match(/\d/g) || []).length;
                rawDigits = `${oldDigits.slice(0, Math.max(0, leftDigitsCount - 1))}${oldDigits.slice(
                    leftDigitsCount,
                )}`;
            }
        }
    }

    return rawDigits.slice(0, totalPatternSlots);
}
