import * as React from 'react';
import {FC} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import 'css/bundle.less';
import {StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Tooltip} from './Tooltip';

interface IStorybookComponent extends FC {
    storyName?: string;
}

export default {
    title: 'Tooltip',
    component: Tooltip,
} as Meta;

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>First Tooltip Example</StoryTitle>
            <p>
                Some text Some text Some text
                <Tooltip
                    message={
                        'бъемныйб ъемны йбъемны йбъемныйбъемный b текст в котором подробно рассказанопроисходящем на экране'
                    }
                    style={{color: 'red'}}
                >
                    Tooltip
                </Tooltip>
                <h1>Other...</h1>
            </p>

            <StoryTitle>Second Tooltip Example</StoryTitle>
            <h1>Other...</h1>
            <h1>Other...</h1>
            <p>
                Объемный текст в текст в котором
                <Tooltip
                    message={'бъемный текст в котором подробно рассказанопроисходящем на экране'}
                    style={{color: 'red'}}
                >
                    Tooltip
                </Tooltip>
                Объемный текст в котором
            </p>

            <StoryTitle>Third Tooltip Example</StoryTitle>
            <h1>Other...</h1>
            <p>
                Объемный текст в котором подробно рассказанопроисходящем на экране
                <Tooltip
                    message={'бъемный текст в котором подробно рассказанопроисходящем на экране'}
                    style={{color: 'red'}}
                >
                    Tooltip
                </Tooltip>
            </p>
        </>
    );
};
