import React from 'react';

import {EventSession} from './EventSession';
import {ISchedule, ISession} from '../../types/EventCardModel';
import {component} from '../../../../services/helpers/classHelpers';
import {Typography} from 'components/typography';
import {pluralize} from '../../helpers';

interface IEventSessionListProps {
    sessions: {[key: string]: ISession[]};
    schedule: ISchedule;
}

export const EventSessionList: React.FC<IEventSessionListProps> = ({sessions, schedule}) => {
    const scheduleClassName = component('event_card_sessions_container', 'schedule')({past: schedule === 'Прошедшие'});

    return (
        <ul className="cevent_card_sessions_container">
            {Object.keys(sessions).map((key, index) => {
                const sessionInMounth = sessions[key]?.length;
                const pluralizeSession = pluralize(sessionInMounth, ['сеанс', 'сеанса', 'сеансов']);
                const pluralizeSchedule =
                    schedule === 'Прошедшие'
                        ? pluralize(sessionInMounth, ['прошедшиий', 'прошедших', 'прошедших'])
                        : '';
                return (
                    <div key={index}>
                        <Typography.Small size={8} className={scheduleClassName}>
                            {key}, {sessionInMounth} {pluralizeSchedule} {pluralizeSession}
                        </Typography.Small>
                        <div className="cevent_card_sessions_container__list">
                            {sessions[key].map(
                                (
                                    {
                                        begin,
                                        end,
                                        incomeCurrency,
                                        timeBeforeEvent,
                                        income,
                                        orderCount,
                                        ticketCount,
                                        soldTicketCount,
                                        isFree,
                                    },
                                    index,
                                ) => {
                                    return (
                                        <EventSession
                                            key={index}
                                            begin={begin}
                                            end={end}
                                            timeBeforeEvent={timeBeforeEvent}
                                            income={income}
                                            incomeCurrency={incomeCurrency}
                                            orderCount={orderCount}
                                            ticketCount={ticketCount}
                                            soldTicketCount={soldTicketCount}
                                            isFree={isFree}
                                            schedule={schedule}
                                        />
                                    );
                                },
                            )}
                        </div>
                    </div>
                );
            })}
        </ul>
    );
};
