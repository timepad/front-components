import * as React from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';

export interface IBageProps {
    value?: number | string;
}

export const Bage: React.FC<IBageProps> = ({value, children}) => {
    const isUndefined = !value && value !== 0;

    const badgeClasses = component('badge__inner')({
        empty: isUndefined,
    });

    return (
        <div className={component('badge')()}>
            <div className={badgeClasses}>{!isUndefined && <span>{value}</span>}</div>
            {children}
        </div>
    );
};
