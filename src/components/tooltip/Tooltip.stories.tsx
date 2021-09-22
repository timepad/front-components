import React, {useEffect, useState} from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Tooltip} from './index';
import {IStorybookComponent, Spacer, StoryTitle} from '../../services/helpers/storyBookHelpers';

import 'css/bundle.less';

export default {
    title: 'Tooltip',
    component: Tooltip,
    parameters: {
        chromatic: {delay: 300},
    },
} as Meta;

const Skeleton = () => (
    <div
        style={{
            width: 32,
            height: 32,
            background: '#F1F0F5',
            borderRadius: '50%',
        }}
    />
);
export const Hover: IStorybookComponent = () => {
    const [open, setOpen] = useState<undefined | boolean>(undefined);
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 1000);
        setTimeout(() => {
            setOpen(undefined);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <StoryTitle>Tooltip hover</StoryTitle>
            <div className="lflex">
                <Spacer />
                <Tooltip
                    content="Объемный текст в котором подробно рассказано о происходящем на экране"
                    placement="right"
                    isOpen={open}
                >
                    <Skeleton />
                </Tooltip>
                <Spacer />
                <Tooltip content={<Skeleton />} placement="top">
                    <Skeleton />
                </Tooltip>
                <Spacer />
                <Tooltip content="Короткая подсказка" placement="bottom">
                    <Skeleton />
                </Tooltip>
                <Spacer />
                <Tooltip content="Короткая подсказка" placement="left">
                    <Skeleton />
                </Tooltip>
            </div>
        </>
    );
};

export const Click: IStorybookComponent = () => {
    const [open, setOpen] = useState<undefined | boolean>(undefined);
    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(true);
        }, 1000);
        setTimeout(() => {
            setOpen(undefined);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <StoryTitle>Tooltip click</StoryTitle>
            <div className="lflex">
                <Spacer />
                <Tooltip
                    trigger="click"
                    content="Объемный текст в котором подробно рассказано о происходящем на экране"
                    placement="right"
                    isOpen={open}
                >
                    <Skeleton />
                </Tooltip>
                <Spacer />
                <Tooltip trigger="click" content="Короткая подсказка" placement="top">
                    <Skeleton />
                </Tooltip>
                <Spacer />
                <Tooltip trigger="click" content="Короткая подсказка" placement="bottom">
                    <Skeleton />
                </Tooltip>
                <Spacer />
                <Tooltip trigger="click" content="Короткая подсказка" placement="left">
                    <Skeleton />
                </Tooltip>
            </div>
        </>
    );
};
