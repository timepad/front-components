import {Mask} from '../../hooks';

export function parseMask(mask: string | Mask) {
    if (typeof mask === 'string') {
        return convertStringMaskToRegExpMask(mask);
    } else {
        return mask; // it's already the correct format
    }
}

function convertStringMaskToRegExpMask(mask: string): Mask {
    const characters = mask.split('');

    return characters.reduce<Mask>((maskCharacters, character, currentCharacterIndex) => {
        if (/#/.test(character)) {
            maskCharacters[currentCharacterIndex] = /\d/;
        }

        return maskCharacters;
    }, characters);
}
