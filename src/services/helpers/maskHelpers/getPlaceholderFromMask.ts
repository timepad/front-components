import {Mask} from '../../hooks';

export function getPlaceholderFromMask(mask: Mask, placeholder: string): string {
    if (placeholder.length === 1) {
        return mask
            .reduce(
                (result, maskCharacterOrPattern, index) => {
                    if (maskCharacterOrPattern instanceof RegExp) {
                        result[index] = placeholder;
                    }

                    return result;
                },
                [...mask],
            )
            .join('');
    }
    return '';
    // else {
    //     return placeholder;
    // }
}
