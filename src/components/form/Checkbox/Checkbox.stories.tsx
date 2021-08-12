import React from 'react';
import {Meta} from '@storybook/react/types-6-0';
import {IStorybookComponent, StoryTitle} from '../../../services/helpers/storyBookHelpers';
import 'css/bundle.less';
import {Form} from '../Form';
import {Form as FormikForm, Formik} from 'formik';
import {Button} from '../../button';

export default {
    title: 'Checkbox (new)',
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

    return (
        <div className={themes[themeColor].containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div style={{flexGrow: 1}} className="lflex--y-axis">
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lflex lflex--y-axis">
                            <Form.Checkbox name="empty" text="Empty" />
                            <Form.Checkbox name="checked" text="Checked" checked />
                            <Form.Checkbox name="indeterminate" text="Indeterminate" indeterminate />
                            <Form.Checkbox name="empty" text="Empty" disabled />
                            <Form.Checkbox name="checked" text="Checked" checked disabled />
                            <Form.Checkbox name="indeterminate" text="Indeterminate" indeterminate disabled />
                            <Form.Checkbox name="empty" text="Empty" caption="Secondary text" />
                            <Form.Checkbox name="checked" text="Checked" caption="Secondary text" checked />
                            <Form.Checkbox
                                name="indeterminate"
                                text="Indeterminate"
                                caption="Secondary text"
                                indeterminate
                            />
                            <Form.Checkbox name="empty" text="Empty" caption="Secondary text" disabled />
                            <Form.Checkbox name="checked" text="Checked" caption="Secondary text" checked disabled />
                            <Form.Checkbox
                                name="indeterminate"
                                text="Indeterminate"
                                caption="Secondary text"
                                indeterminate
                                disabled
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

export const Checkbox: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Primary</StoryTitle>
            {Object.keys(themes).map((theme, key) => (
                <InputsContainer key={key} themeColor={theme as keyof typeof themes} />
            ))}
        </>
    );
};

interface IInitialValues {
    indeterminateBox: boolean;
    multiple: string[];
    testOne: boolean;
    testTwo: boolean;
}

export const CheckboxField: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Formik intergations</StoryTitle>
            <Formik<IInitialValues>
                initialValues={{
                    multiple: [],
                    indeterminateBox: false,
                    testOne: false,
                    testTwo: false,
                }}
                onSubmit={(values) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                    }, 1000);
                }}
            >
                {() => (
                    <FormikForm>
                        <div className="lflex lflex--y-axis">
                            <Form.CheckboxField name="testOne" text="isFirstActive" />
                            <Form.CheckboxField name="testTwo" text="isSecondActive" />
                            <Form.CheckboxField name="multiple" text="Dogs" value="dogs" />
                            <Form.CheckboxField name="multiple" text="Cats" value="cats" />
                            <div className="lbrick-1" />
                            <Button type="submit">Submit</Button>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </>
    );
};
