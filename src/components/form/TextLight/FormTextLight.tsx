import * as React from 'react';
import {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import './index.less';

export enum State {
    disabled = 'disabled',
    active = 'active',
    error = 'error',
    success = 'success',
    idle = 'idle',
}

export interface IFormTextLightProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: string;
    success?: boolean;
    inputRef?: React.MutableRefObject<HTMLInputElement>;
    customIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    onStateChange?: (state: State) => void;
    onErrorTruncation?: (truncated: boolean) => void;
}

export const FormTextLight: React.FC<IFormTextLightProps> = (props) => {
    const {
        name,
        success,
        error,
        autoFocus = false,
        inputRef,
        customIcon,
        onStateChange,
        onErrorTruncation,
        ...othersProps
    } = props;

    const fieldName: string = useMemo(() => (name ? name.toString() : String(Math.random())), [name]);

    const fakeErrorLabelRef = useRef<HTMLLabelElement | null>(null);

    const [inputState, setInputState] = useState<State>(State.idle);
    const [focused, setFocused] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);

    const inputClasses = cx(
        component('form--text-light', 'container')(),
        component(
            'form--text-light',
            'input',
        )({
            disabled: inputState === State.disabled,
            error: !!error,
            success: inputState === State.success,
        }),
    );

    const iconClasses = component('icon')();

    const inputIconClasses = component('form--text-light', 'container__icon')();

    const onLocalFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        props.onFocus?.(e);
    };

    const onLocalBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        props.onChange?.(e);
        props.onBlur?.(e);
    };

    const onPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onLocalBlur(e as unknown as React.FocusEvent<HTMLInputElement>);
        }
    };

    const checkErrorTruncation = useCallback(() => {
        const truncated = (fakeErrorLabelRef.current?.offsetWidth ?? 0) < (fakeErrorLabelRef.current?.scrollWidth ?? 0);
        setIsTruncated(!!error && truncated);
    }, [error]);

    useEffect(() => {
        if (props.disabled) {
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
    }, [props.disabled, focused, error, success]);

    useEffect(() => {
        onStateChange?.(inputState);
    }, [inputState, onStateChange]);

    useEffect(() => {
        onErrorTruncation?.(isTruncated);
    }, [focused, isTruncated, onErrorTruncation]);

    useEffect(() => {
        const fakeErrorLabel = fakeErrorLabelRef?.current;
        if (error) {
            checkErrorTruncation();
            fakeErrorLabel?.addEventListener('transitionend', checkErrorTruncation);
            window.addEventListener('resize', checkErrorTruncation);
        }

        return () => {
            fakeErrorLabel?.removeEventListener('transitionend', checkErrorTruncation);
            window.removeEventListener('resize', checkErrorTruncation);
        };
    }, [checkErrorTruncation, error, inputState]);

    const id = `${fieldName}_id_field`;
    return (
        <div className={inputClasses}>
            <input
                ref={inputRef}
                name={fieldName}
                id={id}
                onFocus={onLocalFocus}
                onBlur={onLocalBlur}
                onKeyPress={onPress}
                autoFocus={autoFocus}
                {...othersProps}
            />
            <label style={{visibility: 'hidden'}} ref={fakeErrorLabelRef}>
                {!!error ? error : ''}
            </label>
            <label htmlFor={id}>{!!error && !isTruncated ? error : props.placeholder}</label>
            <span className={inputIconClasses}>
                {customIcon ? customIcon : inputState === State.success && <CheckSvg className={iconClasses} />}
            </span>
        </div>
    );
};
