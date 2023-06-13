import React, {ReactNode} from 'react';
import {Props as MaskedInputProps} from 'react-input-mask';
import {ITextareaProps} from '../Textarea/Textarea';

export type ITextLightProps = {
    error?: string;
    success?: boolean;
    caption?: ReactNode;
    multiline?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    textareaRef?: React.Ref<HTMLTextAreaElement>;
    customIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
} & (Partial<MaskedInputProps> | ITextareaProps);

export interface IPhoneInputProps extends Partial<MaskedInputProps> {}
