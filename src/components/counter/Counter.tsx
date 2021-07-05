import * as React from 'react';
import './index.less';

export interface ICounterProps {
    value?: number | string;
}

export const Counter: React.FC<ICounterProps> = ({value, children}) => (
    <div className="counter-wrapper">
        <div className={value != null ? 'badge-bg' : 'empty-badge-bg'}>
            <div className="badge">{value}</div>
        </div>
        {children}
    </div>
);
