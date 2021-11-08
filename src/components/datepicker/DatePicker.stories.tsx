import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';

import {DatePicker} from './index';
import {Dropdown} from '../dropdown';
import {Button} from '../button';

import 'css/bundle.less';

export default {
    title: 'DatePicker',
    component: DatePicker,
} as Meta;

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>DatePicker</StoryTitle>
            <Dropdown trigger={() => <Button>Date</Button>}>
                <DatePicker />
            </Dropdown>
        </>
    );
};
