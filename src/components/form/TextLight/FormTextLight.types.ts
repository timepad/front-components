import React from 'react';
import {TextareaAutosizeProps} from 'react-textarea-autosize/dist/declarations/src';

type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
type TextareaProps = TextareaAutosizeProps & React.RefAttributes<HTMLTextAreaElement>;

type BaseFormTextLightProps = InputProps & TextareaProps;

export interface IFormTextLightProps extends BaseFormTextLightProps {
    error?: string;
    success?: boolean;
    multiline?: boolean;
    inputRef?: React.MutableRefObject<(HTMLInputElement & HTMLTextAreaElement) | null>;
    customIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    onErrorTruncation?: (truncated: boolean) => void;
}
