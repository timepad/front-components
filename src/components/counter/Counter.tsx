import * as React from 'react';
import './index.less';
import {component} from '../../services/helpers/classHelpers';

export interface ICounterProps {
    value?: number | string;
}

export const Counter: React.FC<ICounterProps> = ({value, children}) => {
    return (
        <div className={component('counter-wrapper')()}>
            <div
                className={component('badge-bg')({
                    empty: value == null,
                })}
            >
                <div className={component('badge')()}>{value}</div>
            </div>
            {children}
        </div>
    );
};
