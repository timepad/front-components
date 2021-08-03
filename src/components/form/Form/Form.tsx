import React, {FC} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import './cform.less';
import {FormText, FormTextField} from '../Text';
import {TextLight, TextLightField} from '../TextLight';
import {Checkbox, CheckboxField} from '../Checkbox';
import {FormRadio, FormRadioField} from '../Radio';
import {FormSelect} from '../Select/FormSelect';

export interface IFormProps
    extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

export const Form: FC<IFormProps> & {
    Text: typeof FormText;
    TextField: typeof FormTextField;
    TextLight: typeof TextLight;
    TextLightField: typeof TextLightField;
    Checkbox: typeof Checkbox;
    CheckboxField: typeof CheckboxField;
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
Form.TextLight = TextLight;
Form.TextLightField = TextLightField;
Form.Checkbox = Checkbox;
Form.CheckboxField = CheckboxField;
Form.Radio = FormRadio;
Form.RadioField = FormRadioField;
Form.Select = FormSelect;
