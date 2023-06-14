import {getFormattedPhone} from './getFormattedPhone';
import {Mask} from '../../hooks';

interface IGetNewValueParams {
    inputValue: string;
    oldValue: string;
    maskedValue: string;
    mask: Mask;
    lastCursorPosition: number;
    inputMode: string;
}

export function getNewValue({
    inputValue,
    oldValue,
    maskedValue,
    mask,
    lastCursorPosition,
    inputMode,
}: IGetNewValueParams): string {
    let newValue: string;

    // 48888 48888 48888 48888
    // +7(999) 999 99 99
    // +8 960 486-00-12
    // 8 999 123
    // 9991232233

    if (inputValue.length > 1 && oldValue.length === 0) {
        if (inputMode === 'tel') {
            // autocomplete , paste ...
            newValue = getFormattedPhone(inputValue);
        } else {
            // удаляем пробелы навсякий случай, чтоб привести к нормальному формату
            newValue = inputValue.replaceAll(' ', '');
        }
    } else if (inputValue.length > maskedValue.length) {
        const maskCharacterOrPattern = mask[lastCursorPosition];
        const insertedCharacter = inputValue.charAt(lastCursorPosition);

        if (maskCharacterOrPattern instanceof RegExp && maskCharacterOrPattern.test(insertedCharacter)) {
            newValue = `${oldValue}${insertedCharacter}`;
        } else {
            newValue = oldValue; // ignore
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
            newValue = oldValue.slice(0, oldValue.length - 1); // Remove a character
        }
    }

    return newValue;
}
