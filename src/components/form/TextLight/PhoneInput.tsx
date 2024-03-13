import React from 'react';
import {Mask, useMask} from '../../../services/hooks';

export type IPhoneInputProps = {
    mask?: string | Mask;
    maskPlaceholder?: string;
    setValue?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const PhoneInput = React.forwardRef<HTMLInputElement, IPhoneInputProps>(
    (
        {
            maskPlaceholder = '',
            mask = '+7 (###) ### ## ##',
            value = '',
            setValue,
            type = 'phone',
            prefix = '',
            onBlur,
            onFocus,
            ...props
        },
        ref,
    ) => {
        const inputProps = useMask({
            value: value as string,
            onChange: setValue,
            mask,
            maskPlaceholder,
            type,
            prefix,
            onBlur,
            onFocus,
        });
        return <input inputMode="tel" ref={ref} {...props} {...inputProps} />;
    },
);
