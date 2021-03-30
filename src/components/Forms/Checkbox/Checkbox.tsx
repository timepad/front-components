import * as React from 'react';
import {ChangeEvent, ChangeEventHandler} from 'react';
import {atom} from '../../../services/helpers/classHelpers';

import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';

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

export const Checkbox = ({name, label, value, checked, disabled, id, error, onChange}: ICheckboxProps) => {
    const idx = id || name + '_field_checkbox';

    const wrapperClasses = atom('checkbox')({error: !!error, disabled: disabled});

    const checkboxClasses = atom('checkbox', 'icon')({checked: checked});

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
                <span className="acheckbox__text t-caption t-caption--brick">{label}</span>
            </label>
        </div>
    );
};
