import React, {MutableRefObject} from 'react';

export type ISearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    onEnterPress?: (value?: string) => void;
    onEscPress?: () => void;
    onReset?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    value: string;
    showBackButton?: boolean;
    inputRef?: MutableRefObject<HTMLInputElement | null> | null;
    isWide?: boolean;
};
