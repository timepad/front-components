// 9991112233
export const getFormattedPhone = (phone: string | undefined = ''): string => {
    let result = phone;

    if (phone.startsWith('8')) {
        result = phone.replace('8', '');
    } else if (phone.startsWith('+7') || phone.startsWith('+ 7')) {
        result = phone.replace('+7', '');
    } else if (/[a-zA-Z]+/g.test(phone)) {
        return '';
    }
    return result.replace(/[()\-\s\/]+/g, '');
};
