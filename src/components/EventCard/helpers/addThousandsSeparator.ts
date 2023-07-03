export const addThousandsSeparator = (value = 0): string => {
    const valueString = String(value);
    return valueString.length <= 4 ? valueString : valueString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};
