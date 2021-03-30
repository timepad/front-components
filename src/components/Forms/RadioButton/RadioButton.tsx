import * as React from 'react';
import uniqueId from 'lodash.uniqueid';
import {component} from '../../../services/helpers/classHelpers';

import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';

interface IRadioButtonProps {
    checked?: boolean;
    name?: string;
    label?: string;
    value: string;
    disabled?: boolean;
    onChangeHandler?: (name: string | undefined, value: string, checked: boolean) => void;
    onBlurHandler?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const RadioButton = (props: IRadioButtonProps): React.ReactElement => {
    const {checked, name, label, value, disabled, onChangeHandler, onBlurHandler} = props;

    const id: string = uniqueId('field-');

    const checkboxClasses = component('radiobutton')({disabled: disabled, labeled: !!label});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChangeHandler?.(name, value, e.target.checked);

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
                onBlur={onBlurHandler}
            />
            <label htmlFor={id}>
                {label ? (
                    <span className="cradiobutton__text">{label}</span>
                ) : (
                    <span className="cradiobutton__icon">
                        <CheckSvg className="aicon" />
                    </span>
                )}
            </label>
        </div>
    );
};
