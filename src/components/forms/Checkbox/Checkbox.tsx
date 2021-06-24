import * as React from 'react';
import {ChangeEventHandler, useState} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';

import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';

import './index.less';
import {uniqueId} from '../../../services/helpers/uniqueId';

export interface ICheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    value?: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    error?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: React.FC<ICheckboxProps> = ({
    name,
    label,
    value,
    checked,
    disabled,
    id,
    error,
    onChange,
    onBlur,
    ...props
}) => {
    const [localId] = useState<string>(id ? id : uniqueId());
    const idx = localId ? localId + '_field_checkbox' : name + '_field_checkbox';

    const wrapperClasses = component('checkbox')({error: !!error, disabled: disabled});

    const checkboxClasses = component('checkbox', 'icon')({checked: checked});

    const labeClasses = cx(component('checkbox', 'text')(), 't-caption', 't-caption--brick');

    return (
        <div className={wrapperClasses}>
            <label htmlFor={idx}>
                <input
                    type="checkbox"
                    name={name}
                    id={idx}
                    checked={checked}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...props}
                />
                <span className={checkboxClasses}>
                    <CheckSvg />
                </span>
                <span className={labeClasses}>{label}</span>
            </label>
        </div>
    );
};
