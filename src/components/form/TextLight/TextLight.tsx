import React from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import {IFormTextLightProps} from './TextLight.types';
import './index.less';
import {Input} from './Input';

export const TextLight: React.FC<IFormTextLightProps> = ({
    customIcon = undefined,
    success = false,
    disabled = false,
    error = '',
    caption = '',
    name = '',
    id,
    ...props
}) => {
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

    const inputId = id ? id : `${name}_id_field`;

    return (
        <>
            <div className={inputClasses}>
                <Input name={name} id={inputId} disabled={disabled} style={style} {...props} />
                <label htmlFor={inputId}>{!!error ? error : props.placeholder}</label>
                <span className={inputIconClasses}>
                    {customIcon ? customIcon : success && <CheckSvg className={iconClasses} />}
                </span>
            </div>
            {!!caption && <div className={captionClasses}>{caption}</div>}
        </>
    );
};
