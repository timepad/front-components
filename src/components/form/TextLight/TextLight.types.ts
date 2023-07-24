import React, {ReactNode} from 'react';
import {ITextareaProps} from '../Textarea/Textarea';
import {Mask} from '../../../services/hooks';

export type ITextLightProps = {
    error?: string;
    success?: boolean;
    caption?: ReactNode;
    multiline?: boolean;
    customIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    inputRef?: React.Ref<HTMLInputElement>;
    textareaRef?: React.Ref<HTMLTextAreaElement>;
    mask?: string | Mask;
    maskPlaceholder?: string;
    setValue?: (value: string) => void;
} & (ITextareaProps | React.InputHTMLAttributes<HTMLInputElement>);
