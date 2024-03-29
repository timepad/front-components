import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';
import 'css/bundle.less';
import {Form} from '../Form';
import {Formik, Form as FormikForm} from 'formik';
import {Button} from '../../button';

export default {
    title: 'Radio (new)',
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

const enum RadioEnumState {
    First = 'radio1',
    Second = 'radio2',
    Third = 'radio3',
}

const InputsContainer = (props: IInputsContainerProps) => {
    const {themeColor} = props;
    const [value, setValue] = useState(RadioEnumState.First);
    return (
        <div className={themes[themeColor].containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div style={{flexGrow: 1}} className="lflex--y-axis">
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lflex lflex--y-axis">
                            <Form.Radio
                                text="Text"
                                value={RadioEnumState.First}
                                checked={value === RadioEnumState.First}
                                onChange={() => setValue(RadioEnumState.First)}
                            />

                            <Form.Radio
                                text="Text"
                                caption="Caption"
                                value={RadioEnumState.Second}
                                checked={value === RadioEnumState.Second}
                                onChange={() => setValue(RadioEnumState.Second)}
                            />

                            <Form.Radio text="Disabled" caption="Caption" disabled />
                            <Form.Radio text="Disabled checked" caption="Caption" disabled checked={true} />
                        </div>
                    </div>
                    <div className="lgap-4-0" />
                </div>
                <div className="lbrick-2" />
            </div>
        </div>
    );
};

export const Radio: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Primary</StoryTitle>
            {Object.keys(themes).map((theme, key) => (
                <InputsContainer key={key} themeColor={theme as keyof typeof themes} />
            ))}
        </>
    );
};

export const RadioField: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Formik intergations</StoryTitle>
            <Formik
                initialValues={{
                    radio: '',
                }}
                onSubmit={(values) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        // actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {({values}) => (
                    <FormikForm>
                        <div className="lflex lflex--y-axis">
                            <Form.RadioField
                                name="radio"
                                checked={values.radio === RadioEnumState.First}
                                text="First"
                                value={RadioEnumState.First}
                            />

                            <Form.RadioField
                                name="radio"
                                checked={values.radio === RadioEnumState.Second}
                                text="Second"
                                value={RadioEnumState.Second}
                            />

                            <Button type="submit">Submit</Button>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </>
    );
};
