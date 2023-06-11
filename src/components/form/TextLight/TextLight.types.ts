import React, {ReactNode} from 'react';
import {ITextareaProps} from '../Textarea/Textarea';
import {Mask} from '../../../services/hooks';

export type IFormTextLightProps = {
    error?: string;
    success?: boolean;
    caption?: ReactNode;
    multiline?: boolean;
    customIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    inputRef?: React.Ref<HTMLInputElement>;
    textareaRef?: React.Ref<HTMLTextAreaElement>;
} & ITextareaProps &
    IFormPhoneInputLightProps;

export type IFormPhoneInputLightProps = {
    mask?: string | Mask;
    maskPlaceholder?: string;
    setValue?: (value: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export interface IFormInputProps extends Omit<IFormTextLightProps, 'error' | 'caption' | 'customIcon' | 'success'> {}
