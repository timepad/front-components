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
        !value && value !== 0 ? 'empty' : String(value).length === 1 ? 'single' : '',
    )();
    return (
        <div className={component('badge')()}>
            <div className={badgeClasses}>
                <span>{value}</span>
            </div>
            {children}
        </div>
    );
};

export const Bage2: React.FC<IBageProps> = ({value, children}) => {
    const isUndefined = !value && value !== 0;

    const badgeClasses = component('badge2__inner')({
        empty: isUndefined,
        single: String(value).length === 1,
    });

    return (
        <div className={component('badge2')()}>
            <div className={badgeClasses}>{!isUndefined && <span>{value}</span>}</div>
            {children}
        </div>
    );
};
