import React from 'react';
import {ITextareaProps} from '../Textarea/Textarea';

export type IFormTextProps = {
    error?: string;
} & (
    | ({multiline?: false; inputRef?: React.MutableRefObject<HTMLInputElement | null>} & React.DetailedHTMLProps<
          React.InputHTMLAttributes<HTMLInputElement>,
          HTMLInputElement
      >)
    | ({multiline: true; textareaRef?: React.Ref<HTMLTextAreaElement>} & ITextareaProps)
);
