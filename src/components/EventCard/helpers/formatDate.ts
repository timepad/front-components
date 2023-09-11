import moment from 'moment';

export const formatEventDate = (start: Date, end?: Date, isSession?: boolean): string => {
    const startEventDate = isSession ? moment(start).format('ddd, D MMMM H:mm') : moment(start).format('D MMMM H:mm');
    const endEventDate = end ? ` – ${moment(end).format('H:mm')}` : '';
    return `${startEventDate}${endEventDate}`;
};
