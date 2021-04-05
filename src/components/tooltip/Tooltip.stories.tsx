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
                <Tooltip message={'Текст в котором подробно рассказанопроисходящем на экране'} style={{color: 'red'}}>
                    Tooltip
                </Tooltip>
                Объемный текст в тексте
            </p>

            <p>
                Объемный текст в котором
                <Tooltip
                    message={'Oбъемный текст в котором подробно рассказанопроисходящем на экране'}
                    style={{color: 'red'}}
                >
                    Tooltip
                </Tooltip>
                Объемный подробно рассказан о происходящем на экране
            </p>

            <p>
                Объемный текст в котором подробно рассказан о происходящем на экране
                <Tooltip
                    message={'Oбъемный текст в котором подробно рассказанопроисходящем на экране'}
                    style={{color: 'red'}}
                >
                    Tooltip
                </Tooltip>
            </p>
        </>
    );
};
