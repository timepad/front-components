import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Checkbox} from './index';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import '../storybook/demo.less';

export default {
    title: 'Checkbox',
    component: Checkbox,
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
    themeColor: keyof typeof themes;
}

const CheckboxContainer = (props: IInputsContainerProps) => {
    const {themeColor} = props;
    const [checkedOne, setCheckedOne] = React.useState(false);
    const [checkedTwo, setCheckedTwo] = React.useState(true);
    const theme = themeColor;

    return (
        <div className={themes[themeColor].containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div>
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lfelx-y-axis">
                            <ComponentBlock title="Checkbox">
                                <div className="lbrick-2" />
                                <Checkbox
                                    name={`${theme}-checkbox-one`}
                                    label={checkedOne ? 'Checked' : 'Active'}
                                    checked={checkedOne}
                                    onChange={() => {
                                        setCheckedOne(!checkedOne);
                                    }}
                                />
                                <div className="lbrick-2" />
                                <Checkbox
                                    name={`${theme}-checkbox-two`}
                                    label={checkedTwo ? 'Checked' : 'Active'}
                                    checked={checkedTwo}
                                    onChange={() => {
                                        setCheckedTwo(!checkedTwo);
                                    }}
                                />
                                <div className="lbrick-2" />
                                <Checkbox name="n3" label="Disabled" value="v1" checked={false} disabled />
                                <div className="lbrick-2" />
                                <Checkbox name="n4" label="Checked disabled" value="v1" checked={true} disabled />
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
                <CheckboxContainer themeColor={themeColor as keyof typeof themes} key={index} />
            ))}
        </>
    );
};
