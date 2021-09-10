import * as React from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';

export enum LabelColor {
    green = 'green',
    yellow = 'yellow',
    red = 'red',
    default = 'default',
}

export interface ILabelProps {
    background?: LabelColor;
    timer?: boolean;
}

export const Label: React.FC<ILabelProps> = ({background = LabelColor.default, timer, children}) => (
    <div
        className={component('label')({
            [background]: true,
            timer: timer,
        })}
    >
        {children}
    </div>
);
