import React from 'react';
import IconCalendar from '../../../../assets/svg/16/icon-calendar-16.svg';
import IconArrow from '../../../../assets/svg/24/icon-arrow-right-24.svg';

import {ISchedule, ISession} from '../../types/EventCardModel';
import {addThousandsSeparator, formatRepitedEventDate} from '../../helpers';
import {component} from '../../../../services/helpers/classHelpers';
import {Button, ButtonVariant} from '../../../button';
import {Typography} from 'components/typography';

interface IEventSessionProps extends ISession {
    schedule: ISchedule;
}

export const EventSession: React.FC<IEventSessionProps> = ({
    timeBeforeEvent,
    begin,
    end,
    income = 0,
    incomeCurrency,
    orderCount,
    ticketCount,
    soldTicketCount,
    schedule,
}) => {
    const sessionClassName = component('event_card_session')({
        disabled: schedule === 'Прошедшие',
    });

    return (
        <li className={sessionClassName}>
            <div className="cevent_card_session__date">
                <IconCalendar className="cevent_card_session__icon" />
                <Typography.Multiple>
                    <Typography.Small>{formatRepitedEventDate(begin, end)}</Typography.Small>
                    <Typography.Small noPadding className="t-color-gray-50">
                        {timeBeforeEvent}
                    </Typography.Small>
                </Typography.Multiple>
            </div>
            <div>
                <div className="cevent_card_stat__row">
                    <Typography.Multiple className="cevent_card_stat__data">
                        <Typography.Small noPadding className="t-color-gray-50 cevent_card_stat__label">
                            Доход
                        </Typography.Small>
                        <Typography.Small noPadding>
                            {addThousandsSeparator(income)} {incomeCurrency}
                        </Typography.Small>
                    </Typography.Multiple>
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconArrow />}
                        className="cevent_card_stat__button"
                        labelColor="rgb(128, 128, 128)"
                    />
                </div>
                <div className="cevent_card_stat__row">
                    <Typography.Multiple className="cevent_card_stat__data">
                        <Typography.Small noPadding className="t-color-gray-50 cevent_card_stat__label">
                            Заказы
                        </Typography.Small>
                        <Typography.Small noPadding>{orderCount}</Typography.Small>
                    </Typography.Multiple>
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconArrow />}
                        className="cevent_card_stat__button"
                        labelColor="rgb(128, 128, 128)"
                    />
                </div>
                <div className="cevent_card_stat__row">
                    <Typography.Multiple className="cevent_card_stat__data">
                        <Typography.Small noPadding className="t-color-gray-50 cevent_card_stat__label">
                            Билеты
                        </Typography.Small>
                        <Typography.Small noPadding>
                            {soldTicketCount} из {ticketCount}
                        </Typography.Small>
                    </Typography.Multiple>
                    <Button
                        variant={ButtonVariant.transparent}
                        icon={<IconArrow />}
                        className="cevent_card_stat__button"
                        labelColor="rgb(128, 128, 128)"
                    />
                </div>
            </div>
        </li>
    );
};
