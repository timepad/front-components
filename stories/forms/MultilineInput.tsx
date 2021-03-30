import React, {useState} from 'react';
import {Brick} from '../../src/components/utility/Modifiers/Brick';
import './inputs.less';
import {Gap} from '../../src/components/utility/Modifiers/Gap';
import {Textarea} from '../../src';

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

interface ITextareaData {
    label: string;
    value: string;
    disabled?: boolean;
    success?: boolean;
    error?: string;
    autoFocus?: boolean;
}

const textareaData: ITextareaData[] = [
    // Empty textarea
    {label: 'Default', value: '', disabled: false, success: false, error: undefined},
    // Filled 1 row textarea
    {
        label: 'Input caption filled 1 line',
        value: 'A text field is one of the most common',
        disabled: false,
        success: false,
        error: undefined,
    },
    // Filled 2 rows textarea
    {
        label: 'Input caption filled 2 lines',
        value: 'A text field is one of the most common ways for users to enter and edit text',
        disabled: false,
        success: false,
        error: undefined,
    },
    // Filled 3 rows textarea
    {
        label: 'Input caption filled 3 lines',
        value: 'A text field is one of the most common ways for users to enter and edit text in forms and dialogs',
        disabled: false,
        success: false,
        error: undefined,
    },
    // Filled 3+ rows textarea
    {
        label: 'Input caption filled 4+ lines',
        value:
            'A text field is one of the most common ways for users to enter and edit text in forms and dialogs. However, some users didn’t know that they could interact with and click on the text field. ',
        disabled: false,
        success: false,
        error: undefined,
    },
    // Disabled input
    {
        label: 'Disabled input caption',
        value:
            'A text field is one of the most common ways for users to enter and edit text in forms and dialogs. However, some users didn’t know that they could interact with and click on the text field. ',
        disabled: true,
        success: false,
        error: undefined,
    },
    // Successful input
    {
        label: 'Input caption',
        value:
            'A text field is one of the most common ways for users to enter and edit text in forms and dialogs. However, some users didn’t know that they could interact with and click on the text field. ',
        disabled: false,
        success: true,
        error: undefined,
    },
    // Error input
    {
        label: 'Error input caption',
        value:
            'A text field is one of the most common ways for users to enter and edit text in forms and dialogs. However, some users didn’t know that they could interact with and click on the text field. ',
        disabled: false,
        success: false,
        error: 'Error input caption (error text)',
    },
];

const TextareaRow = (props: ITextareaData) => {
    const {label, value: valueDefault, disabled, success, error, autoFocus} = props;
    const [value, setValue] = useState(valueDefault);
    return (
        <Textarea
            label={label}
            value={value}
            disabled={disabled}
            success={success}
            error={error}
            autoFocus={autoFocus}
            onChangeHandler={(_, value) => setValue(value)}
        />
    );
};

interface ITextareaContainerProps {
    data: ITextareaData[];
    themeID: keyof typeof themes;
}

const TextareaContainer = (props: ITextareaContainerProps) => {
    const {data, themeID} = props;
    return (
        <div className={themes[themeID].containerClasses.join(' ')}>
            <div className="сtheme__typo сtheme--bg--demo">
                <Brick size={4} />
                <div className="lflex">
                    <Gap size={4} />
                    <div>
                        <div className="t-lead t-lead-24">{themes[themeID].title}</div>
                        <div className="inputs-container lfelx-y-axis">
                            {data.map((input, index) => (
                                <div key={index}>
                                    <TextareaRow
                                        label={input.label}
                                        value={input.value}
                                        disabled={input.disabled}
                                        success={input.success}
                                        error={input.error}
                                        autoFocus={input.autoFocus}
                                    />
                                    <Brick size={2} />
                                </div>
                            ))}
                        </div>
                    </div>
                    <Gap size={4} />
                </div>
                <Brick size={4} />
            </div>
        </div>
    );
};

export const MultilineInput = (): React.ReactElement => {
    // .sb-forms-inputs is a container class to separate form-inputs styles from all other
    return (
        <div className="sb-forms-inputs">
            {Object.keys(themes).map((themeID, index) => (
                <TextareaContainer themeID={themeID as keyof typeof themes} data={textareaData} key={index} />
            ))}
        </div>
    );
};

MultilineInput.storyName = 'Multi-line Input';
