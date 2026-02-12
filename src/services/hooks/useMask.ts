import {ChangeEvent, FocusEvent, FocusEventHandler, KeyboardEvent, useMemo, useState} from 'react';

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
import {getCursorPosition} from '../helpers/maskHelpers/getCursorPosition';

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
    onMouseDown: (e: React.MouseEvent<HTMLInputElement>) => void;
    onSelect: (e: React.SyntheticEvent<HTMLInputElement>) => void;
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
    const scheduleAfterRender = useCallbackAfterRender();

    // Using an onChange instead of keyboard events because mobile devices don't fire key events
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const {target} = event;

        const inputType: string | undefined = (
            event as unknown as {
                nativeEvent?: {inputType?: string};
            }
        )?.nativeEvent?.inputType;

        const prevCursor = target.selectionStart ?? 0;

        const action: 'insert' | 'delete' | 'paste' | 'move' = (() => {
            if (typeof inputType !== 'string') return 'move';
            if (inputType === 'deleteContentBackward' || inputType === 'deleteContentForward') return 'delete';
            if (
                inputType === 'insertFromPaste' ||
                inputType === 'insertFromDrop' ||
                inputType === 'insertReplacementText'
            )
                return 'paste';
            if (inputType.startsWith('insert')) return 'insert';
            return 'move';
        })();

        const isForwardDelete = inputType === 'deleteContentForward';

        const isDelete = inputType === 'deleteContentBackward' || inputType === 'deleteContentForward';
        const caretForDelete = (() => {
            if (!isDelete) return prevCursor;
            let i = prevCursor;
            while (i > 0 && !(parsedMask[i] instanceof RegExp)) i -= 1;
            return i;
        })();

        const newValue = getNewValue({
            inputValue: target.value,
            maskedValue,
            oldValue: formattedValueByType,
            mask: parsedMask,
            isPhoneMode: isPhoneType,
            prefix,
            caretMaskIndex: caretForDelete,
            action,
            deleteDirection: isForwardDelete ? 'forward' : 'backward',
        });

        const newValueWithPrefix = newValue && isPhoneType ? `${prefix || '+7'}${newValue}` : newValue;

        onChange?.(newValueWithPrefix);

        scheduleAfterRender(() => {
            let cursorToSet = getCursorPosition({
                value: newValue,
                mask: parsedMask,
                currentCursor: prevCursor,
                action,
            });
            if (newValue.length === 0 && isPhoneType) {
                cursorToSet = prefix.length;
            } else if (action === 'insert' && newValue.length === 0) {
                cursorToSet = getNextCursorPosition(newValue, parsedMask);
            }

            setCursorPositionForElement(target, cursorToSet);
        });
    }

    // For some reason, tests fail without this...
    // TODO: Figure out why this is necessary
    function onKeyUp(e: KeyboardEvent<HTMLInputElement>) {
        void e;
    }

    function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        const target = e.target as HTMLInputElement;
        const currentPosition = target.selectionStart ?? 0;
        const prefixLength = isPhoneType ? (prefix || '+7').length : 0;

        if (e.key === 'ArrowLeft' && currentPosition <= prefixLength) {
            e.preventDefault();
            setCursorPositionForElement(target, prefixLength);
        } else if (e.key === 'Home') {
            e.preventDefault();
            setCursorPositionForElement(target, prefixLength);
        }
    }

    function onMouseDown(event: React.MouseEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        const prefixLength = isPhoneType ? (prefix || '+7').length : 0;

        if (event.detail <= 2) {
            const clickPosition = target.selectionStart ?? 0;
            if (clickPosition < prefixLength) {
                event.preventDefault();
                requestAnimationFrame(() => {
                    setCursorPositionForElement(target, prefixLength);
                });
            }
        }
    }

    function onSelectionChange(event: React.SyntheticEvent<HTMLInputElement>) {
        const target = event.target as HTMLInputElement;
        const currentPosition = target.selectionStart ?? 0;
        const prefixLength = isPhoneType ? (prefix || '+7').length : 0;

        if (currentPosition < prefixLength) {
            requestAnimationFrame(() => {
                setCursorPositionForElement(target, prefixLength);
            });
        }
    }

    function onFocus(event: FocusEvent<HTMLInputElement>) {
        props?.onFocus?.(event);

        setFocus(true);
        requestAnimationFrame(() => {
            setCursorPositionForElement(
                event.target as HTMLInputElement,
                getNextCursorPosition(formattedValueByType, parsedMask),
            );
        });
    }

    function onBlur(event: FocusEvent<HTMLInputElement>) {
        props?.onBlur?.(event);

        setFocus(false);
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
        onMouseDown,
        onSelect: onSelectionChange,
    };
}
