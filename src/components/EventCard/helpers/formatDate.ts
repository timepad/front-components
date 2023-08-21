import moment from 'moment';

export const formatEventDate = (start: Date, end?: Date, isSession = false): string => {
    const startEventDate = isSession ? moment(start).format('ddd, D MMMM H:mm') : moment(start).format('D MMMM H:mm');
    return `${startEventDate} – ${moment(end).format('H:mm')}`;
};
