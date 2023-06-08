import {KeyboardEvent, ChangeEvent, FocusEvent, useMemo} from 'react';

import {useCallbackAfterRender} from './useCallbackAfterRender';
import {
    getMaskedValue,
    getNewValue,
    getNextCursorPosition,
    getPlaceholderFromMask,
    parseMask,
    setCursorPositionForElement,
} from '../helpers/maskHelpers';

/**
 * Props you need to pass to useMask()
 */
interface IMaskProps {
    value: string;
    onChange: (value: string) => void;
    mask: string | Mask;
    maskPlaceholder: string;
}

/**
 * Props you need to spread onto your input.
 */
export interface IInputProps {
    'data-value'?: string;
    value: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    onKeyUp: (e: KeyboardEvent<HTMLInputElement>) => void;
    onFocus: (e: FocusEvent<HTMLInputElement>) => void;
}

export type Mask = Array<string | RegExp>;

export function useMask({value = '', onChange, ...props}: IMaskProps): IInputProps {
    const mask = useMemo(() => parseMask(props.mask), [props.mask]);
    const placeholder = useMemo(
        () => getPlaceholderFromMask(mask, props.maskPlaceholder),
        [mask, props.maskPlaceholder],
    );
    const maskedValue = getMaskedValue(value, mask, placeholder);

    const lastCursorPosition = getNextCursorPosition(value, mask);
    const scheduleAfterRender = useCallbackAfterRender();

    // Using an onChange instead of keyboard events because mobile devices don't fire key events
    function handleChange({target}: ChangeEvent<HTMLInputElement>) {
        const newValue = getNewValue({
            inputValue: target.value,
            maskedValue,
            oldValue: value,
            mask,
            lastCursorPosition,
            inputMode: target.inputMode,
        });

        onChange(newValue);

        // onChange is asynchronous so update cursor after it re-renders
        scheduleAfterRender(() => {
            setCursorPositionForElement(target, getNextCursorPosition(newValue, mask));
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
        // Work around in chrome to make sure focus sets cursor position

        requestAnimationFrame(() => {
            setCursorPositionForElement(target as HTMLInputElement, getNextCursorPosition(target.value, mask));
        });
    }

    return {
        'data-value': value.length ? value : undefined,
        value: value.length ? maskedValue : '',
        placeholder,

        onChange: handleChange,
        onKeyDown,
        onKeyUp,
        onFocus,
    };
}
