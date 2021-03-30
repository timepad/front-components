import React, {PropsWithChildren, useState} from 'react';

import '../../src/assets/css/bundle.less';
import '../../src/app/styles.less';
import '../lib/main.less';

import {Brick} from '../../src/components/utility/Modifiers/Brick';
import {Theme} from '../../src/components/utility/Modifiers';
import {RequireOnlyOne} from '../../src/interfaces/misc/requireOnlyOne';
import {IThemeProps} from '../../src/components/utility/Modifiers';
import {Checkbox} from '../../src';
import {Radio} from '../../src';
import {RadioButton} from '../../src';
import {CheckboxGroup} from '../../src/components/Forms/Checkbox';

const backgroundColor = {
    default: '#FFFFFF',
    light: '#FFF2D9',
    dark: '#252525',
};

const ComponentBlock = ({title, children}: PropsWithChildren<{title: string}>) => {
    return (
        <div style={{padding: '0 64px 0 0'}}>
            <span className="t-caption t-caption-16" style={{textTransform: 'capitalize', color: '#808080'}}>
                {title}
            </span>
            <hr className="adivider adivider--thin" />
            {children}
        </div>
    );
};

const ThemedBlock = ({theme}: {theme: keyof typeof backgroundColor}) => {
    const [checkedOne, setCheckedOne] = useState(false);
    const [checkedTwo, setCheckedTwo] = useState(true);
    const [selectedRadio, setSelectedRadio] = useState('option-2');
    const [checkedRadioOne, setCheckedRadioOne] = useState(false);
    const [checkedRadioOneLabeled, setCheckedRadioOneLabeled] = useState(false);
    const [checkedRadioTwo, setCheckedRadioTwo] = useState(true);
    const [checkedRadioTwoLabeled, setCheckedRadioTwoLabeled] = useState(true);
    // TODO: change types, support default color?
    const themeArgs: RequireOnlyOne<IThemeProps> = {[theme]: true} as any;

    return (
        <Theme {...themeArgs}>
            <div
                style={{
                    padding: '32px 0 32px 64px',
                    background: backgroundColor[theme],
                    color: theme === 'dark' ? '#FFFFFF' : '#252525',
                }}
            >
                <span className="t-lead t-lead-32" style={{textTransform: 'capitalize'}}>
                    {theme} theme
                </span>
                <div className="lflex">
                    <ComponentBlock title="Checkbox">
                        <Brick size={2} />
                        <Checkbox
                            name={`${theme}-checkbox-one`}
                            label={checkedOne ? 'Checked' : 'Active'}
                            checked={checkedOne}
                            onChange={() => {
                                setCheckedOne(!checkedOne);
                            }}
                        />
                        <Brick size={2} />
                        <Checkbox
                            name={`${theme}-checkbox-two`}
                            label={checkedTwo ? 'Checked' : 'Active'}
                            checked={checkedTwo}
                            onChange={() => {
                                setCheckedTwo(!checkedTwo);
                            }}
                        />
                        <Brick size={2} />
                        <Checkbox name="n3" label="Disabled" value="v1" checked={false} disabled />
                        <Brick size={2} />
                        <Checkbox name="n4" label="Checked disabled" value="v1" checked={true} disabled />
                        <Brick size={2} />
                    </ComponentBlock>
                    <ComponentBlock title="Radio button">
                        <Brick size={2} />
                        <Radio
                            name="radio-1"
                            label={selectedRadio === 'option-1' ? 'Checked' : 'Active'}
                            value="option-1"
                            checked={selectedRadio === 'option-1'}
                            onChange={() => {
                                setSelectedRadio('option-1');
                            }}
                        />
                        <Brick size={2} />
                        <Radio
                            name="radio-1"
                            label={selectedRadio === 'option-2' ? 'Checked' : 'Active'}
                            value="option-2"
                            checked={selectedRadio === 'option-2'}
                            onChange={() => {
                                setSelectedRadio('option-2');
                            }}
                        />
                        <Brick size={2} />
                        <Radio name="radio-2" label="Disabled" value="option-1" checked={false} disabled />
                        <Brick size={2} />
                        <Radio name="radio-3" label="Checked disabled" value="option-1" checked={true} disabled />
                        <Brick size={2} />
                    </ComponentBlock>
                    <ComponentBlock title="Button icon">
                        <Brick size={2} />
                        <RadioButton
                            value="s"
                            checked={checkedRadioOne}
                            onChangeHandler={() => setCheckedRadioOne(!checkedRadioOne)}
                        />
                        <Brick size={2} />
                        <RadioButton value="s" disabled />
                        <Brick size={2} />
                        <RadioButton
                            value="s"
                            checked={checkedRadioTwo}
                            onChangeHandler={() => setCheckedRadioTwo(!checkedRadioTwo)}
                        />
                        <Brick size={2} />
                        <RadioButton value="s" checked disabled />
                        <Brick size={2} />
                    </ComponentBlock>
                    <ComponentBlock title="Button text">
                        <Brick size={2} />
                        <div>
                            <RadioButton
                                value="s"
                                checked={checkedRadioOneLabeled}
                                label="Auto Active"
                                onChangeHandler={() => setCheckedRadioOneLabeled(!checkedRadioOneLabeled)}
                            />
                        </div>
                        <Brick size={2} />
                        <div>
                            <RadioButton value="s" disabled label="Auto Disabled" />
                        </div>
                        <Brick size={2} />
                        <div>
                            <RadioButton
                                value="s"
                                checked={checkedRadioTwoLabeled}
                                label="Auto Active"
                                onChangeHandler={() => setCheckedRadioTwoLabeled(!checkedRadioTwoLabeled)}
                            />
                        </div>
                        <Brick size={2} />
                        <div>
                            <RadioButton value="s" checked disabled label="Auto Disabled" />
                        </div>
                        <Brick size={2} />
                    </ComponentBlock>
                </div>
            </div>
        </Theme>
    );
};

export const RadioAndCheckboxes = (): React.ReactElement => {
    return (
        <>
            {Object.keys(backgroundColor).map((themeName, index) => (
                <ThemedBlock theme={themeName as keyof typeof backgroundColor} key={index} />
            ))}
        </>
    );
};

RadioAndCheckboxes.story = {
    name: 'Radio & Checkboxes',
};
