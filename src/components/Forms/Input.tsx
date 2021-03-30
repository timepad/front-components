import * as React from 'react';
import {ChangeEventHandler, FocusEventHandler, useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {molecule} from '../../services/helpers/classHelpers';

import CheckSvg from '../../assets/svg/24/icon-check-24.svg';

export enum State {
    disabled = 'disabled',
    active = 'active',
    error = 'error',
    success = 'success',
    idle = 'idle',
}

interface IProps {
    label: string;
    value: string | number;
    name?: string | number;
    error?: string;
    disabled?: boolean;
    success?: boolean;
    autoFocus?: boolean;
    onFocus?: FocusEventHandler<HTMLInputElement>;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: FocusEventHandler<HTMLInputElement>; // yes FocusEventHandler, look d.ts
    inputRef?: React.MutableRefObject<HTMLInputElement>;
    customIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    onStateChange?: (state: State) => void;
    onErrorTruncation?: (truncated: boolean) => void;
}

export const Input = (props: IProps): React.ReactElement => {
    const {
        name,
        label,
        value,
        error,
        disabled,
        success,
        autoFocus = false,
        onFocus,
        onChange,
        onBlur,
        inputRef,
        customIcon,
        onStateChange,
        onErrorTruncation,
    } = props;

    const fieldName: string = useMemo(() => (name ? name.toString() : String(Math.random())), [name]);

    const fakeErrorLabelRef = useRef<HTMLLabelElement | null>(null);

    const [inputState, setInputState] = useState<State>(State.idle);
    const [focused, setFocused] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);

    const inputClasses =
        'mform__gm-input ' +
        molecule(
            'form',
            'gm-input-single',
        )({
            disabled: inputState === State.disabled,
            error: inputState === State.error,
            success: inputState === State.success,
        });
    // TODO: не уверен, что именно так надо проверять (!!error && !disabled)

    const onLocalFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        onFocus?.(e);
    };

    const onLocalBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onChange?.(e);
        onBlur?.(e);
    };

    const onPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            onLocalBlur((e as unknown) as React.FocusEvent<HTMLInputElement>);
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

    return (
        <div className={inputClasses}>
            <input
                ref={inputRef}
                name={fieldName}
                id={fieldName + '_id_field'}
                placeholder={label}
                value={value}
                onChange={onChange}
                onFocus={onLocalFocus}
                onBlur={onLocalBlur}
                onKeyPress={onPress}
                disabled={disabled}
                autoFocus={autoFocus}
            />
            <label style={{visibility: 'hidden'}} ref={fakeErrorLabelRef}>
                {inputState === State.error ? error : ''}
            </label>
            <label htmlFor={fieldName + '_id_field'}>
                {inputState === State.error && !isTruncated ? error : label}
            </label>
            <span className="mform__gm-input__icon">
                {customIcon ? customIcon : inputState === State.success && <CheckSvg className="aicon" />}
            </span>
        </div>
    );
};
