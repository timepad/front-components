import {Mask} from '../../hooks';

export function fitInputValueIntoMask(value: string, mask: Mask): Mask {
    const valueCharacters = value.split('');

    return valueCharacters.reduce(
        (outputMask: Mask, currentCharacter) => {
            const firstMaskPattern: RegExp | null = findFirstPattern(outputMask);
            outputMask[outputMask.indexOf(firstMaskPattern as RegExp)] = currentCharacter;

            return outputMask;
        },
        [...mask],
    );
}

function findFirstPattern(mask: Mask): RegExp | null {
    // TypeScript isn't smart enough to realize that this MUST be a RegExp or null, and can never be string.
    return mask.find((characterOrPattern) => characterOrPattern instanceof RegExp) as RegExp | null;
}
