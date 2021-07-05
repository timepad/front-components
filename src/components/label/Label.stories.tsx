import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Label, LabelColor} from './index';
import {IStorybookComponent, Spacer, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';

export default {
    title: 'Label',
    component: Label,
} as Meta;

export const Labels: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Labels</StoryTitle>
            <div className="lflex">
                <Label>Default</Label>
                <Spacer width={8} />
                <Label background={LabelColor.red}>Red</Label>
                <Spacer width={8} />
                <Label background={LabelColor.green}>Green</Label>
                <Spacer width={8} />
                <Label background={LabelColor.yellow}>Yellow</Label>
            </div>
        </>
    );
};
export const Timers: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Timers</StoryTitle>
            <div className="lflex">
                <Label timer>00:00</Label>
                <Spacer width={8} />
                <Label background={LabelColor.red} timer>
                    00:00
                </Label>
                <Spacer width={8} />
                <Label background={LabelColor.green} timer>
                    00:00
                </Label>
                <Spacer width={8} />
                <Label background={LabelColor.yellow} timer>
                    00:00
                </Label>
            </div>
        </>
    );
};
Timers.storyName = 'Timers';
