import * as React from 'react';
import {ChangeEventHandler} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import {uniqueId} from '../../../services/helpers/uniqueId';

const {useState} = React;
import './cradiobutton.less';
import {RadioVariant} from '../Radio';

interface IRadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    checked?: boolean;
    name?: string;
    label?: string;
    variant?: RadioVariant;
    value: string;
    disabled?: boolean;
    error?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export const RadioButton: React.FC<IRadioButtonProps> = (props) => {
    const {
        checked,
        name,
        label,
        value,
        disabled,
        onChange,
        onBlur,
        variant = RadioVariant.primary,
        ...othersProps
    } = props;
    const [id] = useState<string>(uniqueId());

    const checkboxClasses = component('radiobutton')({
        disabled: disabled,
        labeled: !!label,
        primary: checked && variant === RadioVariant.primary,
        blue: checked && variant === RadioVariant.blue,
    });

    const labelTextClasses = component('radiobutton', 'text')();

    const labelIconClasses = component('radiobutton', 'icon')();

    const iconClasses = component('icon')();

    return (
        <div className={checkboxClasses}>
            <input
                type="checkbox"
                name={name}
                id={id}
                checked={checked}
                value={value}
                disabled={disabled}
                onChange={onChange}
                onBlur={onBlur}
                {...othersProps}
            />
            <label htmlFor={id}>
                {label ? (
                    <span className={labelTextClasses}>{label}</span>
                ) : (
                    <span className={labelIconClasses}>
                        <CheckSvg className={iconClasses} />
                    </span>
                )}
            </label>
        </div>
    );
};
