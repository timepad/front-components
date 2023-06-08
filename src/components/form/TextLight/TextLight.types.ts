import React, {ReactNode} from 'react';
import {Props as MaskedInputProps} from 'react-input-mask';
import {ITextareaProps} from '../Textarea/Textarea';

export type IFormTextLightProps = {
    error?: string;
    success?: boolean;
    caption?: ReactNode;
    multiline?: boolean;
    customIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
} & IFormInputLightProps &
    IFormTextareaLightProps &
    Partial<MaskedInputProps>;

export type IFormInputLightProps = {
    inputRef?: React.MutableRefObject<HTMLInputElement | null>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type IFormTextareaLightProps = {
    textareaRef?: React.Ref<HTMLTextAreaElement>;
} & ITextareaProps;
