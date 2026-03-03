import React, {MutableRefObject} from 'react';
import {IAdditionalAttributes} from '../../../types';

export type ISearchInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    onEnterPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onEscPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onReset?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    onBackButtonClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    value: string;
    showBackButton?: boolean;
    inputRef?: MutableRefObject<HTMLInputElement | null>;
    isWide?: boolean;
    withSearchIcon?: boolean;
} & IAdditionalAttributes;
