import React from 'react';
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
            <StoryTitle>Primary</StoryTitle>
            <div className="lflex">
                <Pagination activePage={1} total={999} onChange={onChange}>
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
            <StoryTitle>Primary</StoryTitle>
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

export const WithHook: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Primary</StoryTitle>
            <div className="lflex">
                <Pagination activePage={16} total={999}>
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
