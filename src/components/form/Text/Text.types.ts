import React from 'react';
import {ITextareaProps} from '../Textarea/Textarea';

export type ITextProps = {
    error?: string;
    multiline?: boolean;
    textareaRef?: React.Ref<HTMLTextAreaElement>;
    inputRef?: React.Ref<HTMLInputElement>;
} & (ITextareaProps | React.InputHTMLAttributes<HTMLInputElement>);
