import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';
import 'css/bundle.less';
import {Form} from '../Form';
import {Formik, Form as FormikForm} from 'formik';
import * as Yup from 'yup';

export default {
    title: 'Text (new)',
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
                            <Form.Text key={3} multiline={true} placeholder="Empty" />
                            <div className="lbrick-2" />
                            <Form.Text key={4} multiline={false} placeholder="Empty" />
                            <div className="lbrick-2" />
                            <Form.Text key={5} multiline={false} placeholder="Disabled" disabled />
                            <div className="lbrick-2" />
                            <Form.Text key={6} multiline={false} placeholder="Empty" error={'message'} />
                            <div className="lbrick-2" />
                            <Form.Text
                                placeholder="Multiline"
                                value={value}
                                multiline={true}
                                onChange={(e) => setValue(e.target.value)}
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

interface IValues {
    email: string;
}

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Некорректная почта').required(),
});

export const TextFieldFormikWithYup: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>TextField Formik</StoryTitle>
            <Formik<IValues>
                initialValues={{
                    email: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                    }, 1000);
                }}
            >
                {() => (
                    <FormikForm>
                        <Form.TextField multiline={false} name="email" type="text" placeholder="Email" />
                    </FormikForm>
                )}
            </Formik>
        </>
    );
};
