import React, {FC} from 'react';
import {FormCheckbox} from './index';
import {FieldHookConfig, useField} from 'formik';
import {IFormCheckboxProps} from './FormCheckbox.types';

export const FormCheckboxField: FC<IFormCheckboxProps & FieldHookConfig<boolean>> = (props) => {
    const [field, meta, helpers] = useField(props);

    const tmpChecked =
        typeof field.value === 'object'
            ? (field.value as Array<string>).includes(props.value)
            : props.checked || field.value;

    return <FormCheckbox {...field} {...meta} {...helpers} {...props} checked={tmpChecked} />;
};
