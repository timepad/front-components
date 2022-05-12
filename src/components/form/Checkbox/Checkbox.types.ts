import React, {ChangeEventHandler} from 'react';
import {FieldHelperProps} from 'formik/dist/types';

export type CheckboxState = 'on' | 'off' | 'partial';

export type ICheckboxProps = IRoundedCheckboxProps | IDefaultCheckboxProps;

export interface IRoundedCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    rounded?: true;
    checked?: boolean;
    name?: string;
    value: string;
    disabled?: boolean;
    className?: string;
    error?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    onBlur?: (event: React.FormEvent<HTMLInputElement>) => void;
}

export interface IDefaultCheckboxProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    rounded?: false;
    text?: string;
    caption?: string;
    small?: boolean;
    error?: string;
    indeterminate?: boolean;
}

// checkbox props with formik integrations
export type CheckboxWithFormikType = IDefaultCheckboxProps & Partial<FieldHelperProps<boolean>>;

export interface IThreeStateCheckboxProps extends CheckboxWithFormikType {
    value: CheckboxState;
}

export interface IWrapperCheckboxProps extends CheckboxWithFormikType {
    icon: JSX.Element;
}
