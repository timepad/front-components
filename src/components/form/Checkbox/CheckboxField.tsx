import React, {FC} from 'react';
import {Checkbox} from './index';
import {FieldHookConfig, useField} from 'formik';
import {ICheckboxProps} from './Checkbox.types';

export const CheckboxField: FC<ICheckboxProps & FieldHookConfig<boolean>> = (props) => {
    const [field, meta] = useField(props);
    const tmpChecked = Array.isArray(field.value) ? field.value.includes(props.value) : props.checked || field.value;

    return <Checkbox {...field} error={meta?.error} {...props} checked={props.checked || tmpChecked} />;
};
