import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Radio} from './index';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import 'css/demo.less';

export default {
    title: 'Radio',
    component: Radio,
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

const RadioContainer = (props: IInputsContainerProps) => {
    const {themeColor} = props;
    const [selectedRadio, setSelectedRadio] = React.useState('option-2');

    return (
        <div className={themes[themeColor].containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div>
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lfelx-y-axis">
                            <ComponentBlock title="Radio button">
                                <div className="lbrick-2" />
                                <Radio
                                    name="radio-1"
                                    label={selectedRadio === 'option-1' ? 'Checked' : 'Active'}
                                    value="option-1"
                                    checked={selectedRadio === 'option-1'}
                                    onChange={() => {
                                        setSelectedRadio('option-1');
                                    }}
                                />
                                <div className="lbrick-2" />
                                <Radio
                                    name="radio-1"
                                    label={selectedRadio === 'option-2' ? 'Checked' : 'Active'}
                                    value="option-2"
                                    checked={selectedRadio === 'option-2'}
                                    onChange={() => {
                                        setSelectedRadio('option-2');
                                    }}
                                />
                                <div className="lbrick-2" />
                                <Radio name="radio-2" label="Disabled" value="option-1" checked={false} disabled />
                                <div className="lbrick-2" />
                                <Radio
                                    name="radio-3"
                                    label="Checked disabled"
                                    value="option-1"
                                    checked={true}
                                    disabled
                                />
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

export const Simple: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Primary</StoryTitle>
            {Object.keys(themes).map((themeColor, index) => (
                <RadioContainer themeColor={themeColor} key={index} />
            ))}
        </>
    );
};
