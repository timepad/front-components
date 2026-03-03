import * as React from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';
import {IAdditionalAttributes} from '../../../types';
import {qaTags} from '../../services';

export enum LabelColor {
    green = 'green',
    yellow = 'yellow',
    red = 'red',
    default = 'default',
}

export interface ILabelProps extends IAdditionalAttributes {
    background?: LabelColor;
    timer?: boolean;
}

export const Label: React.FC<React.PropsWithChildren<ILabelProps>> = ({
    background = LabelColor.default,
    timer,
    children,
    ...props
}) => (
    <div
        className={component('label')({
            [background]: true,
            timer: timer,
        })}
        data-qa={props['data-qa'] || qaTags.label}
    >
        {children}
    </div>
);
