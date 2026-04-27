import {getFormattedPhone} from './getFormattedPhone';
import {Mask} from '../../hooks';

interface IGetNewValueParams {
    inputValue: string;
    mask: Mask;
    isPhoneMode: boolean;
    prefix: string;
}

export function getNewValue({
    inputValue,
    mask,
    isPhoneMode,
    prefix,
}: IGetNewValueParams): string {
    if (isPhoneMode) {
        return getFormattedPhone(inputValue, prefix);
    }

    return extractValueByMask(inputValue, mask);
}

function extractValueByMask(inputValue: string, mask: Mask): string {
    const patternCount = mask.filter((characterOrPattern) => characterOrPattern instanceof RegExp).length;
    const patterns = mask.filter((characterOrPattern): characterOrPattern is RegExp => characterOrPattern instanceof RegExp);
    const valueChars: string[] = [];

    for (const character of inputValue) {
        const currentPattern = patterns[valueChars.length];
        if (!currentPattern) {
            break;
        }

        if (currentPattern.test(character)) {
            valueChars.push(character);
        }
    }

    return valueChars.slice(0, patternCount).join('');
}
