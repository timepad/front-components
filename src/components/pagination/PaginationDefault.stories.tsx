import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {PaginationDefault} from './PaginationDefault';

import 'css/bundle.less';

export default {
    title: 'PaginationDefault',
    component: PaginationDefault,
} as Meta;

const onChange = (v: number) => {
    window.console.log(v);
};

export const Light: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Light</StoryTitle>
            <div className="lflex">
                <PaginationDefault activePage={15} total={999} onChange={onChange}>
                    <PaginationDefault.Prev />
                    <PaginationDefault.Container>
                        <PaginationDefault.Item page={1} />
                        <PaginationDefault.Ellipsis />
                        <PaginationDefault.Item page={15} />
                        <PaginationDefault.Item page={16} />
                        <PaginationDefault.Item page={17} />
                        <PaginationDefault.Ellipsis />
                        <PaginationDefault.Item page={999} />
                    </PaginationDefault.Container>
                    <PaginationDefault.Next />
                </PaginationDefault>
            </div>
        </>
    );
};

export const Dark: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Dark</StoryTitle>
            <div className="lflex">
                <PaginationDefault activePage={16} total={999} theme="dark">
                    <PaginationDefault.Prev />
                    <PaginationDefault.Container>
                        <PaginationDefault.Item page={1} />
                        <PaginationDefault.Ellipsis />
                        <PaginationDefault.Item page={15} />
                        <PaginationDefault.Item page={16} />
                        <PaginationDefault.Item page={17} />
                        <PaginationDefault.Ellipsis />
                        <PaginationDefault.Item page={999} />
                    </PaginationDefault.Container>
                    <PaginationDefault.Next />
                </PaginationDefault>
            </div>
        </>
    );
};
