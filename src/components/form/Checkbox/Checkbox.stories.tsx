import React, {useState} from 'react';
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
    const [checked, setChecked] = useState<boolean>(false);
    //
    // const [groupChecked, setGroupChecked] = useState<CheckboxState>('off');
    // const [checks, setChecks] = useState<boolean[]>([false, false, false]);
    // const handleChange = (index: number) => () => {
    //     const tmp = checks.map((check, i) => (i === index ? !check : check));
    //     setChecks(tmp);
    // };
    //
    // useEffect(() => {
    //     const isAllFalse = checks.filter((i) => !i);
    //     const isAllTrue = checks.filter((i) => i);
    //     if (isAllFalse.length === 3) {
    //         setGroupChecked('off');
    //     } else if (isAllTrue.length === 3) {
    //         setGroupChecked('on');
    //     } else {
    //         setGroupChecked('partial');
    //     }
    // }, [checks]);

    return (
        <div className={themes[themeColor].containerClasses.join(' ')}>
            <div className="mtheme__typo mtheme--bg--demo">
                <div className="lbrick-2" />
                <div className="lflex">
                    <div className="lgap-4-0" />
                    <div style={{flexGrow: 1}} className="lflex--y-axis">
                        <div className="t-lead t-lead-24">{themes[themeColor].title}</div>
                        <div className="inputs-container lflex lflex--y-axis">
                            <Form.Checkbox
                                name="main"
                                text="Need all checks"
                                checked={checked}
                                onChange={() => setChecked(!checked)}
                            />

                            <Form.CheckboxGroup text="all items" name="checkboxGroup">
                                {(Checkbox) => (
                                    <>
                                        <Checkbox text="1" />
                                    </>
                                )}
                            </Form.CheckboxGroup>
                            {/*<Form.Checkbox text="Text" caption="Caption" value={checked} onChange={handleChange} />*/}
                            {/*<Form.Checkbox text="Text" caption="Caption" disabled />*/}
                            {/*<Form.Checkbox text="Text" caption="Caption" disabled checked={true} />*/}
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

export const CheckboxField: IStorybookComponent = () => {
    return (
        <>
            <StoryTitle>Formik intergations</StoryTitle>
            <Formik
                initialValues={{
                    interest: [],
                    lastName: '',
                    firstName: '',
                    isFirstActive: false,
                    isSecondActive: false,
                }}
                validate={(values) => {
                    if (values.firstName.match(/[0-9]+/g)) {
                        return {
                            firstName: 'Имя не может содержать цифры',
                        };
                    }
                    if (values.lastName.match(/[0-9]+/g)) {
                        return {
                            lastName: 'Фамилия не может содержать цифры',
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
                        <div className="lflex lflex--y-axis">
                            <Form.CheckboxField name="isFirstActive" text="isFirstActive" />
                            <Form.CheckboxField name="isSecondActive" text="isSecondActive" />
                            <Form.CheckboxField name="interest" text="Dogs" value="dogs" />
                            <Form.CheckboxField name="interest" text="Cats" value="cats" />
                            <div className="lbrick-1" />
                            <Form.TextField name="lastName" type="text" placeholder="Введите Фамилию" />
                            <div className="lbrick-1" />
                            <Form.TextField name="firstName" type="text" placeholder="Введите Имя" />
                            <div className="lbrick-1" />
                            <Button type="submit">Submit</Button>
                        </div>
                    </FormikForm>
                )}
            </Formik>
        </>
    );
};
