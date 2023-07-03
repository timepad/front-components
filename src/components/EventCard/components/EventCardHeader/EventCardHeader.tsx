import React from 'react';
import IconPlaceholder from '../../../../assets/svg/16/icon-plus-16.svg';

import {IEventStatus} from '../../types/EventCardModel';
import {component} from '../../../../services/helpers/classHelpers';
import {Typography} from 'components/typography';

interface IEventCardHeader {
    status: IEventStatus;
    name: string;
    isRepitenEvent?: boolean;
}

export const EventCardHeader: React.FC<React.PropsWithChildren<IEventCardHeader>> = ({
    status,
    name,
    isRepitenEvent = false,
    children,
}) => {
    const eventStatus = isRepitenEvent ? `${status} / Серия событий` : status;
    const nameEventClassName = component('event_card_header_title', 'name')({passed: status === 'past'});

    return (
        <div className="cevent_card_header">
            <div className="cevent_card_header__info">
                {/*//TODO временная иконка, потом поменять*/}
                <IconPlaceholder className="cevent_card_header__icon" />
                <Typography.Multiple className="cevent_card_header_title">
                    <Typography.Small noPadding className="t-color-gray-50">
                        {eventStatus}
                    </Typography.Small>
                    <Typography.Caption className={nameEventClassName} noPadding fontWeight="bold">
                        {name}
                    </Typography.Caption>
                </Typography.Multiple>
            </div>
            <>{children}</>
        </div>
    );
};
