import * as React from 'react';
import {ChangeEvent, ChangeEventHandler} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import BulletSvg from '../../../assets/svg/16/icon-bullet-16.svg';

import './index.less';

export interface IRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    error?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
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
    ...othersProps
}) => {
    const idx = id || name + '_field_checkbox';

    const wrapperClasses = component('radio')({error: !!error, disabled: disabled});

    const radioClasses = component('radio', 'icon')({checked: checked});

    const onChangeLocal = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    };

    return (
        <div className={wrapperClasses}>
            <label>
                <input
                    id={idx}
                    type="radio"
                    name={name}
                    checked={checked}
                    value={value}
                    onChange={onChangeLocal}
                    {...othersProps}
                />
                <span className={radioClasses}>
                    <BulletSvg />
                </span>
                <span className={cx(component('radio', 'text')(), component('t-caption')('brick'))}>{label}</span>
            </label>
        </div>
    );
};
