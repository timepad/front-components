import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

import {DatePicker} from './index';
import {Dropdown} from '../dropdown';
import {Button} from '../button';

import 'css/bundle.less';
import moment from 'moment';

export default {
    title: 'DatePicker',
    component: DatePicker,
} as Meta;

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>DatePicker simple</StoryTitle>
            <Dropdown trigger={() => <Button>Date</Button>}>
                <DatePicker initialToday={moment('20300214')} />
            </Dropdown>
        </>
    );
};

Simple.storyName = 'DatePicker simple';

export const WithAllButtons: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>DatePicker with all buttons</StoryTitle>
            <Dropdown trigger={() => <Button>Date</Button>}>
                <DatePicker dateRange withShortcats initialToday={moment('20300214')} />
            </Dropdown>
        </>
    );
};

WithAllButtons.storyName = 'DatePicker with all buttons';

export const WithTwoButtons: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>DatePicker with two buttons</StoryTitle>
            <Dropdown trigger={() => <Button>Date</Button>}>
                <DatePicker withShortcats initialToday={moment('20300214')} />
            </Dropdown>
        </>
    );
};

WithTwoButtons.storyName = 'DatePicker with two buttons';

export const WithRange: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>DatePicker with date range</StoryTitle>
            <Dropdown trigger={() => <Button>Date</Button>}>
                <DatePicker
                    withShortcats
                    dateRange
                    initialStart={moment('20330214')}
                    initialEnd={moment('20330308')}
                    initialToday={moment('20330223')}
                />
            </Dropdown>
        </>
    );
};

WithRange.storyName = 'DatePicker with date range';
