import React, {FC} from 'react';
import {ICheckboxProps, IDefaultCheckboxProps, IRoundedCheckboxProps} from './Checkbox.types';
import {RoundedCheckbox} from './RoundedCheckbox';
import {DefaultCheckbox} from './DefaultCheckbox';

export const Checkbox: FC<ICheckboxProps> = ({rounded, ...props}) => {
    return rounded ? (
        <RoundedCheckbox {...(props as IRoundedCheckboxProps)} />
    ) : (
        <DefaultCheckbox {...(props as IDefaultCheckboxProps)} />
    );
};
