import React from 'react';

import IconCalendar from '../../../../assets/svg/16/icon-calendar-16.svg';
import IconPublic from '../../../../assets/svg/16/icon-view-16.svg';
import IconPrivate from '../../../../assets/svg/16/icon-hide-16.svg';
import IconLink from '../../../../assets/svg/16/icon-open-link-16.svg';
import IconCheckmark from '../../../../assets/svg/16/icon-checkmark-16.svg';
import IconDiscount from '../../../../assets/svg/16/icon-discount-16.svg';
import IconLocation from '../../../../assets/svg/16/icon-pin-16.svg';
import IconOnline from '../../../../assets/svg/24/icon-play-24.svg';

import {IEventAccessStatus} from '../../types/EventCardModel';
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
    return (
        <div className="cevent_card_info">
            <div className="cevent_card_info__row">
                <IconCalendar />
                <Typography.Multiple>
                    <Typography.Small noPadding>{schedual}</Typography.Small>
                    <Typography.Small noPadding className="t-color-gray-50">
                        {timeBeforeEvent}
                    </Typography.Small>
                </Typography.Multiple>
            </div>
            <div className="cevent_card_info__row">
                {accessIcon[accessStatus]}
                <Typography.Small>{accessStatus}</Typography.Small>
            </div>
            <div className="cevent_card_info__row">
                {location === 'online' ? <IconOnline /> : <IconLocation />}
                <Typography.Small>{location}</Typography.Small>
            </div>
            {isExistDiscount && (
                <div className="cevent_card_info__row">
                    <IconDiscount />
                    <Typography.Small>Настроены скидки</Typography.Small>
                </div>
            )}
            {isTicketCheck && (
                <div className="cevent_card_info__row">
                    <IconCheckmark />
                    <Typography.Small>Проверка билетов Check-in</Typography.Small>
                </div>
            )}
        </div>
    );
};

const accessIcon = {
    public: <IconPublic />,
    link: <IconLink />,
    private: <IconPrivate />,
};
