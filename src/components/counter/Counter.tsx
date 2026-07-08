import * as React from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';
import {cn} from '@bem-react/classname';
import {qaTags} from '../../services';
import {IAdditionalAttributes} from '../../../types';

export interface ICounterProps extends IAdditionalAttributes {
    value?: number | string;
}

export const Counter: React.FC<React.PropsWithChildren<ICounterProps>> = ({value, children, ...props}) => {
    const badgeClasses = cn(
        component('counter__inner')(),
        value == null ? 'empty' : String(value).length === 1 ? 'single' : '',
    )();
    return (
        <div className={component('counter')()} data-qa={props['data-qa'] || qaTags.counter}>
            <div className={badgeClasses}>
                <span data-qa={qaTags.counterContent}>{value}</span>
            </div>
            {children}
        </div>
    );
};
