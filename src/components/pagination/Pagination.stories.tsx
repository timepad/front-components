import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Pagination} from './Pagination';

import 'css/bundle.less';

export default {
    title: 'Pagination',
    component: Pagination,
} as Meta;

export const Light: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Light</StoryTitle>
            <div className="lflex">
                <Pagination activePage={1} total={5} onChange={action('change-page')}>
                    <Pagination.Prev />
                    <Pagination.Item page={1} />
                    <Pagination.Item page={2} />
                    <Pagination.Item page={3} />
                    <Pagination.Item page={4} />
                    <Pagination.Item page={5} />
                    <Pagination.Next />
                </Pagination>
            </div>
        </>
    );
};

export const Dark: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Dark</StoryTitle>
            <div className="lflex">
                <Pagination activePage={5} total={999} theme="dark" onChange={action('change-page')}>
                    <Pagination.Prev />
                    <Pagination.Item page={1} />
                    <Pagination.Item page={2} />
                    <Pagination.Item page={3} />
                    <Pagination.Item page={4} />
                    <Pagination.Item page={5} />
                    <Pagination.Next />
                </Pagination>
            </div>
        </>
    );
};

export const WithHoc: IStorybookComponent = () => {
    const [page, setPage] = useState<number>(5);

    return (
        <>
            <StoryTitle>Light</StoryTitle>
            <Pagination activePage={page} total={654} coefficient={1} onChange={setPage} />
        </>
    );
};
