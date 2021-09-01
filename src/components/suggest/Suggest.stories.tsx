import '../../assets/css/bundle.less';
import * as React from 'react';
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
    ];

    const [value, setValue] = useState('');

    return (
        <>
            <StoryTitle>Basic input with suggestions from transferred data array (type su).</StoryTitle>
            <Suggest label="Input label" value={value} setValue={setValue} data={temp} />
        </>
    );
};
BasicFromArray.storyName = 'Basic from array';

export const BasicFromURL: IStorybookComponent = () => {
    const url = 'https://jsonplaceholder.typicode.com/todos/';
    const [value, setValue] = useState('');

    return (
        <>
            <StoryTitle>Basic input with suggestions received by api from URL</StoryTitle>
            {/*TODO: выяснить почему в консоли ворнинг на проп setValue*/}
            <Suggest label="Input label" value={value} setValue={setValue} url={url} />
        </>
    );
};
BasicFromURL.storyName = 'Basic from URL';
