// 9991112233
export const getFormattedPhone = (value: string | undefined = '', prefix: string): string => {
    //удаляем все символы в строке и prefix (либо 7)
    const formattedPrefix = deleteSymbols(prefix);
    const phoneWithoutSymbols = deleteSymbols(value);
    const phoneWithoutPrefix = deletePrefix(phoneWithoutSymbols, formattedPrefix);

    if (phoneWithoutPrefix.startsWith('8') && phoneWithoutPrefix.length > 10) {
        return phoneWithoutPrefix.replace('8', '');
    } else if (phoneWithoutPrefix.startsWith('7') && phoneWithoutPrefix.length > 10) {
        return phoneWithoutPrefix.replace('7', '');
    }
    return phoneWithoutPrefix;
};

const deleteSymbols = (value: string) => {
    return value?.replace(/\D+/g, '');
};

const deletePrefix = (value: string, prefix: string) => {
    return value.replace(new RegExp(`^${prefix || '7'}`), '');
};
