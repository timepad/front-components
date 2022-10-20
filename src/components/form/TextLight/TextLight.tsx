import React, {FC, useMemo} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import {IFormTextLightProps} from './TextLight.types';
import {Textarea} from '../Textarea';

import './index.less';

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

    // TODO: сверху все типизировано, здесь необходим any, иначе в otp ничего не билдится
    return (
        <>
            <div className={inputClasses}>
                {props.multiline ? (
                    <Textarea
                        name={fieldName}
                        id={id}
                        disabled={disabled}
                        style={style}
                        {...props}
                        onChange={props.onChange}
                    />
                ) : (
                    <input
                        name={fieldName}
                        id={id}
                        disabled={disabled}
                        ref={(props as any).inputRef}
                        style={style}
                        {...(props as any)}
                        onChange={props.onChange}
                    />
                )}
                <label htmlFor={id}>{!!error ? error : props.placeholder}</label>
                <span className={inputIconClasses}>
                    {customIcon ? customIcon : success && <CheckSvg className={iconClasses} />}
                </span>
            </div>
            {!!caption && <div className={captionClasses}>{caption}</div>}
        </>
    );
};
