import React from 'react';
import {IFormInputProps} from './TextLight.types';
import {Textarea} from '../Textarea';
import {PhoneInput} from './PhoneInput';

export const Input: React.FC<IFormInputProps> = ({
    multiline,
    value = '',
    textareaRef,
    inputRef,
    setValue,
    mask,
    maskPlaceholder,
    ...props
}) => {
    if (multiline) {
        return <Textarea value={value} ref={textareaRef} {...props} />;
    }
    if (!multiline && props.type === 'phone') {
        return (
            <PhoneInput
                value={value}
                mask={mask}
                maskPlaceholder={maskPlaceholder}
                setValue={setValue}
                ref={inputRef}
                {...props}
            />
        );
    }
    return <input value={value} ref={inputRef} {...props} />;
};
