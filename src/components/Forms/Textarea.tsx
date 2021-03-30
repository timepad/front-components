import * as React from 'react';
import {useRef, useState, useEffect, useCallback} from 'react';
import {component} from '../../services/helpers/classHelpers';

import CheckSvg from '../../assets/svg/16/icon-check-16.svg';

enum State {
    disabled = 'disabled',
    active = 'active',
    error = 'error',
    success = 'success',
    idle = 'idle',
}

interface ITextareaProps {
    name?: string;
    label?: string;
    value?: string;
    error?: string;
    disabled?: boolean;
    success?: boolean;
    autoFocus?: boolean;
    onChangeHandler?: (name: string, value: string) => void;
    onBlurHandler?: (event: React.FormEvent<HTMLTextAreaElement>) => void;
    onStateChange?: (state: State) => void;
    onErrorTruncation?: (truncated: boolean) => void;
}

const getTALinesNumber = (ta: HTMLTextAreaElement, div: HTMLDivElement): number => {
    const style = window.getComputedStyle(ta);
    const lineHeight = +style.getPropertyValue('line-height').replace('px', '');

    const divStyle = window.getComputedStyle(div);
    const divHeight = +divStyle.getPropertyValue('height').replace('px', '');

    if (lineHeight <= 0) {
        return 1;
    }
    return Math.floor(divHeight / lineHeight);
};

export const Textarea = (props: ITextareaProps): React.ReactElement => {
    const {
        name: defaultName,
        label,
        value,
        error,
        disabled,
        success,
        autoFocus = false,
        onChangeHandler,
        onBlurHandler,
        onStateChange,
        onErrorTruncation,
    } = props;

    const ref = useRef<HTMLTextAreaElement | null>(null);
    // div to calculate height for textarea
    const divRef = useRef<HTMLDivElement | null>(null);
    const fakeErrorLabelRef = useRef<HTMLLabelElement | null>(null);

    const name = defaultName || String(Math.random());
    const [inputState, setInputState] = useState<State>(State.idle);
    const [focused, setFocused] = useState(false);
    const [linesNumber, setLinesNumber] = useState(1);
    const [isTruncated, setIsTruncated] = useState(false);

    const onLocalFocus = () => {
        setFocused(true);
    };

    const onLocalBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        setFocused(false);
        onChangeHandler?.(name, e.target.value);
        onBlurHandler?.(e);
    };

    const onPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.keyCode === 13) {
            onLocalBlur((e as unknown) as React.FocusEvent<HTMLTextAreaElement>);
        }
    };

    const checkErrorTruncation = useCallback(() => {
        const truncated = (fakeErrorLabelRef.current?.offsetWidth ?? 0) < (fakeErrorLabelRef.current?.scrollWidth ?? 0);
        setIsTruncated(!!error && truncated);
    }, [error]);

    useEffect(() => {
        if (disabled) {
            setInputState(State.disabled);
        } else if (focused) {
            setInputState(State.active);
        } else if (!!error) {
            setInputState(State.error);
        } else if (success) {
            setInputState(State.success);
        } else {
            setInputState(State.idle);
        }
    }, [disabled, focused, error, success]);

    useEffect(() => {
        onStateChange?.(inputState);
    }, [inputState, onStateChange]);

    useEffect(() => {
        onErrorTruncation?.(isTruncated);
    }, [focused, isTruncated, onErrorTruncation]);

    // update styles depends on lines number and also scroll to text end
    useEffect(() => {
        if (ref.current && divRef.current) {
            setLinesNumber(getTALinesNumber(ref.current, divRef.current));
            // scroll to text end
            ref.current.scrollTop = ref.current.scrollHeight;
        }
    }, [value]);

    // same behaviour on window resize
    useEffect(() => {
        const handler = () => {
            if (ref.current && divRef.current) {
                setLinesNumber(getTALinesNumber(ref.current, divRef.current));
                // scroll to text end
                ref.current.scrollTop = ref.current.scrollHeight;
            }
        };
        // call it on component mount
        handler();
        window.addEventListener('resize', handler);
        return () => {
            window.removeEventListener('resize', handler);
        };
    });

    useEffect(() => {
        if (error) {
            checkErrorTruncation();
            fakeErrorLabelRef?.current?.addEventListener('transitionend', checkErrorTruncation);
            // TODO: вызывается для каждого анимируемого свойства, возможно стоит оптимизировать
            window.addEventListener('resize', checkErrorTruncation);
        }

        return () => {
            fakeErrorLabelRef?.current?.removeEventListener('transitionend', checkErrorTruncation);
            window.removeEventListener('resize', checkErrorTruncation);
        };
    }, [checkErrorTruncation, error, inputState]);

    const inputClasses =
        'mform__gm-input ' +
        component(
            'form',
            'gm-input-multi',
        )({
            disabled: inputState === State.disabled,
            error: inputState === State.error,
            success: inputState === State.success,
            lines2: linesNumber === 2,
            lines3: linesNumber === 3,
            lines4: linesNumber > 3,
        });

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeHandler?.(name, e.target.value);

    return (
        <div className={inputClasses}>
            <div className="div-for-ta-height-container">
                <div className="div-for-ta-height" ref={divRef}>
                    {/* replace is necessary to show new line after user press enter*/}
                    {value?.replace(/(\r?)\n$/, '$1\n ')}
                </div>
            </div>
            <textarea
                ref={ref}
                name={name}
                id={name + '_id_field'}
                placeholder={label}
                value={value}
                onChange={handleChange}
                onBlur={onLocalBlur}
                onFocus={onLocalFocus}
                onKeyPress={onPress}
                disabled={disabled}
                autoFocus={autoFocus}
            />
            <label style={{visibility: 'hidden'}} ref={fakeErrorLabelRef}>
                {inputState === State.error ? error : ''}
            </label>
            <label htmlFor={name + '_id_field'}>{inputState === State.error ? error : label}</label>
            <div className="mform__gm-input-multi-underline" />
            {inputState === State.success && (
                <span className="mform__input-icon mform__input-icon--success" title="">
                    <CheckSvg className="aicon" />
                </span>
            )}
        </div>
    );
};
