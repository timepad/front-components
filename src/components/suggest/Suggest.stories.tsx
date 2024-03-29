import '../../assets/css/bundle.less';
import React, {useEffect} from 'react';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Suggest, ISuggestion} from './Suggest';
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
            <Suggest placeholder="Input label" value={value} setInputValue={setValue} data={temp} />
        </>
    );
};
BasicFromArray.storyName = 'Basic from array';

export const BasicFromURL: IStorybookComponent = () => {
    const [value, setValue] = useState('');
    const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

    const url = 'https://jsonplaceholder.typicode.com/todos/';

    useEffect(() => {
        try {
            fetch(url)
                .then((response) => response.json())
                .then((items) => setSuggestions(items));
        } catch (e) {
            console.error(e);
        }
    }, []);

    return (
        <>
            <StoryTitle>Basic input with suggestions received by api.</StoryTitle>
            <Suggest placeholder="Input label" value={value} setInputValue={setValue} data={suggestions} />
        </>
    );
};
BasicFromURL.storyName = 'Basic from fetch data';
