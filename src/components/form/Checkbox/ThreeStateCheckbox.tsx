import React, {FC} from 'react';
import {IThreeStateCheckboxProps} from './Checkbox.types';
import CheckIcon from '../../../assets/svg/24/icon-check-24.svg';
import MinusCheckIcon from '../../../assets/svg/24/icon-minus-24.svg';
import {component} from '../../../services/helpers/classHelpers';
import {WrapperCheckbox} from './WrapperCheckbox';

export const ThreeStateCheckbox: FC<IThreeStateCheckboxProps> = ({value, ...props}) => {
    const checkboxClasses = component(
        'form--checkbox',
        'icon',
    )({
        checked: value === 'on' || value === 'partial',
    });

    const icon = (
        <span className={checkboxClasses}>
            {value === 'on' && <CheckIcon />}
            {value === 'partial' && <MinusCheckIcon />}
        </span>
    );

    return <WrapperCheckbox icon={icon} {...props} />;
};
