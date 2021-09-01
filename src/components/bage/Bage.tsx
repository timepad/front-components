import * as React from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';
import {cn} from '@bem-react/classname';

export interface IBageProps {
    value?: number | string;
}

export const Bage: React.FC<IBageProps> = ({value, children}) => {
    const badgeClasses = cn(
        component('badge__inner')(),
        value == null ? 'empty' : String(value).length === 1 ? 'single' : '',
    )();
    return (
        <div className={component('badge')()}>
            <div className={badgeClasses}>{value}</div>
            {children}
        </div>
    );
};
