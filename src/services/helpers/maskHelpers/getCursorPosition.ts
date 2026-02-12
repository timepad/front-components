import {fitInputValueIntoMask} from './fitInputValueIntoMask';
import {getNextCursorPosition} from './getNextCursorPosition';
import {Mask} from '../../hooks';

export function getCursorPosition({
    value,
    mask,
    currentCursor,
    action,
}: {
    value: string;
    mask: Mask;
    currentCursor: number;
    action: 'insert' | 'delete' | 'move' | 'paste';
}): number {
    const maskedValue = fitInputValueIntoMask(value, mask);

    if (action === 'insert') {
        return getNextCursorPosition(value, mask);
    }

    if (action === 'paste') {
        let start = currentCursor;
        while (start < mask.length && !(mask[start] instanceof RegExp)) {
            start += 1;
        }
        let j = start;
        while (j < maskedValue.length && mask[j] instanceof RegExp && !(maskedValue[j] instanceof RegExp)) {
            j += 1;
        }
        return Math.min(j, mask.length);
    }

    if (action === 'delete') {
        let i = currentCursor;
        if (!(mask[i] instanceof RegExp)) {
            i -= 1;
        }
        for (; i >= 0; i -= 1) {
            if (mask[i] instanceof RegExp) return i;
        }
        return 0;
    }

    if (action === 'move') {
        return currentCursor;
    }

    return currentCursor;
}
