import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import 'css/bundle.less';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Tooltip} from './Tooltip';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Tooltip',
    component: Tooltip,
} as Meta;

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Simple Tooltip Example</StoryTitle>
            <Tooltip active={false} style={{maxWidth: '300px'}}>
                <Tooltip.Title>Title text</Tooltip.Title>
                <Tooltip.Message>Tooltip some message</Tooltip.Message>
            </Tooltip>
        </>
    );
};
