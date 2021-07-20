import React from 'react';

type BaseFormTextProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export interface IFormTextProps extends BaseFormTextProps {
    multiline?: boolean;
    error?: string;
}
