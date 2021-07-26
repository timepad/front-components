import React from 'react';
import {TextareaAutosizeProps} from 'react-textarea-autosize/dist/declarations/src';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type TextareaProps = TextareaAutosizeProps & React.RefAttributes<HTMLTextAreaElement>;

type BaseFormTextProps = InputProps & TextareaProps;

export interface IFormTextProps extends BaseFormTextProps {
    multiline?: boolean;
    error?: string;
}
