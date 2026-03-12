import React from 'react';
import {IAdditionalAttributes} from '../../../../types';

export interface ICheckboxProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        IAdditionalAttributes {
    rounded?: boolean;
    text?: string | React.ReactNode;
    caption?: string;
    small?: boolean;
    error?: string;
    indeterminate?: boolean;
}
