import React, {useState} from 'react';

import {Meta} from '@storybook/react/types-6-0';

import 'css/bundle.less';
import 'css/demo.less';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';
import {Input} from '../Input';
import {Checkbox, Radio, RadioButton, Textarea} from '../index';
import {Button} from '../../button';
import {Form} from './Form';
import {FORM_UNIT_SIZE} from './Unit';

export default {
    title: 'Forms',
} as Meta;

const themes = {
    default: {
        title: 'Default theme',
        containerClasses: [],
        variant: 'white',
    },
};

interface IInputsContainerProps {
    themeColor: keyof typeof themes;
}

const FormsContainer = (props: IInputsContainerProps) => {
    const {themeColor} = props;
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [about, setAbout] = useState('');
    const [yes, setYes] = useState(false);
    const [variants, setVariants] = useState('1');
    const [checkedRadioOne, setCheckedRadioOne] = useState(false);
    const variantsList = ['1', '2', '3'];

    const currentTheme = themes[themeColor];
    return (
        <div className={currentTheme.containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div>
                        <div className="t-lead t-lead-24">{currentTheme.title}</div>
                        <div className="inputs-container lfelx-y-axis">
                            <Form>
                                <Form.Unit>
                                    <Form.Title>Наша супер форма</Form.Title>
                                    <Form.SubTitle>Дополнительный заголовок</Form.SubTitle>
                                </Form.Unit>
                                <Form.Unit size={FORM_UNIT_SIZE.big}>
                                    <Input label={'Логин'} value={name} onChange={(e) => setName(e.target.value)} />
                                    <Input
                                        label={'Пароль'}
                                        type={'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Textarea
                                        label={'О себе'}
                                        value={about}
                                        onChange={(e) => setAbout(e.target.value)}
                                    />
                                    <Checkbox
                                        name="yes"
                                        label={'Вы согласны?'}
                                        checked={yes}
                                        onChange={() => setYes(!yes)}
                                    />
                                    <Form.Label>Описание полей</Form.Label>
                                    <div className={'lflex'}>
                                        {variantsList.map((item, index) => {
                                            return (
                                                <Radio
                                                    key={item + index}
                                                    checked={item === variants}
                                                    onChange={(e) => setVariants(e.target.value)}
                                                    name={'variants'}
                                                    label={`Решение ${item}`}
                                                    value={item}
                                                />
                                            );
                                        })}
                                    </div>
                                    <Form.Label error={true}>Уведомление об ошибке</Form.Label>
                                    <div className={'lflex'}>
                                        <RadioButton
                                            value="s"
                                            checked={checkedRadioOne}
                                            onChange={() => setCheckedRadioOne(!checkedRadioOne)}
                                        />
                                        <div> Отправлять уведомления на email?</div>
                                    </div>
                                    <Form.Description>Описание</Form.Description>
                                    <Form.Description error={true}>Описание с ошибкой</Form.Description>
                                    <div className={'lbrick-1'} />
                                    <Button type={'submit'}>Отправить</Button>
                                    <div className={'lbrick-1'} />
                                </Form.Unit>
                                <Form.Footer>Подвал формы</Form.Footer>
                            </Form>
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
                <FormsContainer themeColor={themeColor as keyof typeof themes} key={index} />
            ))}
        </>
    );
};
