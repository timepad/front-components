import React, {FC} from 'react';
import {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import './index.less';
import {IFormTextLightProps} from './TextLight.types';
import {Textarea} from '../Textarea';

export const TextLight: FC<IFormTextLightProps> = ({
    customIcon,
    success,
    error,
    name,
    disabled,
    ...props
}: IFormTextLightProps) => {
    const fieldName: string = useMemo(() => (name ? name.toString() : String(Math.random())), [name]);

    const fakeErrorLabelRef = useRef<HTMLLabelElement | null>(null);
    const [focused, setFocused] = useState(false);
    const [isTruncated, setIsTruncated] = useState(false);

    const inputClasses = cx(
        component('form--text-light', 'container')(),
        component(
            'form--text-light',
            'input',
        )({
            disabled,
            error: !!error,
            success,
        }),
    );
    const iconClasses = component('icon')();
    const inputIconClasses = component('form--text-light', 'container__icon')();

    const onLocalFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        if (!props.multiline) {
            props.onFocus?.(e);
        }
    };

    const onLocalBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        if (!props.multiline) {
            props.onChange?.(e);
            props.onBlur?.(e);
        }
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
        props.onErrorTruncation?.(isTruncated);
    }, [focused, isTruncated, props, props.onErrorTruncation]);

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
    }, [checkErrorTruncation, error]);

    const style =
        customIcon || success ? {...props.style, padding: '0 32px 11px 0'} : {...props.style, padding: '0 0 11px 0'};

    const id = `${fieldName}_id_field`;
    return (
        <div className={inputClasses}>
            {props.multiline ? (
                <Textarea style={style} {...props} />
            ) : (
                <input
                    name={fieldName}
                    id={id}
                    ref={props.inputRef}
                    onFocus={onLocalFocus}
                    onBlur={onLocalBlur}
                    onKeyPress={onPress}
                    style={style}
                    {...props}
                />
            )}

            <label style={{visibility: 'hidden'}} ref={fakeErrorLabelRef}>
                {!!error ? error : ''}
            </label>
            <label htmlFor={id}>{!!error && !isTruncated ? error : props.placeholder}</label>
            <span className={inputIconClasses}>
                {customIcon ? customIcon : success && <CheckSvg className={iconClasses} />}
            </span>
        </div>
    );
};
