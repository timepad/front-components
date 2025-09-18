import {fitInputValueIntoMask} from './fitInputValueIntoMask';
import {Mask} from '../../hooks';

// export function getNextCursorPosition(value: string, mask: Mask, startFrom: number = 0): number {
//     const maskedValue = fitInputValueIntoMask(value, mask);
//     // Find the next unfilled pattern slot starting from the provided index
//     for (let i = Math.max(0, startFrom); i < maskedValue.length; i += 1) {
//         if (maskedValue[i] instanceof RegExp) {
//             return i;
//         }
//     }
//     // No empty slots ahead – return the last valid position (end)
//     return maskedValue.length;
// }
export function getNextCursorPosition(value: string, mask: Mask): number {
    const maskedValue = fitInputValueIntoMask(value, mask);
    // The first pattern is one that can't be replaced so we'll position our cursor there.
    const nextPlaceholder = maskedValue.findIndex((characterOrPattern) => characterOrPattern instanceof RegExp);

    return nextPlaceholder > -1 ? nextPlaceholder : maskedValue.length;
}
