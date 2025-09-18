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
        // Найти следующую незаполненную позицию, начиная с текущего курсора
        return getNextCursorPosition(value, mask /*, currentCursor*/);
    }

    if (action === 'paste') {
        // Поставить курсор после последнего подряд заполненного pattern-слота начиная с текущей позиции
        let start = currentCursor;
        while (start < mask.length && !(mask[start] instanceof RegExp)) {
            start += 1;
        }
        let j = start;
        // пройти подряд заполненные слоты и поставить курсор на следующую пустую позицию
        while (j < maskedValue.length && mask[j] instanceof RegExp && !(maskedValue[j] instanceof RegExp)) {
            j += 1;
        }
        return Math.min(j, mask.length);
    }

    if (action === 'delete') {
        // After delete, place caret on the previous digit slot (to keep deleting across literals)
        let i = currentCursor;
        // If we're on a literal, step left first
        if (!(mask[i] instanceof RegExp)) {
            i -= 1;
        }
        for (; i >= 0; i -= 1) {
            if (mask[i] instanceof RegExp) return i; // caret before that digit
        }
        return 0;
    }

    if (action === 'move') {
        return currentCursor; // оставляем как есть
    }

    return currentCursor;
}
