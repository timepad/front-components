import * as React from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';
import {cn} from '@bem-react/classname';

export interface ICounterProps {
    value?: number | string;
}

const cbadge = cn('cbadge');

export const Counter: React.FC<ICounterProps> = ({value, children}) => {
    return (
        <div className={component('counter-wrapper')()}>
            <div className={cbadge(value == null ? 'empty' : '')}>{value}</div>
            {children}
        </div>
    );
};
