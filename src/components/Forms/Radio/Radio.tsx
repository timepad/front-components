import React, {ChangeEvent, ChangeEventHandler} from 'react';
import {atom} from '../../../services/helpers/ClassHelper';

import BulletSvg from '../../../assets/svg/16/icon-bullet-16.svg';

export interface IRadioProps {
    name: string;
    label: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    error?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

export const Radio = ({name, label, value, checked, disabled, id, error, onChange}: IRadioProps) => {
    const idx = id || name + '_field_checkbox';

    const wrapperClasses = atom('radio')({error: !!error, disabled: disabled});

    const radioClasses = atom('radio', 'icon')({checked: checked});

    const onChangeLocal = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
    };

    return (
        <div className={wrapperClasses}>
            <label>
                <input id={idx} type="radio" name={name} checked={checked} value={value} onChange={onChangeLocal} />
                <span className={radioClasses}>
                    <BulletSvg />
                </span>
                <span className="aradio__text t-caption t-caption--brick">{label}</span>
            </label>
        </div>
    );
};
