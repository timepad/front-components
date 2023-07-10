import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {EventCard} from './EventCard';
import events from './cabinet_event.json';
import {Brick} from '../brick';
import BrickStories from '../brick/Brick.stories';

export default {
    title: 'EventCard',
    component: EventCard,
} as Meta;
const event = events.events[0];
const repitedEvent = events.events[1];
export const EventCardStory: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>EventCard Story</StoryTitle>
            {/*<EventCard {...(event as any)} />*/}
            {/*<Brick size={2} />*/}
            <EventCard {...(repitedEvent as any)} />
        </>
    );
};
