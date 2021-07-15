import React, {FC} from 'react';
import {FormTextLight} from './index';
import {useField, FieldHookConfig} from 'formik';

interface IFormTextLightFieldProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const FormTextLightField: FC<IFormTextLightFieldProps & FieldHookConfig<string>> = (
    props: IFormTextLightFieldProps & FieldHookConfig<string>,
) => {
    const [field, meta, helpers] = useField(props);
    // console.log(field, meta, helpers);
    return <FormTextLight {...field} {...meta} {...helpers} {...props} />;
};
