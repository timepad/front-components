import React, {ChangeEventHandler} from 'react';
import {ITextareaProps} from '../Textarea/Textarea';

export type IFormTextProps = {
    error?: string;
} & (
    | ({
          multiline?: false;
          onChange: ChangeEventHandler<HTMLInputElement>;
      } & React.InputHTMLAttributes<HTMLInputElement>)
    | ({
          multiline: true;
          onChange: ChangeEventHandler<HTMLTextAreaElement>;
      } & ITextareaProps)
);
