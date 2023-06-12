import React from 'react';
import {ITextareaProps} from '../Textarea/Textarea';

export type IFormTextProps = {
    error?: string;
    multiline?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    textareaRef?: React.Ref<HTMLTextAreaElement>;
} & (ITextProps & ITextareaProps);

type ITextProps = React.InputHTMLAttributes<HTMLInputElement>;
