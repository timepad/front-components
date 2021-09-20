import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Pagination} from '../pagination';

import 'css/bundle.less';

export default {
    title: 'Pagination',
    component: Pagination,
} as Meta;

export const Light: IStorybookComponent = () => {
    const [page, setPage] = useState(1);

    return (
        <>
            <StoryTitle>Light</StoryTitle>
            <div className="lflex">
                <Pagination activePage={page} total={5} onChange={setPage}>
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
    const [page, setPage] = useState(1);

    return (
        <>
            <StoryTitle>Dark</StoryTitle>
            <div className="lflex">
                <Pagination activePage={page} total={5} theme="dark" onChange={setPage}>
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
            <Pagination activePage={page} total={654} onChange={setPage} />
        </>
    );
};
