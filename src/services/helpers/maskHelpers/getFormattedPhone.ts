// 9991112233
export const getFormattedPhone = (value: string | undefined = ''): string => {
    const phone = value?.replace(/\D+/g, '');
    let result = phone;

    if (phone.startsWith('8')) {
        result = phone.replace('8', '');
    } else if (phone.startsWith('7')) {
        result = phone.replace('7', '');
    }
    return result.replace(/[()\-\s\/]+/g, '');
};
