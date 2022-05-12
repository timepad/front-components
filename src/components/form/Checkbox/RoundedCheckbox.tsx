import * as React from 'react';
import cx from 'classnames';
import {component} from '../../../services/helpers/classHelpers';
import CheckSvg from '../../../assets/svg/24/icon-check-24.svg';
import {uniqueId} from '../../../services/helpers/uniqueId';

const {useState} = React;
import './cform__checkbox--rounded.less';
import {IRoundedCheckboxProps} from './Checkbox.types';

export const RoundedCheckbox: React.FC<IRoundedCheckboxProps> = (props) => {
    const baseClassName = 'form__checkbox--rounded';
    const {checked, name, value, disabled, onChange, onBlur, className = '', ...othersProps} = props;
    const [id] = useState<string>(uniqueId());

    const checkboxClasses = component(baseClassName)({disabled: disabled});

    const labelIconClasses = component(baseClassName, 'icon')();

    const iconClasses = component('icon')();

    return (
        <div className={cx(checkboxClasses, className)}>
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
                <span className={labelIconClasses}>
                    <CheckSvg className={iconClasses} />
                </span>
            </label>
        </div>
    );
};
