import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';
import 'css/bundle.less';
import {Form} from '../Form';

export default {
    title: 'Text',
    component: Form,
} as Meta;

const themes = {
    default: {
        title: 'Default theme',
        containerClasses: [],
    },
    dark: {
        title: 'Dark theme',
        containerClasses: ['mtheme--darkpic'],
    },
};

interface IInputsContainerProps {
    themeColor: keyof typeof themes;
}

const Components = {
    default: [
        <Form.Text key={1} placeholder="Empty" />,
        <Form.Text key={2} placeholder="Empty" />,
        <Form.Text key={5} placeholder="Empty" disabled value="Disabled" />,
        <Form.Text key={6} placeholder="Empty" error />,
    ],
    dark: [
        <Form.Text key={3} placeholder="Empty" />,
        <Form.Text key={4} placeholder="Empty" multiline />,
        <Form.Text key={5} placeholder="Empty" disabled value="Disabled" />,
        <Form.Text key={6} placeholder="Empty" error />,
    ],
};

const InputsContainer = (props: IInputsContainerProps) => {
    const {themeColor} = props;
    const [value, setValue] = useState('');
    return (
        <div className={themes[themeColor].containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div style={{flexGrow: 1}} className="lflex--y-axis">
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lflex lflex--y-axis">
                            {Components[themeColor].map((Component) => {
                                return (
                                    <>
                                        {Component}
                                        <div className="lbrick-2" />
                                    </>
                                );
                            })}
                            <Form.Text value={value} onChange={(e) => setValue(e.target.value)} multiline />
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
            {Object.keys(themes).map((theme, key) => (
                <InputsContainer key={key} themeColor={theme as keyof typeof themes} />
            ))}
        </>
    );
};
