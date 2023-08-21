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

    return (
        <div className="cevent-card-header">
            <div className={component('event-card-header', 'container')()}>
                {/*//TODO временная иконка, потом поменять*/}
                <IconPlaceholder className={component('event-card-header', 'icon')()} />
                <Typography.Multiple className={component('event-card-header', 'info')()}>
                    <Typography.Small noPadding className="t-color-gray-50">
                        {eventStatus}
                    </Typography.Small>
                    <Typography.Caption
                        className={component('event-card-header', 'name')({passed: status === 'past'})}
                        noPadding
                        fontWeight="bold"
                    >
                        {name}
                    </Typography.Caption>
                </Typography.Multiple>
            </div>
            <>{children}</>
        </div>
    );
};
