import '../../assets/css/bundle.less';
import * as React from 'react';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Suggest, ISuggestion} from './Suggest';
import {Brick} from '../brick';
import {FC, useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Suggest',
    component: Suggest,
} as Meta;

export const BasicFromArray: IStorybookComponent = () => {
    const temp: ISuggestion[] = [
        {
            title: 'Suggest row 1',
            text: 'Caption text 1',
        },
        {
            title: 'Suggest row 2',
            text: 'Caption text 2',
        },
        {
            title: 'Suggest row 3',
            text: 'Caption text 3',
        },
        {
            title: 'Suggest row 4',
            text: 'Caption text 4',
        },
        {
            title: 'Suggest row 5',
            text: 'Caption text 5',
        },
    ];

    const [value, setValue] = useState('');

    return (
        <>
            <StoryTitle>Basic input with suggestions from transferred data array (type su).</StoryTitle>
            <Suggest label="Input label" value={value} setInputValue={setValue} data={temp} />
        </>
    );
};
BasicFromArray.storyName = 'Basic from array';

export const BasicFromURL: IStorybookComponent = () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/';
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');

    return (
        <>
            <StoryTitle>Basic input with suggestions received by api from URL</StoryTitle>
            <Suggest label="Input label" value={value} setInputValue={setValue} url={url} />
            <Brick size={2} />
            <StoryTitle>Basic input with suggestions received from URL each time when focused.</StoryTitle>
            <Suggest label="Input label" value={value2} setInputValue={setValue2} url={url} reloadOnFocus />
        </>
    );
};
BasicFromURL.storyName = 'Basic from URL';
