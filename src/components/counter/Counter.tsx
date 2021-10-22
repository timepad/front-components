import * as React from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';
import {cn} from '@bem-react/classname';

export interface ICounterProps {
    value?: number | string;
}

export const Counter: React.FC<ICounterProps> = ({value, children}) => {
    const badgeClasses = cn(
        component('counter__inner')(),
        value == null ? 'empty' : String(value).length === 1 ? 'single' : '',
    )();
    return (
        <div className={component('counter')()}>
            <div className={badgeClasses}>
                <span>{value}</span>
            </div>
            {children}
        </div>
    );
};
