import React from 'react';
import {TextareaAutosizeProps} from 'react-textarea-autosize/dist/declarations/src';

type BaseFormTextProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    TextareaAutosizeProps &
    React.RefAttributes<HTMLTextAreaElement>;

export interface IFormTextProps extends BaseFormTextProps {
    multiline?: boolean;
    error?: string;
}
