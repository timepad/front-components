import {KeyboardEvent, ChangeEvent, FocusEvent, useMemo, useState, FocusEventHandler} from 'react';

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
    prefix?: string;
    onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
    onFocus?: FocusEventHandler<HTMLInputElement> | undefined;
}

/**
 * Props you need to spread onto your input.
 */
interface IMaskInputProps {
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

export function useMask({
    value = '',
    onChange,
    mask,
    maskPlaceholder,
    type,
    prefix = '',
    ...props
}: IMaskProps): IMaskInputProps {
    const [focus, setFocus] = useState(false);

    const parsedMask = useMemo(() => parseMask(mask), [mask]);
    const placeholder = useMemo(
        () => getPlaceholderFromMask(parsedMask, maskPlaceholder),
        [parsedMask, maskPlaceholder],
    );

    const isPhoneType = type === 'phone';
    const formattedValueByType = isPhoneType ? getFormattedPhone(value, prefix) : value;

    const maskedValue = getMaskedValue(formattedValueByType, parsedMask, placeholder);
    const lastCursorPosition = getNextCursorPosition(formattedValueByType, parsedMask);
    const scheduleAfterRender = useCallbackAfterRender();

    // Using an onChange instead of keyboard events because mobile devices don't fire key events
    function handleChange({target}: ChangeEvent<HTMLInputElement>) {
        const input = target as HTMLInputElement;

        let digitsBeforeCaret = 0;
        if (isPhoneType) {
            const caretPosition = input.selectionStart ?? input.value.length;
            digitsBeforeCaret = input.value.slice(0, caretPosition).replace(/\D+/g, '').length;
        }

        const newValue = getNewValue({
            inputValue: input.value,
            maskedValue,
            oldValue: formattedValueByType,
            mask: parsedMask,
            lastCursorPosition,
            isPhoneMode: isPhoneType,
            prefix,
        });
        const newValueWithPrefix = newValue && isPhoneType ? `${prefix || '+7'}${newValue}` : newValue;
        onChange?.(newValueWithPrefix);

        if (isPhoneType) {
            const digitsBeforeCaretSnapshot = digitsBeforeCaret;

            scheduleAfterRender(() => {
                const maskedAfterChange = getMaskedValue(newValue, parsedMask, placeholder);

                let newCaretPosition = maskedAfterChange.length;

                if (digitsBeforeCaretSnapshot === 0) {
                    const firstDigitIndex = maskedAfterChange.search(/\d/);
                    newCaretPosition = firstDigitIndex > -1 ? firstDigitIndex : 0;
                } else {
                    let digitsSeen = 0;
                    for (let index = 0; index < maskedAfterChange.length; index++) {
                        if (/\d/.test(maskedAfterChange.charAt(index))) {
                            digitsSeen++;
                            if (digitsSeen === digitsBeforeCaretSnapshot) {
                                newCaretPosition = index + 1;
                                break;
                            }
                        }
                    }
                }

                setCursorPositionForElement(input, newCaretPosition);
            });
        } else {
            const cursorPositionAfterChange = input.selectionStart ?? lastCursorPosition;

            // onChange is asynchronous so update cursor after it re-renders
            scheduleAfterRender(() => {
                setCursorPositionForElement(input, cursorPositionAfterChange);
            });
        }
    }

    // For some reason, tests fail without this...
    // TODO: Figure out why this is necessary
    function onKeyUp({target}: KeyboardEvent<HTMLInputElement>) {
        if (isPhoneType) return;

        const input = target as HTMLInputElement;

        if (input.selectionStart == null) {
            setCursorPositionForElement(input, lastCursorPosition);
        }
    }

    function onKeyDown({target}: KeyboardEvent<HTMLInputElement>) {
        if (isPhoneType) return;

        const input = target as HTMLInputElement;

        if (input.selectionStart == null) {
            setCursorPositionForElement(input, lastCursorPosition);
        }
    }

    function onFocus(event: FocusEvent<HTMLInputElement>) {
        props?.onFocus?.(event);

        setFocus(true);
        // Work around in chrome to make sure focus sets cursor position

        requestAnimationFrame(() => {
            setCursorPositionForElement(event.target as HTMLInputElement, lastCursorPosition);
        });
    }

    function onBlur(event: FocusEvent<HTMLInputElement>) {
        props?.onBlur?.(event);

        setFocus(false);
        // Work around in chrome to make sure focus sets cursor position
    }

    const placeholderValue = maskPlaceholder ? placeholder : prefix;
    const emptyValue = focus && isPhoneType ? placeholderValue : '';

    return {
        'data-value': value.length ? value : undefined,
        value: value.length ? maskedValue : emptyValue,
        placeholder: placeholderValue,

        onChange: handleChange,
        onKeyDown,
        onKeyUp,
        onFocus,
        onBlur,
    };
}
