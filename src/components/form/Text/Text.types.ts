import React from 'react';
import {ITextareaProps} from '../Textarea/Textarea';

export type IFormTextProps = {
    error?: string;
} & (({multiline?: false} & React.InputHTMLAttributes<HTMLInputElement>) | ({multiline: true} & ITextareaProps));
