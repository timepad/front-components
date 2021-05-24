import React from 'react';

import {Meta} from '@storybook/react/types-6-0';

import 'css/bundle.less';
import 'css/demo.less';
import {IStorybookComponent, StoryTitle} from '../../services/helpers/storyBookHelpers';
import {Input} from './Input';
import {Checkbox, Radio, Textarea} from './index';
import {Button} from '../button';

export default {
    title: 'Forms',
} as Meta;

const themes = {
    default: {
        title: 'Default theme',
        containerClasses: [],
    },
    light: {
        title: 'Light theme',
        containerClasses: ['mtheme--lightpic'],
    },
    dark: {
        title: 'Dark theme',
        containerClasses: ['mtheme--darkpic'],
    },
};

interface IInputsContainerProps {
    themeColor: string;
}

const FormsContainer = (props: IInputsContainerProps) => {
    const {themeColor} = props;
    return (
        <div className={themes[themeColor].containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div>
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lfelx-y-axis">
                            <form>
                                <Input label={'Логин'} value={''} />
                                <Input label={'Пароль'} type={'password'} value={''} />
                                <Textarea label={'О себе'} value={''} />
                                <Checkbox name="yes" label={'Вы согласны?'} />
                                <div className={'lflex'}>
                                    <Radio name={'variants'} label={'Решение 1'} value={'1'} />
                                    <Radio name={'variants'} label={'Решение 2'} value={'1'} />
                                    <Radio name={'variants'} label={'Решение 3'} value={'1'} />
                                </div>
                                <Button type={'submit'}>Отправить</Button>
                            </form>
                        </div>
                    </div>
                    <div className="lgap-4-0" />
                </div>
                <div className="lbrick-2" />
            </div>
        </div>
    );
};

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Primary</StoryTitle>
            {Object.keys(themes).map((themeColor, index) => (
                <FormsContainer themeColor={themeColor} key={index} />
            ))}
        </>
    );
};
