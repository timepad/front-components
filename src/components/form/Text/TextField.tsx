import React, {FC} from 'react';
import {Text} from './Text';
import {useField, FieldHookConfig} from 'formik';
import {IFormTextProps} from './Text.types';

export const TextField: FC<React.PropsWithChildren<IFormTextProps & FieldHookConfig<string>>> = (props) => {
    const [field, meta] = useField(props);

    return <Text {...field} {...meta} {...props} />;
};
