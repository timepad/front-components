import * as React from 'react';
import {ChangeEventHandler, useState} from 'react';
import {component} from '../../../services/helpers/classHelpers';
import cx from 'classnames';
import BulletSvg from '../../../assets/svg/16/icon-bullet-16.svg';

import './index.less';
import {uniqueId} from '../../../services/helpers/uniqueId';

export interface IRadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string;
    label: string;
    value: string;
    checked?: boolean;
    disabled?: boolean;
    id?: string;
    error?: string;
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
    ...othersProps
}) => {
    const [localId] = useState<string>(id ? id : uniqueId());
    const idx = localId ? localId + '_field_radip' : name + '_field_radip';

    const wrapperClasses = component('radio-old')({error: !!error, disabled: disabled});

    const radioClasses = component('radio-old', 'icon')({checked: checked});

    const labelClasses = cx(component('radio-old', 'text')(), 't-caption', 't-caption--brick');

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
                <span className={labelClasses}>{label}</span>
            </label>
        </div>
    );
};
