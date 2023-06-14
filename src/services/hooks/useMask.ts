import {KeyboardEvent, ChangeEvent, FocusEvent, useMemo, useState} from 'react';

import {useCallbackAfterRender} from './useCallbackAfterRender';
import {
    getMaskedValue,
    getNewValue,
    getNextCursorPosition,
    getPlaceholderFromMask,
    parseMask,
    setCursorPositionForElement,
} from '../helpers/maskHelpers';
import {getFormattedPhone} from '../helpers/maskHelpers/getFormattedPhone';

/**
 * Props you need to pass to useMask()
 */
interface IMaskProps {
    value: string;
    onChange?: (value: string) => void;
    mask: string | Mask;
    maskPlaceholder: string;
    type?: 'phone' | 'card' | string;
}

/**
 * Props you need to spread onto your input.
 */
interface IInputProps {
    'data-value'?: string;
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
    onFocus: (e: FocusEvent<HTMLInputElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
}

export type Mask = Array<string | RegExp>;

export function useMask({value = '', onChange, mask, maskPlaceholder, type}: IMaskProps): IInputProps {
    const prefix = '+7';
    const [focus, setFocus] = useState(false);

    const parsedMask = useMemo(() => parseMask(mask), [mask]);
    const placeholder = useMemo(
        () => getPlaceholderFromMask(parsedMask, maskPlaceholder),
        [parsedMask, maskPlaceholder],
    );

    const isPhoneType = type === 'phone';
    const formattedValueByType = isPhoneType ? getFormattedPhone(value) : value;

    const maskedValue = getMaskedValue(formattedValueByType, parsedMask, placeholder);
    const lastCursorPosition = getNextCursorPosition(formattedValueByType, parsedMask);
    const scheduleAfterRender = useCallbackAfterRender();

    // Using an onChange instead of keyboard events because mobile devices don't fire key events
    function handleChange({target}: ChangeEvent<HTMLInputElement>) {
        console.log({target: target.value, formattedValueByType, placeholder, maskedValue});
        const newValue = getNewValue({
            inputValue: target.value,
            maskedValue,
            oldValue: formattedValueByType,
            mask: parsedMask,
            lastCursorPosition,
            inputMode: target.inputMode,
        });
        const newValueWithPrefix = newValue && isPhoneType ? `${prefix}${newValue}` : newValue;
        onChange?.(newValueWithPrefix);

        // onChange is asynchronous so update cursor after it re-renders
        scheduleAfterRender(() => {
            setCursorPositionForElement(target, getNextCursorPosition(newValue, parsedMask));
        });
    }

    // For some reason, tests fail without this...
    // TODO: Figure out why this is necessary
    function onKeyUp({target}: KeyboardEvent<HTMLInputElement>) {
        setCursorPositionForElement(target as HTMLInputElement, lastCursorPosition);
    }

    function onKeyDown({target}: KeyboardEvent<HTMLInputElement>) {
        // make sure cursor is positioned correctly before input happens
        // or else the character might not be in the right position
        setCursorPositionForElement(target as HTMLInputElement, lastCursorPosition);
    }

    function onFocus({target}: FocusEvent<HTMLInputElement>) {
        setFocus(true);
        // Work around in chrome to make sure focus sets cursor position

        requestAnimationFrame(() => {
            setCursorPositionForElement(target as HTMLInputElement, getNextCursorPosition(target.value, parsedMask));
        });
    }

    function onBlur({target}: FocusEvent<HTMLInputElement>) {
        setFocus(false);
        // Work around in chrome to make sure focus sets cursor position

        requestAnimationFrame(() => {
            setCursorPositionForElement(target as HTMLInputElement, getNextCursorPosition(target.value, parsedMask));
        });
    }

    return {
        'data-value': value.length ? value : undefined,
        value: value.length ? maskedValue : focus && isPhoneType ? placeholder : '',
        placeholder,

        onChange: handleChange,
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur,
    };
}
