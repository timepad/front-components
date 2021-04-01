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
                Some text
                <Tooltip>
                    <Tooltip.Title style={{color: 'red'}}>Tooltip</Tooltip.Title>
                    <Tooltip.Message>
                        Объемный текст в котором подробно рассказанопроисходящем на экране Объемный текст в котором
                        подробно рассказанопроисходящем на экране Объемный текст в котором подробно
                        рассказанопроисходящем на экране
                    </Tooltip.Message>
                </Tooltip>
                <h1>Other...</h1>
            </p>

            <StoryTitle>Second Tooltip Example</StoryTitle>
            <h1>Other...</h1>
            <p>
                <Tooltip>
                    <Tooltip.Title style={{color: 'red'}}>Tooltip</Tooltip.Title>
                    <Tooltip.Message>
                        Объемный текст в котором подробно рассказанопроисходящем на экране
                    </Tooltip.Message>
                </Tooltip>
            </p>

            <StoryTitle>Third Tooltip Example</StoryTitle>
            <h1>Other...</h1>
            <p>
                Объемный текст в котором подробно на экране
                <Tooltip>
                    <Tooltip.Title style={{color: 'red'}}>Tooltip</Tooltip.Title>
                    <Tooltip.Message>
                        Объемный текст в котором подробно рассказанопроисходящем на экране
                    </Tooltip.Message>
                </Tooltip>
            </p>
        </>
    );
};
