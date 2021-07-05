import * as React from 'react';
import './index.less';
import cn from 'classnames';

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
    <div className={cn('label_' + background, timer && 'label_timer')}>{children}</div>
);
