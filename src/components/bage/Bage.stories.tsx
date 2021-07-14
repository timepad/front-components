import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {Bage} from './index';
import {IStorybookComponent, Spacer, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';

export default {
    title: 'Bage',
    component: Bage,
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

export const Bages: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Counters</StoryTitle>
            <div className="lflex">
                <Bage>
                    <Skeleton />
                </Bage>
                <Spacer />
                <Bage value={0}>
                    <Skeleton />
                </Bage>
                <Spacer />
                <Bage value="0000">
                    <Skeleton />
                </Bage>
            </div>
        </>
    );
};
