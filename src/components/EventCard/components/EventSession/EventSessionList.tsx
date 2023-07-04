import React from 'react';

import {EventSession} from './EventSession';
import {ISchedule, ISession} from '../../types/EventCardModel';
import {pluralize} from '../../helpers';

interface IEventSessionListProps {
    sessions: {[key: string]: ISession[]};
    schedule: ISchedule;
}

const sessionVariants = ['сеанс', 'сеанса', 'сеансов'];
const scheduleVariants = ['прошедшиий', 'прошедших', 'прошедших'];

export const EventSessionList: React.FC<IEventSessionListProps> = ({sessions, schedule}) => {
    return (
        <div className="cevent_sessions_list">
            {Object.keys(sessions).map((mounth, index) => {
                const sessionInMounth = sessions[mounth]?.length;
                const pluralizeSession = pluralize(sessionInMounth, sessionVariants);
                const pluralizeSchedule = schedule === 'Прошедшие' ? pluralize(sessionInMounth, scheduleVariants) : '';
                const sessionHeader = `${mounth}, ${sessionInMounth} ${pluralizeSchedule} ${pluralizeSession}`;
                return (
                    <div key={index} className="lflex">
                        {sessions[mounth].map((session, index) => {
                            const header = index === 0 ? sessionHeader : '';
                            return <EventSession header={header} key={index} schedule={schedule} {...session} />;
                        })}
                    </div>
                );
            })}
        </div>
    );
};
