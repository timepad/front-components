import React, {FC} from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import {Text, TextField} from '../Text';
import {TextLight, TextLightField} from '../TextLight';
import {Checkbox, CheckboxField} from '../Checkbox';
import {Radio, RadioField} from '../Radio';

export interface IFormProps
    extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

export const Form: FC<IFormProps> & {
    Text: typeof Text;
    TextField: typeof TextField;
    TextLight: typeof TextLight;
    TextLightField: typeof TextLightField;
    Checkbox: typeof Checkbox;
    CheckboxField: typeof CheckboxField;
    Radio: typeof Radio;
    RadioField: typeof RadioField;
} = (props) => {
    const formClassName = cx(component('form')(), props.className);

    return (
        <form {...props} className={formClassName}>
            {props.children}
        </form>
    );
};

Form.Text = Text;
Form.TextField = TextField;
Form.TextLight = TextLight;
Form.TextLightField = TextLightField;
Form.Checkbox = Checkbox;
Form.CheckboxField = CheckboxField;
Form.Radio = Radio;
Form.RadioField = RadioField;
