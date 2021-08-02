import * as React from 'react';
import {ChangeEventHandler, useState} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import BulletSvg from '../../../assets/svg/16/icon-bullet-16.svg';

import './index.less';
import {uniqueId} from '../../../services/helpers/uniqueId';

export enum RadioVariant {
    primary = 'primary',
    blue = 'blue',
}

export interface IRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label?: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    error?: string;
    className?: string;
    variant?: RadioVariant;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: ChangeEventHandler<HTMLInputElement>;
}

export const Radio: React.FC<IRadioProps> = ({
    name,
    label,
    value,
    checked,
    disabled,
    id,
    error,
    onChange,
    onBlur,
    className = '',
    variant = RadioVariant.primary,
    ...othersProps
}) => {
    const [localId] = useState<string>(id ? id : uniqueId());
    const idx = localId ? localId + '_field_radip' : name + '_field_radip';

    const wrapperClasses = cx(component('radio')({error: !!error, disabled: disabled}), className);

    const radioClasses = component(
        'radio',
        'icon',
    )({
        checked: checked,
        'checked-primary': checked && variant === RadioVariant.primary,
        'checked-blue': checked && variant === RadioVariant.blue,
    });

    const labelClasses = cx(component('radio', 'text')(), 't-caption', 't-caption--brick');

    return (
        <div className={wrapperClasses}>
            <label>
                <input
                    id={idx}
                    type="radio"
                    name={name}
                    checked={checked}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...othersProps}
                />
                <span className={radioClasses}>
                    <BulletSvg />
                </span>
                {label && <span className={labelClasses}>{label}</span>}
            </label>
        </div>
    );
};
