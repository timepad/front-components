import React, {useState} from 'react';
import {Brick} from '../../src/components/utility/Modifiers/Brick';
import './inputs.less';
import {Gap} from '../../src/components/utility/Modifiers/Gap';
import {Form} from '../../src';
import {IThemeProps, Theme} from '../../src/components/utility/Modifiers';
import {RequireOnlyOne} from '../../src/interfaces/misc/requireOnlyOne';

const themes = {
    default: {
        title: 'Default theme',
        containerClasses: [],
    },
    light: {
        title: 'Light theme',
        containerClasses: ['сtheme--lightpic'],
    },
    dark: {
        title: 'Dark theme',
        containerClasses: ['сtheme--darkpic'],
    },
};

const backgroundColor = {
    default: '#FFFFFF',
    light: '#FFF2D9',
    dark: '#252525',
};

interface IInputData {
    label: string;
    value: string | number;
    disabled?: boolean;
    touched?: boolean;
    success?: boolean;
    error?: string;
    autoFocus?: boolean;
    name?: string;
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
        value: '79001112233',
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
        touched: true,
    },
];

const InputRow = (props: IInputData) => {
    const {label, value: valueDefault, disabled, error, name = 'name', touched = false} = props;
    const [value, setValue] = useState(valueDefault);
    return (
        <Form.PhoneInput
            name={name}
            label={label}
            value={String(value)}
            disabled={disabled}
            error={error}
            touched={touched}
            onChange={(_, value) => setValue(value)}
        />
    );
};

interface IInputsContainerProps {
    data: IInputData[];
    themeColor: keyof typeof themes;
}

const InputsContainer = (props: IInputsContainerProps) => {
    const {data, themeColor} = props;
    const themeArgs: RequireOnlyOne<IThemeProps> = Object.create(null, {
        [themeColor]: {writable: true, value: true},
    });

    return (
        <Theme {...themeArgs}>
            <div
                style={{
                    padding: '32px 0 32px 64px',
                    background: backgroundColor[themeColor],
                    color: themeColor === 'dark' ? '#FFFFFF' : '#252525',
                }}
            >
                <div className={themes[themeColor].containerClasses.join(' ')}>
                    <div className="сtheme__typo сtheme--bg--demo">
                        <Brick size={2} />
                        <div className="lflex">
                            <Gap size={4} />
                            <div>
                                <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                                <div className="inputs-container lfelx-y-axis">
                                    {data.map((input, index) => (
                                        <div key={index}>
                                            <InputRow
                                                name={'phone-input' + index}
                                                label={input.label}
                                                value={input.value}
                                                disabled={input.disabled}
                                                success={input.success}
                                                error={input.error}
                                                autoFocus={input.autoFocus}
                                                touched={input.touched}
                                            />
                                            <Brick size={2} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <Gap size={4} />
                        </div>
                        <Brick size={2} />
                    </div>
                </div>
            </div>
        </Theme>
    );
};

export const PhoneInputs = (): React.ReactElement => {
    // .sb-forms-inputs is a container class to separate form-inputs styles from all other
    return (
        <div className="sb-forms-inputs">
            {Object.keys(themes).map((themeColor, index) => (
                <InputsContainer data={inputsData} themeColor={themeColor as keyof typeof themes} key={index} />
            ))}
        </div>
    );
};

PhoneInputs.storyName = 'Phone Inputs';
