import React from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import {IconCheck24} from '../../../icons';
import './index.less';
import {uniqueId} from '../../../services/helpers/uniqueId';
import {ITextLightProps} from './TextLight.types';
import './index.less';
import {Input} from './Input';

export const TextLight: React.FC<ITextLightProps> = ({
    customIcon = undefined,
    success = false,
    disabled = false,
    error = '',
    caption = '',
    name = '',
    id = uniqueId() + '_field_text_light',
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

    return (
        <>
            <div className={inputClasses}>
                <Input name={name} id={id} disabled={disabled} style={style} {...props} />
                <label htmlFor={id}>{!!error ? error : props.placeholder}</label>
                <span className={inputIconClasses}>
                    {customIcon ? customIcon : success && <IconCheck24 className={iconClasses} />}
                </span>
            </div>
            {!!caption && <div className={captionClasses}>{caption}</div>}
        </>
    );
};
