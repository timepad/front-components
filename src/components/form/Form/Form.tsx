import React, {FC, PropsWithChildren} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import './cform.less';
import {FormText, FormTextField} from '../Text';
import {FormTextLight, FormTextLightField} from '../TextLight';
import {FormCheckbox, FormCheckboxField} from '../Checkbox';
import {FormRadio, FormRadioField} from '../Radio';
import {FormSelect} from '../Select/FormSelect';

export interface IFormProps
    extends PropsWithChildren<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>> {
    // variant?: 'white';
}

export const Form: FC<IFormProps> & {
    Text: typeof FormText;
    TextField: typeof FormTextField;
    TextLight: typeof FormTextLight;
    TextLightField: typeof FormTextLightField;
    Checkbox: typeof FormCheckbox;
    CheckboxField: typeof FormCheckboxField;
    Radio: typeof FormRadio;
    RadioField: typeof FormRadioField;
    Select: typeof FormSelect;
} = (props) => {
    const formClassName = cx(component('form')(), props.className);

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
Form.Radio = FormRadio;
Form.RadioField = FormRadioField;
Form.Select = FormSelect;
