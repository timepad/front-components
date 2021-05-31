import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {RadioButton} from './index';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import 'css/demo.less';

export default {
    title: 'RadioButton',
    component: RadioButton,
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

const ComponentBlock = ({title, children}: React.PropsWithChildren<{title: string}>) => {
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

interface IInputsContainerProps {
    themeColor: keyof typeof themes;
}

const RadioButtonContainer = (props: IInputsContainerProps) => {
    const [checkedRadioOne, setCheckedRadioOne] = React.useState(false);
    const [checkedRadioOneLabeled, setCheckedRadioOneLabeled] = React.useState(false);
    const [checkedRadioTwo, setCheckedRadioTwo] = React.useState(true);
    const [checkedRadioTwoLabeled, setCheckedRadioTwoLabeled] = React.useState(true);
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
                            <ComponentBlock title="Button icon">
                                <div className="lbrick-2" />
                                <RadioButton
                                    value="s"
                                    checked={checkedRadioOne}
                                    onChange={() => setCheckedRadioOne(!checkedRadioOne)}
                                />
                                <div className="lbrick-2" />
                                <RadioButton value="s" disabled />
                                <div className="lbrick-2" />
                                <RadioButton
                                    value="s"
                                    checked={checkedRadioTwo}
                                    onChange={() => setCheckedRadioTwo(!checkedRadioTwo)}
                                />
                                <div className="lbrick-2" />
                                <RadioButton value="s" checked disabled />
                                <div className="lbrick-2" />
                            </ComponentBlock>
                            <ComponentBlock title="Button text">
                                <div className="lbrick-2" />
                                <div>
                                    <RadioButton
                                        value="s"
                                        checked={checkedRadioOneLabeled}
                                        label="Auto Active"
                                        onChange={() => setCheckedRadioOneLabeled(!checkedRadioOneLabeled)}
                                    />
                                </div>
                                <div className="lbrick-2" />
                                <div>
                                    <RadioButton value="s" disabled label="Auto Disabled" />
                                </div>
                                <div className="lbrick-2" />
                                <div>
                                    <RadioButton
                                        value="s"
                                        checked={checkedRadioTwoLabeled}
                                        label="Auto Active"
                                        onChange={() => setCheckedRadioTwoLabeled(!checkedRadioTwoLabeled)}
                                    />
                                </div>
                                <div className="lbrick-2" />
                                <div>
                                    <RadioButton value="s" checked disabled label="Auto Disabled" />
                                </div>
                                <div className="lbrick-2" />
                            </ComponentBlock>
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
                <RadioButtonContainer themeColor={themeColor as keyof typeof themes} key={index} />
            ))}
        </>
    );
};
