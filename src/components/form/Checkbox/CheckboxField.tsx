import React, {FC} from 'react';
import {Checkbox} from './index';
import {FieldHookConfig, useField} from 'formik';
import {IDefaultCheckboxProps} from './Checkbox.types';

export const CheckboxField: FC<IDefaultCheckboxProps & FieldHookConfig<boolean>> = (props) => {
    const {name, validate, type, multiple, value} = props;
    const [field, meta, helpers] = useField({name, validate, type, multiple, value});
    const tmpChecked = Array.isArray(field.value) ? field.value.includes(props.value) : props.checked || field.value;

    return (
        <Checkbox rounded={false} {...field} {...meta} {...helpers} {...props} checked={props.checked || tmpChecked} />
    );
};
