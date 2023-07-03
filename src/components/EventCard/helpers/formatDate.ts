import moment from 'moment';

export const formatRepitedEventDate = (start: Date, end?: Date) => {
    return `${moment(start).format('ddd, D MMMM H:mm')} – ${moment(end).format('H:mm')}`;
};

export const formatEventDate = (start: Date, end?: Date) => {
    return `${moment(start).format('D MMMM H:mm')} – ${moment(end).format('H:mm')}`;
};
