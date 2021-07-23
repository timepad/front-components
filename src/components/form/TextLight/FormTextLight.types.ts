import React from 'react';
import {TextareaAutosizeProps} from 'react-textarea-autosize/dist/declarations/src';

type BaseFormTextLightProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
    TextareaAutosizeProps &
    React.RefAttributes<HTMLTextAreaElement>;

export interface IFormTextLightProps extends BaseFormTextLightProps {
    error?: string;
    success?: boolean;
    multiline?: boolean;
    inputRef?: React.MutableRefObject<HTMLInputElement>;
    customIcon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
    onErrorTruncation?: (truncated: boolean) => void;
}
