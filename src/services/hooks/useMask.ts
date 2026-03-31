import {
    KeyboardEvent,
    ChangeEvent,
    FocusEvent,
    MouseEvent,
    useMemo,
    useState,
    FocusEventHandler,
    FormEvent,
    ClipboardEvent,
} from 'react';

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
    onClick: (e: MouseEvent<HTMLInputElement>) => void;
    onBeforeInput: (e: FormEvent<HTMLInputElement>) => void;
    onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
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

    const firstPatternIndex = useMemo(
        () => parsedMask.findIndex((characterOrPattern) => characterOrPattern instanceof RegExp),
        [parsedMask],
    );

    function clampPhoneCaret(input: HTMLInputElement) {
        if (!isPhoneType) return;
        if (input.selectionStart == null) return;

        const minPosition = firstPatternIndex === -1 ? 0 : firstPatternIndex;
        const start = input.selectionStart;
        const end = input.selectionEnd ?? start;
        const hasRangeSelection = start !== end;

        if (hasRangeSelection) {
            return;
        }

        if (start < minPosition || end < minPosition) {
            const newPos = Math.max(minPosition, start, end);
            setCursorPositionForElement(input, newPos);
        }
    }

    const maskPatternsCount = useMemo(
        () => parsedMask.filter((characterOrPattern) => characterOrPattern instanceof RegExp).length,
        [parsedMask],
    );
    const maskPatterns = useMemo(
        () => parsedMask.filter((characterOrPattern): characterOrPattern is RegExp => characterOrPattern instanceof RegExp),
        [parsedMask],
    );

    function hasRangeSelection(input: HTMLInputElement): boolean {
        return input.selectionStart != null && input.selectionEnd != null && input.selectionStart !== input.selectionEnd;
    }

    function canApplyInsertedText(text: string): boolean {
        if (!text.length) {
            return true;
        }

        return [...text].some((character) => maskPatterns.some((pattern) => pattern.test(character)));
    }

    function onBeforeInput(event: FormEvent<HTMLInputElement>) {
        const input = event.currentTarget;
        const nativeEvent = event.nativeEvent as InputEvent;
        const insertedText = nativeEvent.data ?? '';

        if (!insertedText) {
            return;
        }

        if (!canApplyInsertedText(insertedText)) {
            event.preventDefault();
            if (hasRangeSelection(input)) {
                const cursorPosition = input.selectionEnd ?? input.selectionStart ?? 0;
                setCursorPositionForElement(input, cursorPosition);
            }
        }
    }

    function onPaste(event: ClipboardEvent<HTMLInputElement>) {
        const input = event.currentTarget;
        const pastedText = event.clipboardData.getData('text');

        if (!pastedText) {
            return;
        }

        if (!canApplyInsertedText(pastedText)) {
            event.preventDefault();
            if (hasRangeSelection(input)) {
                const cursorPosition = input.selectionEnd ?? input.selectionStart ?? 0;
                setCursorPositionForElement(input, cursorPosition);
            }
        }
    }

    // Using an onChange instead of keyboard events because mobile devices don't fire key events
    function handleChange({target}: ChangeEvent<HTMLInputElement>) {
        const input = target as HTMLInputElement;

        // для ввода кода (####):
        // просто берём все цифры из инпута, обрезаем по длине маски и отдаём наружу.
        if (type === 'code') {
            const digits = input.value.replace(/\D+/g, '');
            const limitedDigits = maskPatternsCount ? digits.slice(0, maskPatternsCount) : digits;
            onChange?.(limitedDigits);

            const cursorPositionAfterChange = input.selectionStart ?? lastCursorPosition;
            scheduleAfterRender(() => {
                setCursorPositionForElement(input, cursorPositionAfterChange);
            });

            return;
        }

        let digitsBeforeCaret = 0;
        if (isPhoneType) {
            const caretPosition = input.selectionStart ?? input.value.length;
            digitsBeforeCaret = input.value.slice(0, caretPosition).replace(/\D+/g, '').length;
        }

        const newValue = getNewValue({
            inputValue: input.value,
            mask: parsedMask,
            isPhoneMode: isPhoneType,
            prefix,
        });
        const newValueWithPrefix = newValue && isPhoneType ? `${prefix || '+7'}${newValue}` : newValue;
        onChange?.(newValueWithPrefix);

        if (isPhoneType) {
            const digitsBeforeCaretSnapshot = digitsBeforeCaret;

            scheduleAfterRender(() => {
                const maskedAfterChange = getMaskedValue(newValue, parsedMask, placeholder);

                const minPosition = firstPatternIndex === -1 ? 0 : firstPatternIndex;
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

                // Не позволяем курсору заходить в префикс (+7 и т.п.)
                setCursorPositionForElement(input, Math.max(minPosition, newCaretPosition));
            });
        } else {
            const caretPosition = input.selectionStart ?? input.value.length;
            const valueCharsBeforeCaret = countValueCharsBeforeCaret(input.value, caretPosition, parsedMask);

            // onChange is asynchronous so update cursor after it re-renders
            scheduleAfterRender(() => {
                const maskedAfterChange = getMaskedValue(newValue, parsedMask, placeholder);
                const patterns = parsedMask.filter((item): item is RegExp => item instanceof RegExp);

                let cursorPositionAfterChange = maskedAfterChange.length;

                if (valueCharsBeforeCaret > 0) {
                    let matchedValueChars = 0;
                    for (let index = 0; index < maskedAfterChange.length; index++) {
                        const currentPattern = patterns[matchedValueChars];
                        if (!currentPattern) break;

                        if (currentPattern.test(maskedAfterChange.charAt(index))) {
                            matchedValueChars += 1;
                            if (matchedValueChars === valueCharsBeforeCaret) {
                                cursorPositionAfterChange = index + 1;
                                break;
                            }
                        }
                    }
                } else {
                    cursorPositionAfterChange = 0;
                }

                setCursorPositionForElement(input, cursorPositionAfterChange);
            });
        }
    }

    // For some reason, tests fail without this...
    // TODO: Figure out why this is necessary
    function onKeyUp({target}: KeyboardEvent<HTMLInputElement>) {
        const input = target as HTMLInputElement;

        if (isPhoneType) {
            clampPhoneCaret(input);
        }
    }

    function onKeyDown({target}: KeyboardEvent<HTMLInputElement>) {
        const input = target as HTMLInputElement;

        if (input && (eventIsSpaceKey(arguments[0] as KeyboardEvent<HTMLInputElement>))) {
            (arguments[0] as KeyboardEvent<HTMLInputElement>).preventDefault();
            if (hasRangeSelection(input)) {
                const cursorPosition = input.selectionEnd ?? input.selectionStart ?? 0;
                setCursorPositionForElement(input, cursorPosition);
            }
            return;
        }

        if (isPhoneType) {
            clampPhoneCaret(input);
        }
    }

    function eventIsSpaceKey(event: KeyboardEvent<HTMLInputElement>): boolean {
        return event.key === ' ' || event.code === 'Space';
    }

    function onFocus(event: FocusEvent<HTMLInputElement>) {
        props?.onFocus?.(event);

        setFocus(true);
        // Work around in chrome to make sure focus sets cursor position

        requestAnimationFrame(() => {
            const input = event.target as HTMLInputElement;

            if (isPhoneType) {
                clampPhoneCaret(input);
            }
        });
    }

    function onClick({target}: MouseEvent<HTMLInputElement>) {
        if (!isPhoneType) return;

        const input = target as HTMLInputElement;
        clampPhoneCaret(input);
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
        onClick,
        onBeforeInput,
        onPaste,
    };
}

function countValueCharsBeforeCaret(inputValue: string, caretPosition: number, mask: Mask): number {
    const patterns = mask.filter((item): item is RegExp => item instanceof RegExp);
    let valueCharsCount = 0;

    for (const char of inputValue.slice(0, caretPosition)) {
        const currentPattern = patterns[valueCharsCount];
        if (!currentPattern) {
            break;
        }

        if (currentPattern.test(char)) {
            valueCharsCount += 1;
        }
    }

    return valueCharsCount;
}
