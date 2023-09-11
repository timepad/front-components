import React from 'react';

export interface ICheckboxProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    rounded?: boolean;
    text?: string;
    caption?: string;
    small?: boolean;
    error?: string;
    indeterminate?: boolean;
}
