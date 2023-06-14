import React from 'react';
import {ITextLightProps} from './TextLight.types';
import {Textarea} from '../Textarea';
import {PhoneInput} from './PhoneInput';
import {ITextareaProps} from '../Textarea/Textarea';

export const Input: React.FC<Omit<ITextLightProps, 'error' | 'caption' | 'customIcon' | 'success'>> = ({
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
        return <Textarea value={value} ref={textareaRef} {...(props as ITextareaProps)} />;
    }
    if (!multiline && (props as React.InputHTMLAttributes<HTMLInputElement>).type === 'phone') {
        return (
            <PhoneInput
                value={value}
                mask={mask}
                maskPlaceholder={maskPlaceholder}
                setValue={setValue}
                ref={inputRef}
                {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
            />
        );
    }
    return <input value={value} ref={inputRef} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />;
};
