import React from 'react';
import {IAdditionalAttributes} from '../../../../types';

export interface IFormRadioProps
    extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
        IAdditionalAttributes {
    text?: string;
    caption?: string;
    small?: boolean;
    error?: string;
}
