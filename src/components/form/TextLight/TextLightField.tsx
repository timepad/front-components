import React, {FC} from 'react';
import {TextLight} from './index';
import {useField, FieldHookConfig} from 'formik';
import {ITextLightProps} from './TextLight.types';

export const TextLightField: FC<ITextLightProps & FieldHookConfig<string>> = (props) => {
    const [field, meta, helpers] = useField(props);

    return <TextLight {...field} error={meta?.error} setValue={helpers?.setValue} {...props} />;
};
