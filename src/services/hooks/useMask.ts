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

        // Capture cursor BEFORE value transformation
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

        // Align caret for delete: if caret stands on a literal, shift left to nearest digit slot
        const isDelete = inputType === 'deleteContentBackward' || inputType === 'deleteContentForward';
        const caretForDelete = (() => {
            if (!isDelete) return prevCursor;
            let i = prevCursor;
            // If on literal, move left to nearest pattern slot
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

        // Preserve caret strictly after the newly inserted digit (delete+insert friendly)
        scheduleAfterRender(() => {
            const actionLocal = action;

            // Prefer computing caret around the actual visual change point to avoid end fallbacks
            const prevMasked = maskedValue;
            const currentMasked = (target as HTMLInputElement).value;

            let diffIndex = -1;
            const minLen = Math.min(prevMasked.length, currentMasked.length);
            for (let i = 0; i < minLen; i += 1) {
                if (prevMasked.charAt(i) !== currentMasked.charAt(i)) {
                    diffIndex = i;
                    break;
                }
            }
            if (diffIndex === -1) {
                diffIndex = minLen;
            }

            // Find closest pattern slot at/after diff index
            const findPatternAtOrAfter = (start: number): number => {
                for (let i = Math.max(0, start); i < parsedMask.length; i += 1) {
                    if (parsedMask[i] instanceof RegExp) return i;
                }
                return parsedMask.length - 1;
            };

            let desiredCursor = findPatternAtOrAfter(diffIndex);
            if (actionLocal === 'insert' || actionLocal === 'paste') {
                desiredCursor = Math.min(desiredCursor + 1, currentMasked.length);
            }
            // Forward delete should keep caret at the same logical slot (not jump left)
            if (actionLocal === 'delete' && inputType === 'deleteContentForward') {
                desiredCursor = prevCursor;
            }
            // Backward delete from a literal should place caret at previous pattern slot
            if (actionLocal === 'delete' && inputType === 'deleteContentBackward') {
                let i = prevCursor;
                if (!(parsedMask[i] instanceof RegExp)) i -= 1;
                while (i > 0 && !(parsedMask[i] instanceof RegExp)) i -= 1;
                if (i >= 0) desiredCursor = i;
            }

            // Fallback to computed helper if something goes off-path
            if (Number.isNaN(desiredCursor) || desiredCursor < 0) {
                desiredCursor = getCursorPosition({
                    value: newValue,
                    mask: parsedMask,
                    currentCursor: prevCursor,
                    action: actionLocal,
                });
            }

            setCursorPositionForElement(target, desiredCursor);
        });
    }

    // For some reason, tests fail without this...
    // TODO: Figure out why this is necessary
    function onKeyUp(e: KeyboardEvent<HTMLInputElement>) {
        // keep caret; no-op to satisfy linter
        void e;
    }

    function onKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        // keep caret; no-op to satisfy linter
        void e;
    }

    function onFocus(event: FocusEvent<HTMLInputElement>) {
        props?.onFocus?.(event);

        setFocus(true);
        // On focus, move caret to first empty slot for faster entry
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
