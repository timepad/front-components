import React, {FC} from 'react';
import {FormTextLight} from './index';
import {useField, FieldHookConfig} from 'formik';
import {IFormTextLightProps} from './FormTextLight.types';

export const FormTextLightField: FC<IFormTextLightProps & FieldHookConfig<string>> = (props) => {
    const [field, meta] = useField(props);

    return <FormTextLight {...field} {...meta} {...props} />;
};
