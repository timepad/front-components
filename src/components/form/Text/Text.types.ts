import React from 'react';
import {ITextareaProps} from '../Textarea/Textarea';
import {IAdditionalAttributes} from '../../../../types';

export type ITextProps = {
    error?: string;
    multiline?: boolean;
    textareaRef?: React.Ref<HTMLTextAreaElement>;
    inputRef?: React.Ref<HTMLInputElement>;
} & (ITextareaProps | React.InputHTMLAttributes<HTMLInputElement>) &
    IAdditionalAttributes;
