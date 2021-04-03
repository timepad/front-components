import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {PaginationDefault} from './PaginationDefault';
import {Pagination} from './Pagination';

import 'css/bundle.less';

export default {
    title: 'PaginationDefault',
    component: PaginationDefault,
} as Meta;

export const WithHoc: IStorybookComponent = () => {
    const [page, setPage] = useState<number>(5);

    return (
        <>
            <StoryTitle>Light</StoryTitle>
            <Pagination activePage={page} total={654} coefficient={1} onChange={setPage} />
        </>
    );
};
