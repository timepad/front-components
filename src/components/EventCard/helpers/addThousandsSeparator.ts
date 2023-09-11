/**
 * Function get the value
 * @param {number} [value]
 * @returns The string and it follows the next rule:
 * value <= 9999 without separator.
 * @examples
 * 1000
 * 10 000
 * 100 000
 */

export const addThousandsSeparator = (value = 0): string => {
    const valueString = String(value);
    return valueString.length <= 4 ? valueString : valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
