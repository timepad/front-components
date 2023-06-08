import React from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import {IFormTextLightProps} from './TextLight.types';
import {Textarea} from '../Textarea';
import MaskedInput, {BeforeMaskedStateChangeStates} from 'react-input-mask';
import './index.less';

export const TextLight: React.FC<IFormTextLightProps> = ({
    customIcon = undefined,
    success = false,
    disabled = false,
    error = '',
    caption = '',
    name = '',
    ...props
}: IFormTextLightProps) => {
    const fieldName: string = name ? name.toString() : String(Math.random());
    const inputClasses = cx(
        component('text-light', 'container')(),
        component(
            'text-light',
            'input',
        )({
            disabled,
            error: !!error,
            success,
        }),
    );
    const iconClasses = component('icon')();
    const inputIconClasses = component('text-light', 'container__icon')();
    const captionClasses = component(
        'text-light',
        'caption',
    )({
        error: !!error,
        disabled,
    });

    const style =
        customIcon || success ? {...props.style, padding: '0 32px 12px 0'} : {...props.style, padding: '0 0 12px 0'};

    const id = `${fieldName}_id_field`;

    return (
        <>
            <div className={inputClasses}>
                <Input name={fieldName} id={id} disabled={disabled} style={style} {...props} />
                <label htmlFor={id}>{!!error ? error : props.placeholder}</label>
                <span className={inputIconClasses}>
                    {customIcon ? customIcon : success && <CheckSvg className={iconClasses} />}
                </span>
            </div>
            {!!caption && <div className={captionClasses}>{caption}</div>}
        </>
    );
};

const maskedChange = ({currentState, nextState}: BeforeMaskedStateChangeStates) => {
    let {value} = nextState;
    const {value: currValue = ''} = currentState || {};

    // обрезка placeholder при наборе и автозаполнении
    if (/^\d{3}/.test(currValue) && currValue.length <= 10) {
        value = '+7' + currValue;
    }

    // для номеров, начинающихся с 8
    if (currValue.startsWith('8') && currValue.length > 10) {
        value = '+7' + currValue.slice(1);
    }

    return {...nextState, value};
};

interface IInputProps extends Omit<IFormTextLightProps, 'error' | 'success' | 'caption' | 'customIcon'> {}

const Input: React.FC<IInputProps> = ({
    multiline,
    value = '',
    maskPlaceholder = null,
    maskChar = null,
    mask = '+7 (999) 999 99 99',
    beforeMaskedStateChange,
    inputRef,
    textareaRef,
    type = 'text',
    alwaysShowMask = false,
    ...props
}) => {
    if (multiline) {
        return <Textarea value={value} ref={textareaRef} {...props} />;
    }
    if (!multiline && type === 'phone') {
        return (
            <MaskedInput
                value={value}
                beforeMaskedStateChange={beforeMaskedStateChange ? beforeMaskedStateChange : maskedChange}
                mask={mask}
                maskChar={maskChar}
                maskPlaceholder={maskPlaceholder}
                inputRef={inputRef}
                alwaysShowMask={alwaysShowMask}
                {...props}
            />
        );
    }
    return <input value={value} ref={inputRef} {...props} />;
};
