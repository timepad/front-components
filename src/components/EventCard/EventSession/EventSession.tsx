import React from 'react';
import IconCalendar from '../../../assets/svg/16/icon-calendar-16.svg';
import IconArrow from '../../../assets/svg/24/icon-arrow-right-24.svg';

import {ISchedule, ISession} from '../types/EventCardModel';
import {addThousandsSeparator, formatEventDate} from '../helpers';
import {component} from '../../../services/helpers/classHelpers';
import {Button, ButtonVariant} from '../../button';
import {Typography} from 'components/typography';

interface IEventSessionProps extends ISession {
    schedule: ISchedule;
    sessionsInMonth?: string;
}
const buttonColor = 'rgba(128, 128, 128, 0.35)';
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
    sessionsInMonth,
}) => {
    const sessionClassName = component('event-session')({
        disabled: schedule === 'Прошедшие',
    });

    const rowClassName = component('event-card-stat', 'row')();
    const dataBlockClassName = component('event-card-stat', 'data')();
    const btnClassName = component('event-card-stat', 'button')();
    const labelClassName = component('event-card-stat', 'label')();

    return (
        <div className={sessionClassName}>
            {sessionsInMonth && <Typography.Small size={8}>{sessionsInMonth}</Typography.Small>}
            <div className={component('event-session', 'info')()}>
                <div className={component('event-session', 'schedule')()}>
                    <IconCalendar className={component('event-session', 'icon')()} />
                    <Typography.Multiple>
                        <Typography.Small>{formatEventDate(begin, end, true)}</Typography.Small>
                        <Typography.Small noPadding className={`t-color-gray-50 ${labelClassName}`}>
                            {timeBeforeEvent}
                        </Typography.Small>
                    </Typography.Multiple>
                </div>
                <div>
                    <div className={rowClassName}>
                        <Typography.Multiple className={dataBlockClassName}>
                            <Typography.Small noPadding className={`t-color-gray-50 ${labelClassName}`}>
                                Доход
                            </Typography.Small>
                            <Typography.Small noPadding>
                                {addThousandsSeparator(income)} {incomeCurrency}
                            </Typography.Small>
                        </Typography.Multiple>
                        <Button
                            variant={ButtonVariant.transparent}
                            icon={<IconArrow />}
                            className={btnClassName}
                            labelColor={buttonColor}
                        />
                    </div>
                    <div className={rowClassName}>
                        <Typography.Multiple className={dataBlockClassName}>
                            <Typography.Small noPadding className={`t-color-gray-50 ${labelClassName}`}>
                                Заказы
                            </Typography.Small>
                            <Typography.Small noPadding>{orderCount}</Typography.Small>
                        </Typography.Multiple>
                        <Button
                            variant={ButtonVariant.transparent}
                            icon={<IconArrow />}
                            className={btnClassName}
                            labelColor={buttonColor}
                        />
                    </div>
                    <div className={rowClassName}>
                        <Typography.Multiple className={dataBlockClassName}>
                            <Typography.Small noPadding className="t-color-gray-50 cevent-card-stat__label">
                                Билеты
                            </Typography.Small>
                            <Typography.Small noPadding>
                                {soldTicketCount} из {ticketCount}
                            </Typography.Small>
                        </Typography.Multiple>
                        <Button
                            variant={ButtonVariant.transparent}
                            icon={<IconArrow />}
                            className={btnClassName}
                            labelColor={buttonColor}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
