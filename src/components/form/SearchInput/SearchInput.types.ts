import {MutableRefObject} from 'react';

export interface ISearchInputProps {
    onEnterPress?: (value?: string) => void;
    onEscPress?: () => void;
    onReset?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    value: string;
    showBackButton?: boolean;
    onChange?: (value: string) => void;
    inputRef?: MutableRefObject<HTMLInputElement | null> | null;
}
