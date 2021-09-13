import React, {FC} from 'react';
import {Text, TextField} from '../Text';
import {TextLight, TextLightField} from '../TextLight';
import {Checkbox, CheckboxField} from '../Checkbox';
import {Radio, RadioField} from '../Radio';

export interface IFormProps
    extends React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

export const NewForm: FC<IFormProps> & {
    Text: typeof Text;
    TextField: typeof TextField;
    TextLight: typeof TextLight;
    TextLightField: typeof TextLightField;
    Checkbox: typeof Checkbox;
    CheckboxField: typeof CheckboxField;
    Radio: typeof Radio;
    RadioField: typeof RadioField;
} = (props) => {
    return <form {...props}>{props.children}</form>;
};

NewForm.Text = Text;
NewForm.TextField = TextField;
NewForm.TextLight = TextLight;
NewForm.TextLightField = TextLightField;
NewForm.Checkbox = Checkbox;
NewForm.CheckboxField = CheckboxField;
NewForm.Radio = Radio;
NewForm.RadioField = RadioField;
