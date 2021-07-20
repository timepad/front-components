import React, {FC, PropsWithChildren} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import './cform.less';
import {FormText, FormTextField} from '../Text';
import {FormTextLight, FormTextLightField} from '../TextLight';
import {FormCheckbox, FormCheckboxField} from '../Checkbox';

export interface IFormProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>> {
    variant?: 'white';
}

export const Form: FC<IFormProps> & {
    Text: typeof FormText;
    TextField: typeof FormTextField;
    TextLight: typeof FormTextLight;
    TextLightField: typeof FormTextLightField;
    Checkbox: typeof FormCheckbox;
    CheckboxField: typeof FormCheckboxField;
} = (props) => {
    const formClassName = cx(
        component('form')({
            white: props.variant === 'white',
        }),
        props.className,
    );

    return (
        <form {...props} className={formClassName}>
            {props.children}
        </form>
    );
};

Form.Text = FormText;
Form.TextField = FormTextField;
Form.TextLight = FormTextLight;
Form.TextLightField = FormTextLightField;
Form.Checkbox = FormCheckbox;
Form.CheckboxField = FormCheckboxField;
