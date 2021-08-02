import React, {FC} from 'react';
import './index.less';
import {component} from '../../../services/helpers/classHelpers';
import CheckIcon from '../../../assets/svg/24/icon-check-24.svg';
import {WrapperCheckbox} from './WrapperCheckbox';
import {ICheckboxProps} from './Checkbox.types';

export const Checkbox: FC<ICheckboxProps> = ({checked, ...props}) => {
    const checkboxClasses = component(
        'form--checkbox',
        'icon',
    )({
        checked: checked,
    });

    const icon = (
        <span className={checkboxClasses}>
            <CheckIcon />
        </span>
    );

    return <WrapperCheckbox icon={icon} {...props} />;
};
