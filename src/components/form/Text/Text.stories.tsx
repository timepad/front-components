import React, {useState} from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';
import 'css/bundle.less';
import {NewForm} from '../Form';
import {Formik, Form as FormikForm} from 'formik';
import * as Yup from 'yup';

export default {
    title: 'Text (new)',
    component: NewForm,
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
                            <NewForm.Text key={3} multiline placeholder="Empty" />
                            <div className="lbrick-2" />
                            <NewForm.Text key={4} placeholder="Empty" />
                            <div className="lbrick-2" />
                            <NewForm.Text key={5} placeholder="Disabled" disabled />
                            <div className="lbrick-2" />
                            <NewForm.Text key={6} placeholder="Empty" error={'message'} />
                            <div className="lbrick-2" />
                            <NewForm.Text
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
                        <NewForm.TextField name="email" type="text" placeholder="Email" />
                    </FormikForm>
                )}
            </Formik>
        </>
    );
};
