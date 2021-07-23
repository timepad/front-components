import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';
import 'css/bundle.less';
import {Form} from '../Form';
import {Formik, Form as FormikForm} from 'formik';

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
                        <div className="inputs-container lflex lflex--y-axis" style={{width: '200px'}}>
                            <Form.Text key={3} placeholder="Empty" />
                            <div className="lbrick-2" />
                            <Form.Text key={4} placeholder="Empty" />
                            <div className="lbrick-2" />
                            <Form.Text key={5} placeholder="Empty" disabled value="Disabled" />
                            <div className="lbrick-2" />
                            <Form.Text key={6} placeholder="Empty" error={'message'} />
                            <div className="lbrick-2" />
                            <Form.Text
                                placeholder="Multiline"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                multiline
                            />
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

export const TextFieldFormik: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>TextField Formik</StoryTitle>
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
                onSubmit={(values) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        // actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {() => (
                    <FormikForm>
                        <Form.TextField name="firstName" type="text" placeholder="TEST" />
                    </FormikForm>
                )}
            </Formik>
        </>
    );
};
