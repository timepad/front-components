import React, {FC} from 'react';
import {Radio} from './Radio';
import {FieldHookConfig, useField} from 'formik';
import {IFormRadioProps} from './Radio.types';

export const RadioField: FC<React.PropsWithChildren<IFormRadioProps & FieldHookConfig<boolean>>> = (props) => {
    const [field, meta, helpers] = useField(props);

    const tmpChecked =
        typeof field.value === 'object'
            ? (field.value as Array<string>).includes(props.value)
            : props.checked || field.value;

    return <Radio {...field} {...meta} {...helpers} {...props} checked={tmpChecked} />;
};
