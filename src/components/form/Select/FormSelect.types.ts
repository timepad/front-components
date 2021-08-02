import React from 'react';

export interface IFormSelectOption {
    value: string | ReadonlyArray<string> | number;
    label: string;
}

export interface IFormSelectProps
    extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
    options: IFormSelectOption[];
    // onLocal(value: string): void;
}
