import React, {FC, useMemo} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import {IFormInputLightProps, IFormTextLightProps} from './TextLight.types';
import {Textarea} from '../Textarea';
import MaskedInput from 'react-input-mask';
import './index.less';
import {FieldMetaProps} from 'formik/dist/types';

export const TextLight: FC<IFormTextLightProps> = ({
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

const Input: FC<IFormTextLightProps> = (props) => {
    if (props.multiline) {
        return <Textarea {...props} />;
    }
    // TODO: сверху все типизировано, здесь необходим any, иначе в otp ничего не билдится
    if (!props.multiline && (props as IFormInputLightProps).type === 'phone') {
        return <MaskedInput mask="+7 (999) 999 99 99" maskPlaceholder={null} {...(props as IFormInputLightProps)} />;
    }
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    const {touched, initialValue, initialTouched, initialError, ...otherProps} = props as IFormTextLightProps &
        FieldMetaProps<string>;
    return <input ref={(props as any).inputRef} {...(otherProps as any)} touched={touched?.toString()} />;
};
