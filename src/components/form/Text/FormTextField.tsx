import React, {FC} from 'react';
import {FormText} from './index';
import {useField, FieldHookConfig} from 'formik';
import {IFormTextProps} from './FormText.types';

export const FormTextField: FC<IFormTextProps & FieldHookConfig<string>> = (props) => {
    const [field, meta] = useField(props);

    return <FormText {...field} {...meta} {...props} />;
};