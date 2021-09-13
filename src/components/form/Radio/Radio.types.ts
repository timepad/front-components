import React from 'react';

export interface IFormRadioProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    text?: string;
    caption?: string;
    small?: boolean;
    error?: string;
}
