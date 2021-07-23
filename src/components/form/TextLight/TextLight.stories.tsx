import React from 'react';

import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import {Form} from '../Form';
import {Formik, Form as FormikForm} from 'formik';

export default {
    title: 'TextLight',
    component: Form,
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
    placeholder: string;
    multiline?: boolean;
    value: string | number;
    disabled?: boolean;
    success?: boolean;
    error?: string;
    autoFocus?: boolean;
}

const inputsData: IInputData[] = [
    {
        placeholder: 'Multiline',
        value: '',
        multiline: true,
        disabled: false,
        success: false,
        error: undefined,
    },
    // Empty input
    {
        placeholder: 'Empty',
        value: '',
        disabled: false,
        success: false,
        error: undefined,
    },
    // Active input
    {
        placeholder: 'Active input caption',
        value: 'Active',
        disabled: false,
        success: false,
        error: undefined,
        autoFocus: true,
    },
    // Filled input
    {
        placeholder: 'Input caption',
        value: 'Filled',
        disabled: false,
        success: false,
        error: undefined,
    },
    // Disabled input
    {
        placeholder: 'Disabled input caption',
        value: 'Disabled',
        disabled: true,
        success: false,
        error: undefined,
    },
    // Successful input
    {
        placeholder: 'Input caption',
        value: 'Filled',
        disabled: false,
        success: true,
        error: undefined,
    },
    // Error input
    {
        placeholder: 'Error input caption',
        value: 'Error',
        disabled: false,
        success: false,
        error: 'Error input caption (error text)',
    },
];

const InputRow = (props: IInputData) => {
    const {placeholder, value: valueDefault, disabled, success, error, autoFocus, multiline} = props;
    const [value, setValue] = React.useState(valueDefault);
    return (
        <Form.TextLight
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            success={success}
            multiline={multiline}
            error={error}
            autoFocus={autoFocus}
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
                                        placeholder={input.placeholder}
                                        value={input.value}
                                        disabled={input.disabled}
                                        success={input.success}
                                        multiline={input.multiline}
                                        error={input.error}
                                        autoFocus={input.autoFocus}
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

interface IValues {
    firstName: string;
    lastName: string;
    email: string;
}

export const FormikExample: IStorybookComponent = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    firstName: 'red',
                    lastName: '',
                }}
                validate={(values) => {
                    if (values.firstName.match(/[0-9]+/g)) {
                        return {
                            firstName: 'Имя не может содержать цифры',
                        };
                    }
                }}
                onSubmit={(values: IValues) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        // actions.setSubmitting(false);
                    }, 1000);
                }}
                validateOnMount
            >
                {() => (
                    <FormikForm>
                        <Form.TextLightField name="firstName" type="text" placeholder="TEST" />
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};
