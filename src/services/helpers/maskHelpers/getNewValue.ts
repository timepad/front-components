import {getFormattedPhone} from './getFormattedPhone';
import {Mask} from '../../hooks';

interface IGetNewValueParams {
    inputValue: string;
    oldValue: string;
    maskedValue: string;
    mask: Mask;
    lastCursorPosition: number;
    isPhoneMode: boolean;
    prefix: string;
}

export function getNewValue({
    inputValue,
    oldValue,
    maskedValue,
    mask,
    lastCursorPosition,
    isPhoneMode,
    prefix,
}: IGetNewValueParams): string {
    let newValue: string;

    // 48888 48888 48888 48888
    // +7(999) 999 99 99
    // +8 960 486-00-12
    // 8 999 123
    // 9991232233

    if (isPhoneMode) {
        newValue = getFormattedPhone(inputValue, prefix);
    } else if (inputValue.length > 1 && oldValue.length === 0) {
        newValue = inputValue.replaceAll(' ', '');
    } else if (inputValue.length > maskedValue.length) {
        const diffIndex = findFirstDifferenceIndex(maskedValue, inputValue);
        const patternIndex = getNextPatternIndex(mask, diffIndex);

        if (patternIndex === -1) {
            newValue = oldValue;
        } else {
            const maskCharacterOrPattern = mask[patternIndex];
            const insertedCharacter = inputValue.charAt(patternIndex);

            if (maskCharacterOrPattern instanceof RegExp && maskCharacterOrPattern.test(insertedCharacter)) {
                const insertPosition = countPatternsUpTo(mask, patternIndex);
                newValue = `${oldValue.slice(0, insertPosition)}${insertedCharacter}${oldValue.slice(insertPosition)}`;
            } else {
                newValue = oldValue; // ignore
            }
        }
    } else {
        if (oldValue.length === 0) {
            const maskCharacterOrPattern = mask[lastCursorPosition];
            const insertedCharacter = inputValue.charAt(0);

            if (maskCharacterOrPattern instanceof RegExp && maskCharacterOrPattern.test(insertedCharacter)) {
                newValue = insertedCharacter;
            } else {
                newValue = oldValue; // ignore
            }
        } else {
            const diffIndex = findFirstDifferenceIndex(maskedValue, inputValue);
            const patternIndex = getNextPatternIndex(mask, diffIndex);

            if (patternIndex === -1) {
                newValue = oldValue;
            } else {
                const removePosition = countPatternsUpTo(mask, patternIndex) - 1;

                if (removePosition < 0 || removePosition >= oldValue.length) {
                    newValue = oldValue;
                } else {
                    newValue = `${oldValue.slice(0, removePosition)}${oldValue.slice(removePosition + 1)}`;
                }
            }
        }
    }

    return newValue;
}

function findFirstDifferenceIndex(oldMasked: string, newMasked: string): number {
    const maxLength = Math.max(oldMasked.length, newMasked.length);

    for (let index = 0; index < maxLength; index++) {
        if (oldMasked.charAt(index) !== newMasked.charAt(index)) {
            return index;
        }
    }

    return -1;
}

function getNextPatternIndex(mask: Mask, fromIndex: number): number {
    if (fromIndex < 0) {
        return -1;
    }

    for (let index = fromIndex; index < mask.length; index++) {
        if (mask[index] instanceof RegExp) {
            return index;
        }
    }

    return -1;
}

function countPatternsUpTo(mask: Mask, patternIndex: number): number {
    return mask.slice(0, patternIndex + 1).filter((characterOrPattern) => characterOrPattern instanceof RegExp).length;
}
