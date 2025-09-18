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

    // Универсальная стратегия: брать фактические цифры из inputValue (визуального значения инпута)
    // и приводить к «сырым» цифрам значения, учитывая телефонный префикс
    let rawDigits = isPhoneMode
        ? getFormattedPhone(inputValue, prefix)
        : (inputValue.match(/\d/g) || []).join('');

    // Backspace/Delete на литералах: удаляем ближайшую цифру слева от каретки
    if (action === 'delete' && typeof caretMaskIndex === 'number') {
        const oldDigits = oldValue;
        const leftDigitsCount = (maskedValue.slice(0, Math.max(0, caretMaskIndex)).match(/\d/g) || []).length;
        if (oldDigits.length > 0 && rawDigits.length === oldDigits.length) {
            // браузер не удалил цифру из сырых данных (упёрся в литерал) — удалим вручную
            if (deleteDirection === 'forward') {
                rawDigits = `${oldDigits.slice(0, leftDigitsCount)}${oldDigits.slice(leftDigitsCount + 1)}`;
            } else {
                rawDigits = `${oldDigits.slice(0, Math.max(0, leftDigitsCount - 1))}${oldDigits.slice(leftDigitsCount)}`;
            }
        }
    }

    // Fallback: если тип действия не распознан (мобилки), но видимое значение не изменилось,
    // а каретка стоит возле литерала — тоже удаляем цифру слева от ближайшего pattern
    if ((!action || action === 'move') && typeof caretMaskIndex === 'number') {
        const inputDigits = (inputValue.match(/\d/g) || []).join('');
        const oldDigits = oldValue;
        if (inputDigits.length === oldDigits.length && inputValue === maskedValue) {
            // попытка удаления, но строка не изменилась
            let prevPatternIndex = caretMaskIndex - 1;
            while (prevPatternIndex >= 0 && !(mask[prevPatternIndex] instanceof RegExp)) {
                prevPatternIndex -= 1;
            }
            if (prevPatternIndex >= 0) {
                const leftDigitsCount = (maskedValue.slice(0, prevPatternIndex + 1).match(/\d/g) || []).length;
                rawDigits = `${oldDigits.slice(0, Math.max(0, leftDigitsCount - 1))}${oldDigits.slice(leftDigitsCount)}`;
            }
        }
    }

    return rawDigits.slice(0, totalPatternSlots);
}
