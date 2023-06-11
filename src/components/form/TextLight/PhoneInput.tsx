import React from 'react';
import {IFormPhoneInputLightProps} from './TextLight.types';
import {useMask} from '../../../services/hooks';

export const PhoneInput = React.forwardRef<HTMLInputElement, IFormPhoneInputLightProps>(
    ({maskPlaceholder = '+7', mask = '+7 (###) ### ## ##', value = '', setValue, ...props}, ref) => {
        const inputProps = useMask({
            value: value as string,
            // @ts-ignore
            onChange: setValue,
            mask,
            maskPlaceholder,
        });
        return <input inputMode="tel" ref={ref} {...inputProps} {...props} />;
    },
);
