import React, {FC} from 'react';
import {molecule} from '../../../services/helpers/classHelpers';

import MaskedInput from 'react-input-mask';
import CheckSvg from 'assets/svg/16/icon-check-16.svg';

interface IPhoneInputProps {
    name: string;
    label: string;
    value?: string;
    error?: string;
    touched?: boolean;
    disabled?: boolean;
    onChange?: (name: string, value: string) => void;
    onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const PhoneInput: FC<IPhoneInputProps> = (props) => {
    const {name, label, value, error, touched, disabled, onChange, onBlur} = props;

    const success = (!error && !!value) || disabled;

    const inputClasses = molecule('form', 'input')({error: !!error && touched, success: success, disabled: disabled});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(name, e.target.value);

    return (
        <div className={inputClasses}>
            <MaskedInput
                mask="+7 (999) 999 99 99"
                maskPlaceholder={null}
                name={name}
                id={name}
                placeholder={label}
                value={value}
                disabled={disabled}
                onChange={handleChange}
                onBlur={onBlur}
            />
            <label htmlFor={name}>{label}</label>
            {success && (
                <span className="mform__input-icon mform__input-icon--success" title="">
                    <CheckSvg className="aicon" />
                </span>
            )}
        </div>
    );
};
