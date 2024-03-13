import React, {useRef, useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import 'css/bundle.less';

import {SearchInput} from './SearchInput';
import {IStorybookComponent, Spacer, StoryTitle} from '../../services/helpers/storyBookHelpers';

export default {
    title: 'SearchInput',
    component: SearchInput,
} as Meta;

export const DefaltSearchInput: IStorybookComponent = () => {
    const [value, setValue] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleResetInputClick = () => {
        setValue('');
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value);
    };

    return (
        <>
            <StoryTitle>SearchInput</StoryTitle>
            <Spacer width={8} />
            <div style={{width: '300px'}}>
                <SearchInput
                    value={value}
                    onChange={handleInputChange}
                    onReset={handleResetInputClick}
                    inputRef={inputRef}
                    isWide={true}
                    placeholder={'Поиск'}
                />
            </div>
        </>
    );
};
