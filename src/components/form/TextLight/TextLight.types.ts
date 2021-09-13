import React, {ReactNode} from 'react';
import {ITextareaProps} from '../Textarea/Textarea';

export type IFormTextLightProps = {
    error?: string;
    success?: boolean;
    caption?: ReactNode;

    customIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    onErrorTruncation?: (truncated: boolean) => void;
} & (
    | ({
          multiline?: false;
          inputRef?: React.MutableRefObject<HTMLInputElement | null>;
      } & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>)
    | ({
          multiline: true;
          textareaRef?: React.Ref<HTMLTextAreaElement>;
      } & ITextareaProps)
);
