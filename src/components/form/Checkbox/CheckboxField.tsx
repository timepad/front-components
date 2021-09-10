import React, {FC} from 'react';
import {Checkbox} from './index';
import {FieldHookConfig, useField} from 'formik';
import {ICheckboxProps} from './Checkbox.types';

export const CheckboxField: FC<ICheckboxProps & FieldHookConfig<boolean>> = (props) => {
    const {name, validate, type, multiple, value} = props;
    const [field, meta, helpers] = useField({name, validate, type, multiple, value});
    const tmpChecked = Array.isArray(field.value) ? field.value.includes(props.value) : props.checked || field.value;

    return <Checkbox {...field} {...meta} {...helpers} {...props} checked={props.checked || tmpChecked} />;
};
