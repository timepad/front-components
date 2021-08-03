import React from 'react';
import {FieldHelperProps} from 'formik/dist/types';

export type CheckboxState = 'on' | 'off' | 'partial';

export interface ICheckboxProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    text?: string;
    caption?: string;
    small?: boolean;
    error?: string;
    indeterminate?: boolean;
}

// checkbox props with formik integrations
export type CheckboxWithFormikType = ICheckboxProps & Partial<FieldHelperProps<boolean>>;

export interface IThreeStateCheckboxProps extends CheckboxWithFormikType {
    value: CheckboxState;
}

export interface IWrapperCheckboxProps extends CheckboxWithFormikType {
    icon: JSX.Element;
}
