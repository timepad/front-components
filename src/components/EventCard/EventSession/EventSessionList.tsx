import React from 'react';

import {EventSession} from './EventSession';
import {ISchedule, ISession} from '../types/EventCardModel';

import {Carousel} from '../../carousel';
import {Slide} from '../../carousel';

interface IEventSessionListProps {
    sessions: Array<ISession & {sessionsInMonth?: string}>;
    schedule: ISchedule;
}

export const EventSessionList: React.FC<IEventSessionListProps> = ({sessions, schedule}) => {
    return (
        <Carousel className="cevent-sessions-list">
            {sessions.map((session, index) => (
                <Slide key={index}>
                    <EventSession schedule={schedule} {...session} />
                </Slide>
            ))}
        </Carousel>
    );
};
