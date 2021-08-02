import React from 'react';

export type CheckboxType = 'on' | 'off' | 'partial';

export interface IFormCheckboxProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    text?: string;
    caption?: string;
    small?: boolean;
    value?: CheckboxType;
    error?: string;
}
