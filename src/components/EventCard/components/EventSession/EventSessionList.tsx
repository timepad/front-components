import React from 'react';

import {EventSession} from './EventSession';
import {ISchedule, ISession} from '../../types/EventCardModel';

interface IEventSessionListProps {
    sessions: Array<ISession & {sessionsInMonth?: string}>;
    schedule: ISchedule;
}

export const EventSessionList: React.FC<IEventSessionListProps> = ({sessions, schedule}) => {
    return (
        <div className="cevent_sessions_list">
            {sessions.map((session, index) => (
                <EventSession key={index} schedule={schedule} {...session} />
            ))}
        </div>
    );
};
