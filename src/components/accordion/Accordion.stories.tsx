import React from 'react';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Meta} from '@storybook/react/types-6-0';
import {Accordion} from './index';

export default {
    title: 'Accordion',
    component: Accordion,
} as Meta;

export const Default: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Default Accordion</StoryTitle>
            <Accordion text="123" status="Включена">
                <p>123</p>
            </Accordion>
        </>
    );
};
