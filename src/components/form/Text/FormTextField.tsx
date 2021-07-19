import React, {FC} from 'react';
import {FormText} from './index';
import {useField, FieldHookConfig} from 'formik';

interface IFormTextFieldProps extends T {}

type T = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export const FormTextField: FC<IFormTextFieldProps & FieldHookConfig<string>> = (
    props: IFormTextFieldProps & FieldHookConfig<string>,
) => {
    const [field, meta, helpers] = useField(props);

    return <FormText {...field} {...meta} {...helpers} {...props} />;
};
