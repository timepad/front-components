import React from 'react';

import IconCalendar from '../../../assets/svg/16/icon-calendar-16.svg';
import IconPublic from '../../../assets/svg/16/icon-view-16.svg';
import IconPrivate from '../../../assets/svg/16/icon-hide-16.svg';
import IconLink from '../../../assets/svg/16/icon-open-link-16.svg';
import IconCheckmark from '../../../assets/svg/16/icon-checkmark-16.svg';
import IconDiscount from '../../../assets/svg/16/icon-discount-16.svg';
import IconLocation from '../../../assets/svg/16/icon-pin-16.svg';
import IconOnline from '../../../assets/svg/24/icon-play-24.svg';

import {IEventAccessStatus} from '../types/EventCardModel';
import {Typography} from 'components/typography';

interface IEventCardInfoProps {
    schedual: string;
    accessStatus: IEventAccessStatus;
    location: string;
    timeBeforeEvent: string;
    isExistDiscount?: boolean;
    isTicketCheck?: boolean;
}

export const EventCardInfo: React.FC<IEventCardInfoProps> = ({
    schedual,
    accessStatus,
    location,
    timeBeforeEvent,
    isExistDiscount = false,
    isTicketCheck = false,
}) => {
    const info = [
        {
            icon: 'calendar',
            text: (
                <Typography.Multiple>
                    <Typography.Small noPadding>{schedual}</Typography.Small>
                    <Typography.Small noPadding className="t-color-gray-50">
                        {timeBeforeEvent}
                    </Typography.Small>
                </Typography.Multiple>
            ),
        },
        {icon: accessStatus, text: <Typography.Small>{accessStatus}</Typography.Small>},
        {icon: location === 'online' ? 'online' : 'city', text: <Typography.Small>{location}</Typography.Small>},
        isExistDiscount ? {icon: 'discount', text: <Typography.Small>Настроены скидки</Typography.Small>} : {},
        isTicketCheck ? {icon: 'check', text: <Typography.Small>Проверка билетов Check-in</Typography.Small>} : {},
    ].filter((el) => Object.keys(el).length);

    return (
        <div className="cevent-card-info">
            {info.map(({icon, text}, index) => (
                <div className="cevent-card-info__row" key={index}>
                    {icons[icon as keyof typeof icons]}
                    {text}
                </div>
            ))}
        </div>
    );
};

const icons = {
    ['public']: <IconPublic className="cevent-card-info__icon" />,
    ['link']: <IconLink className="cevent-card-info__icon" />,
    ['private']: <IconPrivate className="cevent-card-info__icon" />,
    ['calendar']: <IconCalendar className="cevent-card-info__icon" />,
    ['online']: <IconOnline className="cevent-card-info__icon" />,
    ['city']: <IconLocation className="cevent-card-info__icon" />,
    ['discount']: <IconDiscount className="cevent-card-info__icon" />,
    ['check']: <IconCheckmark className="cevent-card-info__icon" />,
};
