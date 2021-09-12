import React, {ChangeEventHandler} from 'react';
import {ITextareaProps} from '../Textarea/Textarea';

export type IFormTextProps = {
    error?: string;
} & (
    | ({
          multiline?: false;
          onChange: ChangeEventHandler<HTMLInputElement>;
      } & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>)
    | ({
          multiline: true;
          onChange: ChangeEventHandler<HTMLTextAreaElement>;
      } & Omit<ITextareaProps, 'onChange'>)
);
