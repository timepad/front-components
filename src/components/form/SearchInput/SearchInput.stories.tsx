import React, {useRef, useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import 'css/bundle.less';

import {SearchInput} from './SearchInput';
import {IStorybookComponent, Spacer, StoryTitle} from '../../../services/helpers/storyBookHelpers';

export default {
    title: 'SearchInput',
    component: SearchInput,
} as Meta;

export const DefaltSearchInput: IStorybookComponent = () => {
    const [value, setValue] = useState('');
    const ref = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <StoryTitle>SearchInput</StoryTitle>
            <Spacer width={8} />
            <SearchInput value={value} onChange={setValue} onReset={() => setValue('')} inputRef={ref} />
        </>
    );
};
