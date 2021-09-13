import React from 'react';

import * as Yup from 'yup';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';

import 'css/bundle.less';
import {NewForm} from '../Form';
import {Formik, Form as FormikForm} from 'formik';

export default {
    title: 'TextLight (new)',
    component: NewForm,
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
    caption?: string;
}

const inputsData: IInputData[] = [
    {
        placeholder: 'Multiline',
        value: '',
        multiline: true,
        disabled: false,
        success: false,
        error: undefined,
        caption: 'Caption',
    },
    // Empty input
    {
        placeholder: 'Empty',
        value: '',
        multiline: false,
        disabled: false,
        success: false,
        error: undefined,
        caption: 'Caption',
    },
    // Active input
    {
        placeholder: 'Active input caption',
        value: 'Active',
        disabled: false,
        multiline: false,
        success: false,
        error: undefined,
        autoFocus: true,
        caption: 'Caption',
    },
    // Filled input
    {
        placeholder: 'Input caption',
        value: 'Filled',
        disabled: false,
        multiline: false,
        success: false,
        error: undefined,
        caption: 'Caption',
    },
    // Disabled input
    {
        placeholder: 'Disabled input caption',
        value: 'Disabled',
        disabled: true,
        multiline: false,
        success: false,
        error: undefined,
        caption: 'Caption',
    },
    // Successful input
    {
        placeholder: 'Input caption',
        value: 'Filled',
        disabled: false,
        success: true,
        error: undefined,
        caption: 'Caption',
    },
    // Error input
    {
        placeholder: 'Error input caption',
        value: 'Error',
        multiline: false,
        disabled: false,
        success: false,
        error: 'Error input caption (error text)',
        caption: 'Caption',
    },
];

const InputRow = (props: IInputData) => {
    const {placeholder, value: valueDefault, disabled, success, error, autoFocus, multiline = false, caption} = props;
    const [value, setValue] = React.useState(valueDefault);
    return (
        <NewForm.TextLight
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            success={success}
            multiline={multiline}
            error={error}
            autoFocus={autoFocus}
            onChange={(event: any) => setValue(event.target.value)}
            caption={caption}
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
                                        caption={input.caption}
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
    email: string;
}

const mailValidationSchema = Yup.object().shape({
    email: Yup.string().email('Некорректная почта').required(),
});

export const FormikExampleWithYup: IStorybookComponent = () => {
    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                }}
                validationSchema={mailValidationSchema}
                onSubmit={(values: IValues) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                    }, 1000);
                }}
            >
                {() => (
                    <FormikForm>
                        <NewForm.TextLightField
                            name="email"
                            caption="Какой-то caption"
                            type="text"
                            placeholder="Введите email"
                        />
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};
