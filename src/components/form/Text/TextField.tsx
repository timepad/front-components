import React, {FC} from 'react';
import {Text} from './Text';
import {useField, FieldHookConfig} from 'formik';
import {ITextProps} from './Text.types';

export const TextField: FC<ITextProps & FieldHookConfig<string>> = (props) => {
    const [field, meta] = useField(props);

    return <Text {...field} error={meta?.error} {...props} />;
};
