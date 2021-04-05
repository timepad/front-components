import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Pagination} from './Pagination';

import 'css/bundle.less';

export default {
    title: 'Pagination',
    component: Pagination,
} as Meta;

const onChange = (v: number) => {
    window.console.log(v);
};

export const Light: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Light</StoryTitle>
            <div className="lflex">
                <Pagination activePage={15} total={999} onChange={onChange}>
                    <Pagination.Prev />
                    <Pagination.Container>
                        <Pagination.Item page={1} />
                        <Pagination.Ellipsis />
                        <Pagination.Item page={15} />
                        <Pagination.Item page={16} />
                        <Pagination.Item page={17} />
                        <Pagination.Ellipsis />
                        <Pagination.Item page={999} />
                    </Pagination.Container>
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
                <Pagination activePage={16} total={999} theme="dark">
                    <Pagination.Prev />
                    <Pagination.Container>
                        <Pagination.Item page={1} />
                        <Pagination.Ellipsis />
                        <Pagination.Item page={15} />
                        <Pagination.Item page={16} />
                        <Pagination.Item page={17} />
                        <Pagination.Ellipsis />
                        <Pagination.Item page={999} />
                    </Pagination.Container>
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
