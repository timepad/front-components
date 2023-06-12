import React, {ReactNode} from 'react';
import {Props as MaskedInputProps} from 'react-input-mask';
import {ITextareaProps} from '../Textarea/Textarea';

export type IFormTextLightProps = {
    error?: string;
    success?: boolean;
    caption?: ReactNode;
    multiline?: boolean;
    customIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    inputRef?: React.Ref<HTMLInputElement>;
    textareaRef?: React.Ref<HTMLTextAreaElement>;
} & ITextareaProps &
    Partial<MaskedInputProps>;

export interface IInputProps extends Omit<IFormTextLightProps, 'error' | 'success' | 'caption' | 'customIcon'> {}
