import React from 'react';
import IconPlaceholder from '../../../assets/svg/16/icon-plus-16.svg';

import {IEventStatus} from '../types/EventCardModel';
import {component} from '../../../services/helpers/classHelpers';
import {Typography} from 'components/typography';

interface IEventCardHeader {
    status: IEventStatus;
    name: string;
    isSessions?: boolean;
}

export const EventCardHeader: React.FC<React.PropsWithChildren<IEventCardHeader>> = ({
    status,
    name,
    isSessions = false,
    children,
}) => {
    const eventStatus = isSessions ? `${status} / Серия событий` : status;
    const nameEventClassName = component('event-card-header', 'name')({passed: status === 'past'});

    return (
        <div className="cevent-card-header">
            <div className="cevent-card-header__container">
                {/*//TODO временная иконка, потом поменять*/}
                <IconPlaceholder className="cevent-card-header__icon" />
                <Typography.Multiple className="cevent-card-header__info">
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
