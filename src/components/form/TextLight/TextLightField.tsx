import React, {FC} from 'react';
import {TextLight} from './index';
import {useField, FieldHookConfig} from 'formik';
import {IFormTextLightProps} from './TextLight.types';

export const TextLightField: FC<React.PropsWithChildren<IFormTextLightProps & FieldHookConfig<string>>> = (props) => {
    const [field, meta] = useField(props);

    return <TextLight {...field} {...meta} {...props} />;
};
