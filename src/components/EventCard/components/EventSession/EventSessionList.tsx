import React from 'react';

import {EventSession} from './EventSession';
import {ISchedule, ISession} from '../../types/EventCardModel';
import {SliderBtn} from '../SliderBtn/SliderBtn';

import {Carousel} from '../../../carousel';
import {Slide} from '../../../carousel';

interface IEventSessionListProps {
    sessions: Array<ISession & {sessionsInMonth?: string}>;
    schedule: ISchedule;
}

export const EventSessionList: React.FC<IEventSessionListProps> = ({sessions, schedule}) => {
    return (
        <Carousel
            className="cevent_sessions_list"
            nextBtn={<SliderBtn className="cslider_btn cslider_btn__next" />}
            prevBtn={<SliderBtn className="cslider_btn cslider_btn__prev" />}
        >
            {sessions.map((session, index) => (
                <Slide key={index}>
                    <EventSession schedule={schedule} {...session} />
                </Slide>
            ))}
        </Carousel>
    );
};
