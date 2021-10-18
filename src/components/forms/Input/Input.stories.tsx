import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {Input} from './index';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import '../storybook/demo.less';
import {InputKind} from '../enums';

export default {
    title: 'Input',
    component: Input,
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

interface IInputData {
    label: string;
    value: string | number;
    disabled?: boolean;
    success?: boolean;
    error?: string;
    autoFocus?: boolean;
    kind?: InputKind;
}

const inputsData: IInputData[] = [
    // Empty input
    {
        label: 'Empty',
        value: '',
        disabled: false,
        success: false,
        error: undefined,
    },
    // Active input
    {
        label: 'Active input caption',
        value: 'Active',
        disabled: false,
        success: false,
        error: undefined,
        autoFocus: true,
    },
    // Filled input
    {
        label: 'Input caption',
        value: 'Filled',
        disabled: false,
        success: false,
        error: undefined,
    },
    // Disabled input
    {
        label: 'Disabled input caption',
        value: 'Disabled',
        disabled: true,
        success: false,
        error: undefined,
    },
    // Successful input
    {
        label: 'Input caption',
        value: 'Filled',
        disabled: false,
        success: true,
        error: undefined,
    },
    // Error input
    {
        label: 'Error input caption',
        value: 'Error',
        disabled: false,
        success: false,
        error: 'Error input caption (error text)',
    },
    // Ghost input
    {
        label: 'Ghost input caption',
        value: '',
        disabled: false,
        success: false,
        error: undefined,
        kind: InputKind.ghost,
    },
];

const InputRow = (props: IInputData) => {
    const {label, value: valueDefault, disabled, success, error, autoFocus, kind} = props;
    const [value, setValue] = React.useState(valueDefault);
    return (
        <Input
            label={label}
            value={value}
            disabled={disabled}
            success={success}
            error={error}
            autoFocus={autoFocus}
            kind={kind}
            onChange={(event) => setValue(event.target.value)}
        />
    );
};

interface IInputsContainerProps {
    data: IInputData[];
    themeColor: keyof typeof themes;
}

const InputsContainer = (props: IInputsContainerProps) => {
    const {data, themeColor} = props;
    return (
        <div className={themes[themeColor].containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div>
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lfelx-y-axis">
                            {data.map((input, index) => (
                                <div key={index}>
                                    <InputRow
                                        label={input.label}
                                        value={input.value}
                                        disabled={input.disabled}
                                        success={input.success}
                                        error={input.error}
                                        autoFocus={input.autoFocus}
                                        kind={input.kind}
                                    />
                                    <div className="lbrick-2" />
                                </div>
                            ))}
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
                <InputsContainer data={inputsData} themeColor={themeColor as keyof typeof themes} key={index} />
            ))}
        </>
    );
};
