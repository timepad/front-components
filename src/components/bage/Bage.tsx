import * as React from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';
import {cn} from '@bem-react/classname';
import cx from 'classnames';

export interface IBageProps {
    value?: number | string;
}

export const Bage: React.FC<IBageProps> = ({value, children}) => {
    const badgeClasses = cx(cn(component('badge')(), value === null ? 'empty' : '')(), 't-small');
    return (
        <div className={component('badge-wrapper')()}>
            <div className={badgeClasses}>{value}</div>
            {children}
        </div>
    );
};
