import * as React from 'react';
import {component} from '../../../services/helpers/classHelpers';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import {uniqueId} from '../../../services/helpers/uniqueId';
const {useState} = React;

import './cradiobutton.less';

interface IRadioButtonProps {
    checked?: boolean;
    name?: string;
    label?: string;
    value: string;
    disabled?: boolean;
    onChange?: (name: string | undefined, value: string, checked: boolean) => void;
    onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const RadioButton: React.FC<IRadioButtonProps> = (props) => {
    const {checked, name, label, value, disabled, onChange, onBlur} = props;
    const [id] = useState<string>(uniqueId());

    const checkboxClasses = component('radiobutton')({disabled: disabled, labeled: !!label});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(name, value, e.target.checked);

    return (
        <div className={checkboxClasses}>
            <input
                type="checkbox"
                name={name}
                id={id}
                checked={checked}
                value={value}
                disabled={disabled}
                onChange={handleChange}
                onBlur={onBlur}
            />
            <label htmlFor={id}>
                {label ? (
                    <span className={component('radiobutton', 'text')()}>{label}</span>
                ) : (
                    <span className={component('radiobutton', 'icon')()}>
                        <CheckSvg className={component('icon')()} />
                    </span>
                )}
            </label>
        </div>
    );
};
