import React, {FC} from 'react';
import {FormRadio} from './FormRadio';
import {FieldHookConfig, useField} from 'formik';
import {IFormRadioProps} from './FormRadio.types';

export const FormRadioField: FC<IFormRadioProps & FieldHookConfig<boolean>> = (props) => {
    const [field, meta, helpers] = useField(props);

    const tmpChecked =
        typeof field.value === 'object'
            ? (field.value as Array<string>).includes(props.value)
            : props.checked || field.value;

    return <FormRadio {...field} {...meta} {...helpers} {...props} checked={tmpChecked} />;
};
