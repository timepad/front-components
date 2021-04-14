import * as React from 'react';
import {ChangeEvent, ChangeEventHandler} from 'react';
import {component} from '../../../services/helpers/classHelpers';

import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';

import './ccheckbox.less';

export interface ICheckboxProps {
    name: string;
    label: string;
    value?: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    error?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox: React.FC<ICheckboxProps> = ({name, label, value, checked, disabled, id, error, onChange}) => {
    const idx = id || name + '_field_checkbox';

    const wrapperClasses = component('checkbox')({error: !!error, disabled: disabled});

    const checkboxClasses = component('checkbox', 'icon')({checked: checked});

    const onChangeLocal = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    };

    return (
        <div className={wrapperClasses}>
            <label htmlFor={idx}>
                <input type="checkbox" name={name} id={idx} checked={checked} value={value} onChange={onChangeLocal} />
                <span className={checkboxClasses}>
                    <CheckSvg />
                </span>
                <span className="ccheckbox__text t-caption t-caption--brick">{label}</span>
            </label>
        </div>
    );
};
