import React from 'react';

export interface ISelectOption {
    value: string | ReadonlyArray<string> | number;
    label: string;
}

export interface ISelectProps
    extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    options: ISelectOption[];
    label?: string;
    // onLocal(value: string): void;
}
