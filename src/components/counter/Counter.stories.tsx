import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Counter} from './index';
import {IStorybookComponent, Spacer, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';

export default {
    title: 'Counter',
    component: Counter,
} as Meta;

const Skeleton = () => (
    <div
        style={{
            width: 32,
            height: 32,
            background: '#F1F0F5',
            borderRadius: 8,
        }}
    />
);

export const Counters: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Labels</StoryTitle>
            <div className="lflex">
                <Counter>
                    <Skeleton />
                </Counter>
                <Spacer />
                <Counter value={0}>
                    <Skeleton />
                </Counter>
                <Spacer />
                <Counter value="0000">
                    <Skeleton />
                </Counter>
            </div>
        </>
    );
};
