import React, {FC, useMemo} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import {IFormMaskInputProps, IFormTextLightProps} from './TextLight.types';
import {Textarea} from '../Textarea';
import MaskedInput, {BeforeMaskedStateChangeStates} from 'react-input-mask';
import './index.less';
import {FieldMetaProps} from 'formik/dist/types';
import {ITextareaProps} from '../Textarea/Textarea';

export const TextLight: FC<React.PropsWithChildren<IFormTextLightProps>> = ({
    customIcon = undefined,
    success = false,
    disabled = false,
    error = '',
    caption = '',
    name = '',
    ...props
}: IFormTextLightProps) => {
    const fieldName: string = useMemo(() => (name ? name.toString() : String(Math.random())), [name]);
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

// TODO: сверху все типизировано, здесь необходимы as, any и спред пропсов, иначе в otp ничего не билдится и куча варнингов
/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
const Input: FC<IFormTextLightProps & Partial<Omit<FieldMetaProps<string>, 'value'>>> = ({
    touched,
    multiline,
    initialValue,
    initialTouched,
    initialError,
    value = '',
    ...props
}) => {
    const currentValue = useMemo(() => {
        return value ? value : '';
    }, [value]);
    if (multiline) {
        return <Textarea value={currentValue} {...(props as ITextareaProps)} />;
    }
    if (!multiline && (props as IFormMaskInputProps).type === 'phone') {
        const {
            mask = '+7 (999) 999 99 99',
            maskChar = null,
            maskPlaceholder = null,
            ...restProps
        } = props as IFormMaskInputProps;
        return (
            <MaskedInput
                value={currentValue}
                beforeMaskedStateChange={maskedChange}
                mask={mask}
                maskChar={maskChar}
                maskPlaceholder={maskPlaceholder}
                {...restProps}
            />
        );
    }
    return (
        <input value={currentValue} ref={(props as any).inputRef} {...(props as any)} touched={touched?.toString()} />
    );
};
